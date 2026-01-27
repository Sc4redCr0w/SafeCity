
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

# -------------------------------------------------
# 1. LOAD DATA
# -------------------------------------------------
CSV_FILE = "../../mumbai_crime_training_data.csv"

df = pd.read_csv(CSV_FILE)

print("✅ Dataset loaded")
print("Rows:", len(df))
print(df.head(), "\n")

# -------------------------------------------------
# 2. DEFINE FEATURES (X) AND TARGET (y)
# -------------------------------------------------
X = df[
    [
        "crime_type",
        "hour",
        "day_of_week",
        "is_weekend",
        "zone_id",
        "crime_count_last_7d",
        "latitude",
        "longitude"
    ]
]

y = df["incident_risk"]

# Sanity check
print("Label distribution:")
print(y.value_counts(), "\n")

# -------------------------------------------------
# 3. TRAIN–TEST SPLIT
# -------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -------------------------------------------------
# 4. TRAIN MODEL
# -------------------------------------------------
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

print("✅ Model training completed\n")

# -------------------------------------------------
# 5. TEST MODEL (PREDICT CHANCES OF CRIME)
# -------------------------------------------------
# Probability that incident_risk = 1
crime_probabilities = model.predict_proba(X_test)[:, 1]

# Convert probability → class using threshold
THRESHOLD = 0.6
y_pred = (crime_probabilities >= THRESHOLD).astype(int)

# -------------------------------------------------
# 6. EVALUATION
# -------------------------------------------------
print("📊 Classification Report:")
print(classification_report(y_test, y_pred))

roc_auc = roc_auc_score(y_test, crime_probabilities)
print("ROC-AUC Score:", round(roc_auc, 3), "\n")

# -------------------------------------------------
# 7. SHOW SAMPLE PREDICTIONS
# -------------------------------------------------
results = X_test.copy()
results["actual_risk"] = y_test.values
results["predicted_probability"] = crime_probabilities
results["predicted_risk"] = y_pred

print("🔍 Sample predictions:")
print(results.head(10))

# -------------------------------------------------
# 8. FEATURE IMPORTANCE (VERY IMPORTANT FOR JUDGES)
# -------------------------------------------------
importance = pd.DataFrame({
    "feature": X.columns,
    "importance": model.feature_importances_
}).sort_values(by="importance", ascending=False)

print("\n🔥 Feature Importance:")
print(importance)


accuracy = accuracy_score(y_test, y_pred)
print("✅ Accuracy:", round(accuracy * 100, 2), "%")
import pickle

with open("crime_risk_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved using pickle")