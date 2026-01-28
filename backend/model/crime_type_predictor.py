"""
Crime Type Predictor Model
Trains a classifier to predict the probability of each crime type for a given city
"""

import pandas as pd
import numpy as np
import pickle
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Get the directory of this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "indian_crimes_csv", "crime_dataset_india.csv")
MODEL_PATH = os.path.join(BASE_DIR, "crime_type_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "crime_type_encoder.pkl")

def train_crime_type_model():
    """Train a model to predict crime type probabilities for each city"""
    
    # Load data
    df = pd.read_csv(CSV_PATH)
    print(f"✅ Loaded {len(df)} crime records")
    
    # Prepare features: City (target) and Crime Description (features to predict probabilities for)
    if 'City' not in df.columns or 'Crime Description' not in df.columns:
        print("❌ Required columns not found")
        return False
    
    # Create feature: Group by City and Crime Description
    city_crime_counts = df.groupby(['City', 'Crime Description']).size().reset_index(name='count')
    
    # Encode crime descriptions
    le = LabelEncoder()
    city_crime_counts['crime_encoded'] = le.fit_transform(city_crime_counts['Crime Description'])
    
    print(f"✅ Found {len(le.classes_)} unique crime types")
    print(f"✅ Found {city_crime_counts['City'].nunique()} unique cities")
    
    # Save encoder
    with open(ENCODER_PATH, 'wb') as f:
        pickle.dump({
            'label_encoder': le,
            'crime_types': list(le.classes_),
            'cities': list(city_crime_counts['City'].unique())
        }, f)
    print(f"✅ Encoder saved to {ENCODER_PATH}")
    
    # Create dataset for model training
    # Features: city (encoded), month, hour patterns (from historical data)
    # Target: crime type
    
    # For simplicity, we'll create a simpler approach:
    # For each city, store the probability distribution of crime types
    crime_probabilities_by_city = {}
    
    for city in df['City'].unique():
        city_data = df[df['City'] == city]
        if len(city_data) > 0:
            crime_probs = city_data['Crime Description'].value_counts(normalize=True).to_dict()
            crime_probabilities_by_city[city] = crime_probs
    
    # Save the probability distributions
    model_data = {
        'crime_probabilities_by_city': crime_probabilities_by_city,
        'all_crime_types': list(df['Crime Description'].unique()),
        'label_encoder': le
    }
    
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model_data, f)
    print(f"✅ Crime type prediction model saved to {MODEL_PATH}")
    
    return True

def predict_crime_type_probabilities(city_name: str):
    """
    Get predicted probabilities for each crime type in a given city
    Returns a dictionary with crime types and their probabilities
    """
    
    if not os.path.exists(MODEL_PATH):
        return None
    
    with open(MODEL_PATH, 'rb') as f:
        model_data = pickle.load(f)
    
    crime_probabilities_by_city = model_data['crime_probabilities_by_city']
    all_crime_types = model_data['all_crime_types']
    
    # Find city (case-insensitive)
    matching_city = None
    for city in crime_probabilities_by_city.keys():
        if city.lower() == city_name.lower():
            matching_city = city
            break
    
    if matching_city is None:
        return None
    
    # Get probabilities for this city
    city_probs = crime_probabilities_by_city[matching_city]
    
    # Convert to percentages and sort by probability
    crime_predictions = {}
    for crime_type in all_crime_types:
        prob = city_probs.get(crime_type, 0)
        crime_predictions[crime_type] = round(float(prob) * 100, 2)
    
    # Sort by probability descending
    sorted_predictions = dict(sorted(crime_predictions.items(), key=lambda x: x[1], reverse=True))
    
    return sorted_predictions

if __name__ == "__main__":
    # Train the model
    train_crime_type_model()
    
    # Test with a sample city
    print("\n🧪 Testing predictions:")
    probs = predict_crime_type_probabilities("Mumbai")
    if probs:
        print(f"Crime type predictions for Mumbai:")
        for crime, prob in list(probs.items())[:5]:
            print(f"  {crime}: {prob}%")
