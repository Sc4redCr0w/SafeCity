

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
import pickle
import os
import math
import requests

from typing import List
import random
from datetime import datetime, timedelta

# -----------------------------
# APP INIT
# -----------------------------
app = FastAPI(title="SafeCity API", version="1.0")

# Allow frontend (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hackathon-safe
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# LOAD ML MODELS
# -----------------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "crime_risk_model.pkl")
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

# 🔹 ACCIDENT RISK MODEL (OPTIONAL - skip if file doesn't exist)
try:
    with open(os.path.join(os.path.dirname(__file__), "model", "accident_risk_model.pkl"), "rb") as f:
        accident_bundle = pickle.load(f)
    
    accident_model = accident_bundle["model"]
    accident_features = accident_bundle["features"]
    accident_threshold = accident_bundle["threshold"]
    ACCIDENT_MODEL_AVAILABLE = True
except FileNotFoundError:
    ACCIDENT_MODEL_AVAILABLE = False
    accident_model = None
    accident_threshold = None

# -----------------------------
# DATA MODELS
# -----------------------------
class CrimeInput(BaseModel):
    crime_type: int
    hour: int
    day_of_week: int
    is_weekend: int
    zone_id: int
    crime_count_last_7d: int
    latitude: float
    longitude: float

class AccidentInput(BaseModel):
    hour: int
    day_of_week: int
    is_weekend: int
    zone_id: int
    latitude: float
    longitude: float
    accident_count_last_7d: int



class NewsRequest(BaseModel):
    latitude: float
    longitude: float


# -----------------------------
# MUMBAI LOCALITIES (PROTOTYPE)
# -----------------------------
MUMBAI_LOCALITIES = [
    {"name": "Colaba", "lat": 18.9067, "lng": 72.8147},
    {"name": "Fort", "lat": 18.9346, "lng": 72.8354},
    {"name": "Marine Lines", "lat": 18.9430, "lng": 72.8258},
    {"name": "Churchgate", "lat": 18.9352, "lng": 72.8271},
    {"name": "Byculla", "lat": 18.9766, "lng": 72.8322},

    {"name": "Dadar", "lat": 19.0170, "lng": 72.8440},
    {"name": "Lower Parel", "lat": 18.9977, "lng": 72.8330},
    {"name": "Worli", "lat": 19.0176, "lng": 72.8166},
    {"name": "Mahim", "lat": 19.0350, "lng": 72.8397},
    {"name": "Sion", "lat": 19.0436, "lng": 72.8636},

    {"name": "Bandra", "lat": 19.0600, "lng": 72.8300},
    {"name": "Khar", "lat": 19.0695, "lng": 72.8290},
    {"name": "Santacruz", "lat": 19.0810, "lng": 72.8416},
    {"name": "Vile Parle", "lat": 19.0960, "lng": 72.8530},
    {"name": "Andheri", "lat": 19.1190, "lng": 72.8460},
    {"name": "Jogeshwari", "lat": 19.1430, "lng": 72.8465},
    {"name": "Goregaon", "lat": 19.1551, "lng": 72.8495},
    {"name": "Malad", "lat": 19.1874, "lng": 72.8484},
    {"name": "Kandivali", "lat": 19.2050, "lng": 72.8500},
    {"name": "Borivali", "lat": 19.2295, "lng": 72.8565},

    {"name": "Kurla", "lat": 19.0720, "lng": 72.8840},
    {"name": "Ghatkopar", "lat": 19.0860, "lng": 72.9080},
    {"name": "Vikhroli", "lat": 19.1100, "lng": 72.9260},
    {"name": "Powai", "lat": 19.1176, "lng": 72.9060},
    {"name": "Bhandup", "lat": 19.1450, "lng": 72.9360},
    {"name": "Mulund", "lat": 19.1726, "lng": 72.9425},

    {"name": "Chembur", "lat": 19.0620, "lng": 72.8990},
    {"name": "Wadala", "lat": 19.0215, "lng": 72.8736},
    {"name": "Govandi", "lat": 19.0550, "lng": 72.9150},
    {"name": "Mankhurd", "lat": 19.0480, "lng": 72.9320}
]

# -----------------------------
# HELPERS
# -----------------------------
def distance(lat1, lng1, lat2, lng2):
    return math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2)


def get_nearest_locality(lat, lng):
    nearest = None
    min_dist = float("inf")
    for loc in MUMBAI_LOCALITIES:
        d = distance(lat, lng, loc["lat"], loc["lng"])
        if d < min_dist:
            min_dist = d
            nearest = loc
    return nearest


# -----------------------------
# 1️⃣ CRIME RISK PREDICTION
# -----------------------------
@app.post("/predict")
def predict_risk(data: CrimeInput):
    features = np.array([[
        data.crime_type,
        data.hour,
        data.day_of_week,
        data.is_weekend,
        data.zone_id,
        data.crime_count_last_7d,
        data.latitude,
        data.longitude
    ]])

    probability = model.predict_proba(features)[0][1]

    if probability >= 0.7:
        risk_level = "High"
        urgency_score = int(80 + probability * 20)
        priority = "Critical"
        deployment = {
            "unit_type": "Riot Control Unit",
            "personnel_required": "30–40 officers",
            "support_units": ["Medical Van", "Traffic Police", "Drone Surveillance"]
        }
    elif probability >= 0.4:
        risk_level = "Medium"
        urgency_score = int(50 + probability * 30)
        priority = "High"
        deployment = {
            "unit_type": "Local Police Patrol",
            "personnel_required": "12–15 officers",
            "support_units": ["Traffic Police"]
        }
    else:
        risk_level = "Low"
        urgency_score = int(20 + probability * 30)
        priority = "Moderate"
        deployment = {
            "unit_type": "Routine Patrol",
            "personnel_required": "4–6 officers",
            "support_units": []
        }

    explanation = []

    if probability >= 0.7:
        explanation.append("Elevated crime risk probability predicted by historical patterns")
    if data.hour >= 22:
        explanation.append("Late night hours historically correlate with higher incident rates")
    if data.is_weekend == 1:
        explanation.append("Weekend crowd activity increases situational risk")
    if data.crime_count_last_7d >= 8:
        explanation.append("Spike in recent incident frequency observed")
    if probability < 0.4:
        explanation.append("Low historical incident density in this zone")

    return {
        "risk_probability": round(float(probability), 3),
        "risk_level": risk_level,
        "urgency_score": urgency_score,
        "priority": priority,
        "recommended_deployment": deployment,
        "explanation": explanation
    }



# -----------------------------
# 4️⃣ ACCIDENT RISK PREDICTION
# -----------------------------
@app.post("/predict-accident")
def predict_accident_risk(data: AccidentInput):
    if not ACCIDENT_MODEL_AVAILABLE:
        return {
            "error": "Accident model not available",
            "message": "Accident risk model file not found"
        }

    # Arrange features exactly as trained
    features = np.array([[
        data.hour,
        data.day_of_week,
        data.is_weekend,
        data.zone_id,
        data.latitude,
        data.longitude,
        data.accident_count_last_7d
    ]])

    probability = float(accident_model.predict_proba(features)[0][1])

    # Risk classification
    if probability >= accident_threshold:
        risk_level = "High"
        severity = "Severe"
    elif probability >= 0.4:
        risk_level = "Medium"
        severity = "Moderate"
    else:
        risk_level = "Low"
        severity = "Minor"

    # return {
    #     "accident_risk_probability": round(probability, 3),
    #     "accident_risk_level": risk_level,
    #     "severity": severity,
    #     "model_threshold": accident_threshold
    # }
    explanation = []

    if probability >= 0.9:
        explanation.append(
        "Very high accident risk predicted based on historical traffic patterns"
        )

    if data.hour >= 20:
        explanation.append(
        "Late evening / night hours have higher accident occurrence"
        )

    if data.is_weekend == 1:
        explanation.append(
        "Weekend traffic congestion increases accident probability"
    )

    if data.accident_count_last_7d >= 5:
        explanation.append(
        "Recent clustering of accidents detected near this location"
    )

    if not explanation:
        explanation.append(
        "No strong historical accident risk indicators detected"
    )


    return {
    "accident_risk_probability": round(float(probability), 2),
    "accident_risk_level": risk_level,
    "severity": severity,
    "model_threshold": accident_threshold,

    # 👇 ADD THESE
    "recent_incidents_nearby": data.accident_count_last_7d,
    "incident_window_days": 7,

    "explanation": explanation
}




# -----------------------------
# 2️⃣ CONTEXTUAL CRIME NEWS
# -----------------------------
@app.post("/contextual-news")
def get_contextual_news(data: NewsRequest):
    api_key = "dbbf6b9ad2d3489a629c18cc55263624"

    locality = get_nearest_locality(data.latitude, data.longitude)
    area_name = locality["name"]

    query = f"crime OR violence OR robbery OR assault AND {area_name} Mumbai"

    url = "https://gnews.io/api/v4/search"
    params = {
        "q": query,
        "lang": "en",
        "country": "in",
        "max": 5,
        "apikey": api_key
    }

    response = requests.get(url, params=params)
    news_data = response.json()

    articles = []
    for article in news_data.get("articles", []):
        articles.append({
            "title": article.get("title"),
            "source": article.get("source", {}).get("name"),
            "published_at": article.get("publishedAt"),
            "url": article.get("url")
        })

    return {
        "locality": f"{area_name}, Mumbai",
        "articles": articles,
        "disclaimer": "News articles are contextual indicators, not FIR records."
    }


@app.get("/heatmap/filtered")
def get_filtered_heatmap(
    duration: str = "7days",  # 7days, 30days, alltime
    crime_type: str = "all",  # all, 1, 2, 3, ... 
    start_hour: int = 0,
    end_hour: int = 23
):
    """
    Return filtered heatmap points based on user selections
    duration: 7days | 30days | alltime
    crime_type: all | 1,2,3,... (comma-separated or single)
    start_hour: 0-23
    end_hour: 0-23
    """
    
    # Simulate crime data filtering
    heatmap_points = []
    
    # Generate points for each locality
    for loc in MUMBAI_LOCALITIES:
        # Simulate incident count based on duration
        if duration == "7days":
            incident_count = random.randint(5, 25)
        elif duration == "30days":
            incident_count = random.randint(20, 100)
        else:  # alltime
            incident_count = random.randint(100, 500)
        
        # Adjust count based on crime type filter
        if crime_type != "all":
            incident_count = int(incident_count * random.uniform(0.5, 1.0))
        
        # Calculate intensity (0-1) for heatmap
        intensity = incident_count / 500 if duration != "alltime" else incident_count / 2000
        intensity = min(intensity, 1.0)
        
        # Determine risk level
        if intensity >= 0.6:
            risk_level = "High"
        elif intensity >= 0.3:
            risk_level = "Medium"
        else:
            risk_level = "Low"
        
        heatmap_points.append({
            "name": loc["name"],
            "lat": loc["lat"],
            "lng": loc["lng"],
            "incidents": incident_count,
            "intensity": round(intensity, 2),
            "risk_level": risk_level,
            "avg_confidence": round(random.uniform(0.5, 0.9), 2)
        })
    
    return {
        "duration": duration,
        "crime_type": crime_type,
        "time_range": {"start": start_hour, "end": end_hour},
        "heatmap_points": heatmap_points,
        "crime_types": [
            {"id": "all", "name": "All Crime Types"},
            {"id": "1", "name": "Assault"},
            {"id": "2", "name": "Robbery"},
            {"id": "3", "name": "Burglary"},
            {"id": "4", "name": "Theft"},
            {"id": "5", "name": "Vehicle Theft"},
            {"id": "6", "name": "Cyber Crime"},
            {"id": "7", "name": "Fraud"},
            {"id": "8", "name": "Property Crime"},
            {"id": "9", "name": "Drug-related"},
            {"id": "10", "name": "Public Nuisance"}
        ]
    }


# -----------------------------
# 3️⃣ DASHBOARD SUMMARY
# -----------------------------
@app.get("/dashboard/summary")
def dashboard_summary():
    total_incidents = random.randint(900, 1400)
    high_risk_zones = random.randint(8, 15)
    avg_confidence = round(random.uniform(0.55, 0.72), 2)

    risk_distribution = {
        "low": random.randint(40, 55),
        "medium": random.randint(25, 35),
        "high": random.randint(15, 25),
    }

    trend = []
    today = datetime.now()
    for i in range(6, -1, -1):
        trend.append({
            "date": (today - timedelta(days=i)).strftime("%d %b"),
            "incidents": random.randint(90, 180)
        })

    heatmap_points = []
    for loc in MUMBAI_LOCALITIES:
        heatmap_points.append({
            "name": loc["name"],
            "lat": loc["lat"],
            "lng": loc["lng"],
            "risk": random.choice(["Low", "Medium", "High"]),
            "incidents": random.randint(20, 120),
            "avg_confidence": round(random.uniform(0.5, 0.8), 2)
        })

    return {
        "kpis": {
            "total_incidents": total_incidents,
            "high_risk_zones": high_risk_zones,
            "avg_confidence": avg_confidence
        },
        "risk_distribution": risk_distribution,
        "trend": trend,
        "heatmap_points": heatmap_points
    }

# ===================================
# CRIME ANALYTICS ENDPOINTS
# ===================================

@app.get("/api/crime/statistics")
def get_crime_statistics():
    """Get overall crime statistics from India dataset"""
    import pandas as pd
    
    csv_path = os.path.join(os.path.dirname(__file__), "model", "indian_crimes_csv", "crime_dataset_india.csv")
    
    try:
        df = pd.read_csv(csv_path)
        
        # Basic statistics
        total_crimes = len(df)
        unique_cities = df['City'].nunique() if 'City' in df.columns else 0
        unique_crime_types = df['Crime Description'].nunique() if 'Crime Description' in df.columns else 0
        
        # Crime type distribution
        crime_distribution = {}
        if 'Crime Description' in df.columns:
            crime_dist = df['Crime Description'].value_counts().to_dict()
            crime_distribution = {str(k): int(v) for k, v in crime_dist.items()}
        
        # Top cities by crime count
        top_cities = {}
        if 'City' in df.columns:
            city_counts = df['City'].value_counts().head(10).to_dict()
            top_cities = {str(k): int(v) for k, v in city_counts.items()}
        
        return {
            "total_crimes": total_crimes,
            "unique_cities": unique_cities,
            "unique_crime_types": unique_crime_types,
            "crime_distribution": crime_distribution,
            "top_cities": top_cities
        }
    except Exception as e:
        return {"error": str(e), "total_crimes": 0}


@app.get("/api/crime/by-city")
def get_crimes_by_city(city: str = ""):
    """Get crime statistics for a specific city"""
    import pandas as pd
    import numpy as np
    import json
    
    csv_path = os.path.join(os.path.dirname(__file__), "model", "indian_crimes_csv", "crime_dataset_india.csv")
    
    try:
        df = pd.read_csv(csv_path)
        
        if city and 'City' in df.columns:
            city_data = df[df['City'].str.contains(city, case=False, na=False)]
        else:
            city_data = df
        
        crime_types = {}
        if 'Crime Description' in city_data.columns:
            crime_types = {str(k): int(v) for k, v in city_data['Crime Description'].value_counts().to_dict().items()}
        
        # Convert records to dict and handle NaN values
        records = []
        if len(city_data) > 0:
            for _, row in city_data.head(20).iterrows():
                record = {}
                for col, val in row.items():
                    if pd.isna(val):
                        record[col] = None
                    elif isinstance(val, (np.integer, np.floating)):
                        if np.isnan(val) or np.isinf(val):
                            record[col] = None
                        else:
                            record[col] = float(val) if isinstance(val, np.floating) else int(val)
                    else:
                        record[col] = str(val)
                records.append(record)
        
        return {
            "city": city,
            "total_incidents": int(len(city_data)),
            "crime_types": crime_types,
            "records": records
        }
    except Exception as e:
        return {"error": str(e), "city": city, "total_incidents": 0, "crime_types": {}, "records": []}


@app.get("/api/crime/heatmap-data")
def get_crime_heatmap():
    """Get crime data for heatmap visualization"""
    import pandas as pd
    
    csv_path = os.path.join(os.path.dirname(__file__), "model", "indian_crimes_csv", "crime_dataset_india.csv")
    
    try:
        df = pd.read_csv(csv_path)
        
        # Generate heatmap points
        heatmap_points = []
        if 'City' in df.columns:
            city_counts = df['City'].value_counts()
            
            # Approximate coordinates for major Indian cities
            city_coords = {
                'Mumbai': [19.0760, 72.8777],
                'Delhi': [28.7041, 77.1025],
                'Bangalore': [12.9716, 77.5946],
                'Hyderabad': [17.3850, 78.4867],
                'Chennai': [13.0827, 80.2707],
                'Kolkata': [22.5726, 88.3639],
                'Pune': [18.5204, 73.8567],
                'Ahmedabad': [23.0225, 72.5714],
                'Ludhiana': [30.9010, 75.8573],
                'Surat': [21.1702, 72.8311],
                'Visakhapatnam': [17.6869, 83.2185],
                'Ghaziabad': [28.6692, 77.4538]
            }
            
            for city, count in city_counts.items():
                if city in city_coords:
                    coords = city_coords[city]
                    heatmap_points.append({
                        "lat": coords[0],
                        "lng": coords[1],
                        "city": city,
                        "intensity": min(count / max(city_counts.max(), 1) * 100, 100),
                        "crime_count": int(count)
                    })
        
        return {"heatmap_points": heatmap_points}
    except Exception as e:
        return {"error": str(e), "heatmap_points": []}


@app.get("/api/crime/top-crimes")
def get_top_crimes(limit: int = 10):
    """Get top crimes by frequency"""
    import pandas as pd
    
    csv_path = os.path.join(os.path.dirname(__file__), "model", "indian_crimes_csv", "crime_dataset_india.csv")
    
    try:
        df = pd.read_csv(csv_path)
        
        if 'Crime Description' in df.columns:
            top_crimes = df['Crime Description'].value_counts().head(limit).to_dict()
            return {
                "top_crimes": {str(k): int(v) for k, v in top_crimes.items()}
            }
        return {"top_crimes": {}}
    except Exception as e:
        return {"error": str(e), "top_crimes": {}}


@app.get("/api/crime/predict-by-city")
def predict_crime_by_city(city: str):
    """Get crime risk prediction and crime breakdown for a specific city"""
    import pandas as pd
    import numpy as np
    
    csv_path = os.path.join(os.path.dirname(__file__), "model", "indian_crimes_csv", "crime_dataset_india.csv")
    
    try:
        df = pd.read_csv(csv_path)
        
        # Filter by city
        if city and 'City' in df.columns:
            city_data = df[df['City'].str.contains(city, case=False, na=False)]
        else:
            city_data = df
        
        if len(city_data) == 0:
            return {
                "city": city,
                "found": False,
                "risk_percentage": 0,
                "crime_breakdown": {},
                "total_incidents": 0
            }
        
        # Get crime breakdown by description
        crime_breakdown = {}
        if 'Crime Description' in city_data.columns:
            crime_counts = city_data['Crime Description'].value_counts().to_dict()
            total = sum(crime_counts.values())
            crime_breakdown = {
                str(k): {
                    "count": int(v),
                    "percentage": round((v / total) * 100, 2)
                }
                for k, v in crime_counts.items()
            }
        
        # Calculate risk percentage based on crime density
        total_crimes = len(city_data)
        
        # Get all cities to find the max crime count for normalization
        if 'City' in df.columns:
            all_city_counts = df['City'].value_counts()
            max_crimes_in_any_city = all_city_counts.max()
            # Normalize risk to 0-100 based on relative crime count compared to the highest
            risk_percentage = round((total_crimes / max_crimes_in_any_city) * 100, 2) if max_crimes_in_any_city > 0 else 0
        else:
            # Fallback if City column doesn't exist
            risk_percentage = min(round((total_crimes / 100) * 100, 2), 100)
        
        # Get additional stats
        unique_crime_types = city_data['Crime Description'].nunique() if 'Crime Description' in city_data.columns else 0
        
        return {
            "city": city,
            "found": True,
            "risk_percentage": risk_percentage,
            "crime_breakdown": crime_breakdown,
            "total_incidents": total_crimes,
            "unique_crime_types": unique_crime_types,
            "avg_crimes_per_type": round(total_crimes / max(unique_crime_types, 1), 2)
        }
    except Exception as e:
        return {"error": str(e), "city": city, "found": False}


@app.get("/api/crime/predict-crime-types")
def predict_crime_types(city: str):
    """Get predicted probabilities for each crime type in a specific city"""
    try:
        from model.crime_type_predictor import predict_crime_type_probabilities
        
        predictions = predict_crime_type_probabilities(city)
        
        if predictions is None:
            return {
                "city": city,
                "found": False,
                "crime_type_predictions": {}
            }
        
        return {
            "city": city,
            "found": True,
            "crime_type_predictions": predictions
        }
    except Exception as e:
        return {"error": str(e), "city": city, "found": False}


# ==================== FIR ENDPOINTS ====================

@app.post("/api/fir/add")
def add_fir(
    date_reported: str,
    date_of_occurrence: str,
    time_of_occurrence: str,
    city: str,
    crime_code: str,
    crime_description: str,
    victim_age: int,
    victim_gender: str,
    weapon_used: str,
    crime_domain: str,
    police_deployed: str,
    case_closed: str,
    date_case_closed: str = None
):
    """Add a new FIR to the fir.csv file"""
    try:
        import os
        from pathlib import Path
        
        fir_file = "fir.csv"
        
        # Read existing FIRs to generate next report number
        try:
            fir_df = pd.read_csv(fir_file)
            next_report_num = len(fir_df) + 1
        except:
            next_report_num = 1
        
        # Create new FIR row
        new_fir = {
            "Report Number": next_report_num,
            "Date Reported": date_reported,
            "Date of Occurrence": date_of_occurrence,
            "Time of Occurrence": time_of_occurrence,
            "City": city,
            "Crime Code": crime_code,
            "Crime Description": crime_description,
            "Victim Age": victim_age,
            "Victim Gender": victim_gender,
            "Weapon Used": weapon_used,
            "Crime Domain": crime_domain,
            "Police Deployed": police_deployed,
            "Case Closed": case_closed,
            "Date Case Closed": date_case_closed if case_closed.lower() == "yes" else "In Progress"
        }
        
        # Read existing FIRs
        if os.path.exists(fir_file) and os.path.getsize(fir_file) > 0:
            fir_df = pd.read_csv(fir_file)
        else:
            fir_df = pd.DataFrame()
        
        # Add new FIR
        fir_df = pd.concat([fir_df, pd.DataFrame([new_fir])], ignore_index=True)
        
        # Save to CSV
        fir_df.to_csv(fir_file, index=False)
        
        return {
            "success": True,
            "message": "FIR added successfully",
            "report_number": next_report_num
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


@app.get("/api/fir/search")
def search_fir(query: str = "", search_type: str = "report_number"):
    """Search FIRs by report number, city, or crime description"""
    try:
        fir_file = "fir.csv"
        
        if not os.path.exists(fir_file):
            return {"found": False, "firs": []}
        
        fir_df = pd.read_csv(fir_file)
        
        if not query:
            # Return all FIRs
            firs = fir_df.to_dict(orient="records")
        else:
            if search_type == "report_number":
                firs = fir_df[fir_df["Report Number"].astype(str).str.contains(query, case=False)].to_dict(orient="records")
            elif search_type == "city":
                firs = fir_df[fir_df["City"].str.contains(query, case=False)].to_dict(orient="records")
            elif search_type == "crime_description":
                firs = fir_df[fir_df["Crime Description"].str.contains(query, case=False)].to_dict(orient="records")
            else:
                firs = fir_df.to_dict(orient="records")
        
        # Convert NaN to None for JSON serialization
        for fir in firs:
            for key, value in fir.items():
                if pd.isna(value):
                    fir[key] = None
        
        return {
            "found": len(firs) > 0,
            "count": len(firs),
            "firs": firs
        }
    except Exception as e:
        return {"found": False, "error": str(e), "firs": []}


@app.get("/api/fir/{report_number}")
def get_fir(report_number: int):
    """Get a specific FIR by report number"""
    try:
        fir_file = "fir.csv"
        
        if not os.path.exists(fir_file):
            return {"found": False, "fir": None}
        
        fir_df = pd.read_csv(fir_file)
        fir = fir_df[fir_df["Report Number"] == report_number].to_dict(orient="records")
        
        if not fir:
            return {"found": False, "fir": None}
        
        fir_data = fir[0]
        for key, value in fir_data.items():
            if pd.isna(value):
                fir_data[key] = None
        
        return {
            "found": True,
            "fir": fir_data
        }
    except Exception as e:
        return {"found": False, "error": str(e), "fir": None}


@app.put("/api/fir/{report_number}")
def update_fir(
    report_number: int,
    date_reported: str = None,
    date_of_occurrence: str = None,
    time_of_occurrence: str = None,
    city: str = None,
    crime_code: str = None,
    crime_description: str = None,
    victim_age: int = None,
    victim_gender: str = None,
    weapon_used: str = None,
    crime_domain: str = None,
    police_deployed: str = None,
    case_closed: str = None,
    date_case_closed: str = None
):
    """Update an existing FIR"""
    try:
        fir_file = "fir.csv"
        
        if not os.path.exists(fir_file):
            return {"success": False, "error": "FIR file not found"}
        
        fir_df = pd.read_csv(fir_file)
        
        # Find the FIR to update
        fir_index = fir_df[fir_df["Report Number"] == report_number].index
        
        if len(fir_index) == 0:
            return {"success": False, "error": "FIR not found"}
        
        idx = fir_index[0]
        
        # Update fields if provided
        if date_reported:
            fir_df.at[idx, "Date Reported"] = date_reported
        if date_of_occurrence:
            fir_df.at[idx, "Date of Occurrence"] = date_of_occurrence
        if time_of_occurrence:
            fir_df.at[idx, "Time of Occurrence"] = time_of_occurrence
        if city:
            fir_df.at[idx, "City"] = city
        if crime_code:
            fir_df.at[idx, "Crime Code"] = crime_code
        if crime_description:
            fir_df.at[idx, "Crime Description"] = crime_description
        if victim_age:
            fir_df.at[idx, "Victim Age"] = victim_age
        if victim_gender:
            fir_df.at[idx, "Victim Gender"] = victim_gender
        if weapon_used:
            fir_df.at[idx, "Weapon Used"] = weapon_used
        if crime_domain:
            fir_df.at[idx, "Crime Domain"] = crime_domain
        if police_deployed:
            fir_df.at[idx, "Police Deployed"] = police_deployed
        if case_closed:
            fir_df.at[idx, "Case Closed"] = case_closed
            fir_df.at[idx, "Date Case Closed"] = date_case_closed if case_closed.lower() == "yes" else "In Progress"
        
        # Save to CSV
        fir_df.to_csv(fir_file, index=False)
        
        return {
            "success": True,
            "message": "FIR updated successfully"
        }
    except Exception as e:
        return {"success": False, "error": str(e)}


# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)