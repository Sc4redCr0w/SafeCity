# # # from fastapi import FastAPI
# # # from pydantic import BaseModel
# # # import numpy as np
# # # import pickle

# # # app = FastAPI(title="SafeCity Crime Risk API")

# # # # Load trained model
# # # with open("backend/model/crime_risk_model.pkl", "rb") as f:
# # #     model = pickle.load(f)

# # # # Input schema (VERY IMPORTANT)
# # # class CrimeInput(BaseModel):
# # #     crime_type: int
# # #     hour: int
# # #     day_of_week: int
# # #     is_weekend: int
# # #     zone_id: int
# # #     crime_count_last_7d: int
# # #     latitude: float
# # #     longitude: float

# # # @app.post("/predict")
# # # def predict_risk(data: CrimeInput):

# # #     features = np.array([[
# # #         data.crime_type,
# # #         data.hour,
# # #         data.day_of_week,
# # #         data.is_weekend,
# # #         data.zone_id,
# # #         data.crime_count_last_7d,
# # #         data.latitude,
# # #         data.longitude
# # #     ]])

# # #     probability = model.predict_proba(features)[0][1]

# # #     risk_level = (
# # #         "High" if probability >= 0.6
# # #         else "Medium" if probability >= 0.3
# # #         else "Low"
# # #     )

# # #     return {
# # #         "risk_probability": round(float(probability), 3),
# # #         "risk_level": risk_level
# # #     }







# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # from fastapi.middleware.cors import CORSMiddleware
# # import numpy as np
# # import pickle
# # import os

# # # -------------------------------------------------
# # # APP INITIALIZATION
# # # -------------------------------------------------
# # app = FastAPI(
# #     title="SafeCity Crime Risk API",
# #     description="ML-powered crime risk prediction and police deployment recommendation system",
# #     version="1.0.0"
# # )

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )
# # # -------------------------------------------------
# # # LOAD TRAINED MODEL (ROBUST PATH)
# # # -------------------------------------------------
# # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# # MODEL_PATH = os.path.join(BASE_DIR, "model", "crime_risk_model.pkl")

# # with open(MODEL_PATH, "rb") as f:
# #     model = pickle.load(f)

# # # -------------------------------------------------
# # # INPUT SCHEMA
# # # -------------------------------------------------
# # class CrimeInput(BaseModel):
# #     crime_type: int
# #     hour: int
# #     day_of_week: int
# #     is_weekend: int
# #     zone_id: int
# #     crime_count_last_7d: int
# #     latitude: float
# #     longitude: float

# # # -------------------------------------------------
# # # OPTIONAL ROOT ENDPOINT
# # # -------------------------------------------------
# # @app.get("/")
# # def root():
# #     return {
# #         "status": "SafeCity API is running",
# #         "usage": "Use POST /predict with JSON body to get crime risk prediction"
# #     }

# # # -------------------------------------------------
# # # MAIN PREDICTION ENDPOINT
# # # -------------------------------------------------
# # @app.post("/predict")
# # def predict_risk(data: CrimeInput):

# #     # ----------------------------
# #     # ML FEATURE VECTOR
# #     # ----------------------------
# #     features = np.array([[
# #         data.crime_type,
# #         data.hour,
# #         data.day_of_week,
# #         data.is_weekend,
# #         data.zone_id,
# #         data.crime_count_last_7d,
# #         data.latitude,
# #         data.longitude
# #     ]])

# #     # ----------------------------
# #     # MODEL INFERENCE
# #     # ----------------------------
# #     probability = float(model.predict_proba(features)[0][1])

# #     # ----------------------------
# #     # RISK LEVEL
# #     # ----------------------------
# #     if probability >= 0.6:
# #         risk_level = "High"
# #     elif probability >= 0.3:
# #         risk_level = "Medium"
# #     else:
# #         risk_level = "Low"

# #     # ----------------------------
# #     # URGENCY & PRIORITY
# #     # ----------------------------
# #     urgency_score = int(probability * 100)

# #     if urgency_score >= 70:
# #         priority = "Critical"
# #     elif urgency_score >= 40:
# #         priority = "Medium"
# #     else:
# #         priority = "Low"

# #     # ----------------------------
# #     # POLICE DEPLOYMENT RECOMMENDATION
# #     # ----------------------------
# #     if risk_level == "High":
# #         deployment = {
# #             "unit_type": "Riot Control Unit",
# #             "personnel_required": "30–40 officers",
# #             "support_units": [
# #                 "Medical Van",
# #                 "Traffic Police",
# #                 "Drone Surveillance"
# #             ]
# #         }
# #     elif risk_level == "Medium":
# #         deployment = {
# #             "unit_type": "Patrol + Traffic Control",
# #             "personnel_required": "10–15 officers",
# #             "support_units": [
# #                 "CCTV Monitoring"
# #             ]
# #         }
# #     else:
# #         deployment = {
# #             "unit_type": "Regular Patrol",
# #             "personnel_required": "2–4 officers",
# #             "support_units": []
# #         }

# #     # ----------------------------
# #     # EXPLAINABILITY (WHY THIS PREDICTION)
# #     # ----------------------------
# #     explanation = []

# #     if data.hour >= 20:
# #         explanation.append("Late night hours increase incident probability")

# #     if data.is_weekend == 1:
# #         explanation.append("Weekend crowd surge detected")

# #     if data.crime_count_last_7d >= 8:
# #         explanation.append("High number of recent incidents in this zone")

# #     if not explanation:
# #         explanation.append("No strong risk indicators detected")

# #     # ----------------------------
# #     # FINAL RESPONSE
# #     # ----------------------------
# #     return {
# #         "risk_probability": round(probability, 3),
# #         "risk_level": risk_level,
# #         "urgency_score": urgency_score,
# #         "priority": priority,
# #         "recommended_deployment": deployment,
# #         "explanation": explanation
# #     }









# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import numpy as np
# import pickle
# import os
# import math
# import requests

# from typing import List
# import random
# from datetime import datetime, timedelta

# # -----------------------------
# # APP INIT
# # -----------------------------
# app = FastAPI(title="SafeCity API", version="1.0")

# # Allow frontend (Next.js)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # hackathon-safe
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # -----------------------------
# # LOAD ML MODEL
# # -----------------------------
# with open("backend/model/crime_risk_model.pkl", "rb") as f:
#     model = pickle.load(f)

# # -----------------------------
# # DATA MODELS
# # -----------------------------
# class CrimeInput(BaseModel):
#     crime_type: int
#     hour: int
#     day_of_week: int
#     is_weekend: int
#     zone_id: int
#     crime_count_last_7d: int
#     latitude: float
#     longitude: float


# class NewsRequest(BaseModel):
#     latitude: float
#     longitude: float


# # -----------------------------
# # MUMBAI LOCALITIES (PROTOTYPE)
# # -----------------------------
# MUMBAI_LOCALITIES = [
#     # South Mumbai
#     {"name": "Colaba", "lat": 18.9067, "lng": 72.8147},
#     {"name": "Fort", "lat": 18.9346, "lng": 72.8354},
#     {"name": "Marine Lines", "lat": 18.9430, "lng": 72.8258},
#     {"name": "Churchgate", "lat": 18.9352, "lng": 72.8271},
#     {"name": "Byculla", "lat": 18.9766, "lng": 72.8322},

#     # Central Mumbai
#     {"name": "Dadar", "lat": 19.0170, "lng": 72.8440},
#     {"name": "Lower Parel", "lat": 18.9977, "lng": 72.8330},
#     {"name": "Worli", "lat": 19.0176, "lng": 72.8166},
#     {"name": "Mahim", "lat": 19.0350, "lng": 72.8397},
#     {"name": "Sion", "lat": 19.0436, "lng": 72.8636},

#     # Western Suburbs
#     {"name": "Bandra", "lat": 19.0600, "lng": 72.8300},
#     {"name": "Khar", "lat": 19.0695, "lng": 72.8290},
#     {"name": "Santacruz", "lat": 19.0810, "lng": 72.8416},
#     {"name": "Vile Parle", "lat": 19.0960, "lng": 72.8530},
#     {"name": "Andheri", "lat": 19.1190, "lng": 72.8460},
#     {"name": "Jogeshwari", "lat": 19.1430, "lng": 72.8465},
#     {"name": "Goregaon", "lat": 19.1551, "lng": 72.8495},
#     {"name": "Malad", "lat": 19.1874, "lng": 72.8484},
#     {"name": "Kandivali", "lat": 19.2050, "lng": 72.8500},
#     {"name": "Borivali", "lat": 19.2295, "lng": 72.8565},

#     # Central & Eastern Suburbs
#     {"name": "Kurla", "lat": 19.0720, "lng": 72.8840},
#     {"name": "Ghatkopar", "lat": 19.0860, "lng": 72.9080},
#     {"name": "Vikhroli", "lat": 19.1100, "lng": 72.9260},
#     {"name": "Powai", "lat": 19.1176, "lng": 72.9060},
#     {"name": "Bhandup", "lat": 19.1450, "lng": 72.9360},
#     {"name": "Mulund", "lat": 19.1726, "lng": 72.9425},

#     # Harbour / Navi-adjacent
#     {"name": "Chembur", "lat": 19.0620, "lng": 72.8990},
#     {"name": "Wadala", "lat": 19.0215, "lng": 72.8736},
#     {"name": "Govandi", "lat": 19.0550, "lng": 72.9150},
#     {"name": "Mankhurd", "lat": 19.0480, "lng": 72.9320}
# ]


# # -----------------------------
# # HELPERS
# # -----------------------------
# def distance(lat1, lng1, lat2, lng2):
#     return math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2)


# def get_nearest_locality(lat, lng):
#     nearest = None
#     min_dist = float("inf")

#     for loc in MUMBAI_LOCALITIES:
#         d = distance(lat, lng, loc["lat"], loc["lng"])
#         if d < min_dist:
#             min_dist = d
#             nearest = loc

#     return nearest


# # -----------------------------
# # 1️⃣ CRIME RISK PREDICTION
# # -----------------------------
# @app.post("/predict")
# def predict_risk(data: CrimeInput):
#     features = np.array([[
#         data.crime_type,
#         data.hour,
#         data.day_of_week,
#         data.is_weekend,
#         data.zone_id,
#         data.crime_count_last_7d,
#         data.latitude,
#         data.longitude
#     ]])

#     probability = model.predict_proba(features)[0][1]

#     # Risk bucket
#     if probability >= 0.7:
#         risk_level = "High"
#         urgency_score = int(80 + probability * 20)
#         priority = "Critical"
#         deployment = {
#             "unit_type": "Riot Control Unit",
#             "personnel_required": "30–40 officers",
#             "support_units": ["Medical Van", "Traffic Police", "Drone Surveillance"]
#         }
#     elif probability >= 0.4:
#         risk_level = "Medium"
#         urgency_score = int(50 + probability * 30)
#         priority = "High"
#         deployment = {
#             "unit_type": "Local Police Patrol",
#             "personnel_required": "12–15 officers",
#             "support_units": ["Traffic Police"]
#         }
#     else:
#         risk_level = "Low"
#         urgency_score = int(20 + probability * 30)
#         priority = "Moderate"
#         deployment = {
#             "unit_type": "Routine Patrol",
#             "personnel_required": "4–6 officers",
#             "support_units": []
#         }

#     # explanation = []
#     # if data.hour >= 22:
#     #     explanation.append("Late night hours increase incident probability")
#     # if data.is_weekend == 1:
#     #     explanation.append("Weekend crowd surge detected")
#     # if data.crime_count_last_7d >= 8:
#     #     explanation.append("High number of recent incidents in this zone")
#     # if not explanation:
#     #     explanation.append("No strong recent risk indicators detected")

#     explanation = []

#     if probability >= 0.7:
#         explanation.append("Elevated crime risk probability predicted by historical patterns")

#     if data.hour >= 22:
#         explanation.append("Late night hours historically correlate with higher incident rates")

#     if data.is_weekend == 1:
#         explanation.append("Weekend crowd activity increases situational risk")

#     if data.crime_count_last_7d >= 8:
#         explanation.append("Spike in recent incident frequency observed")

#     if probability < 0.4:
#         explanation.append("Low historical incident density in this zone")


#     return {
#         "risk_probability": round(float(probability), 3),
#         "risk_level": risk_level,
#         "urgency_score": urgency_score,
#         "priority": priority,
#         "recommended_deployment": deployment,
#         "explanation": explanation
#     }


# # -----------------------------
# # 2️⃣ CONTEXTUAL CRIME NEWS
# # -----------------------------
# @app.post("/contextual-news")
# def get_contextual_news(data: NewsRequest):
#     api_key = "dbbf6b9ad2d3489a629c18cc55263624"
#     if not api_key:
#         return {"error": "GNEWS_API_KEY not configured"}

#     # Convert lat/lng → locality
#     locality = get_nearest_locality(data.latitude, data.longitude)
#     area_name = locality["name"]

#     # Crime-focused query
#     query = f"crime OR violence OR robbery OR assault AND {area_name} Mumbai"

#     url = "https://gnews.io/api/v4/search"
#     params = {
#         "q": query,
#         "lang": "en",
#         "country": "in",
#         "max": 5,
#         "apikey": api_key
#     }

#     response = requests.get(url, params=params)
#     news_data = response.json()

#     articles = []
#     for article in news_data.get("articles", []):
#         articles.append({
#             "title": article.get("title"),
#             "source": article.get("source", {}).get("name"),
#             "published_at": article.get("publishedAt"),
#             "url": article.get("url")
#         })

#     return {
#         "locality": f"{area_name}, Mumbai",
#         "articles": articles,
#         "disclaimer": (
#             "News articles are used as contextual indicators and "
#             "do not represent verified FIR records."
#         )
#     }


# @app.get("/dashboard/summary")
# def dashboard_summary():
#     # Simulated aggregates derived from ML dataset idea
#     total_incidents = random.randint(900, 1400)
#     high_risk_zones = random.randint(8, 15)
#     avg_confidence = round(random.uniform(0.55, 0.72), 2)

#     # Risk distribution
#     risk_distribution = {
#         "low": random.randint(40, 55),
#         "medium": random.randint(25, 35),
#         "high": random.randint(15, 25),
#     }

#     # Time trend (last 7 days)
#     trend = []
#     today = datetime.now()
#     for i in range(6, -1, -1):
#         trend.append({
#             "date": (today - timedelta(days=i)).strftime("%d %b"),
#             "incidents": random.randint(90, 180)
#         })

#     # Heatmap points (hover-only)
#     heatmap_points = []
#     for loc in MUMBAI_LOCALITIES:
#         heatmap_points.append({
#             "name": loc["name"],
#             "lat": loc["lat"],
#             "lng": loc["lng"],
#             "risk": random.choice(["Low", "Medium", "High"]),
#             "incidents": random.randint(20, 120),
#             "avg_confidence": round(random.uniform(0.5, 0.8), 2)
#         })

#     return {
#         "kpis": {
#             "total_incidents": total_incidents,
#             "high_risk_zones": high_risk_zones,
#             "avg_confidence": avg_confidence
#         },
#         "risk_distribution": risk_distribution,
#         "trend": trend,
#         "heatmap_points": heatmap_points
#     }






from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
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

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)