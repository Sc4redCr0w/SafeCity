import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, roc_auc_score

# -------------------------------------------------
# 1. LOAD DATASET
# -------------------------------------------------
CSV_FILE = "../../mumbai_accident_training_data.csv"
df = pd.read_csv(CSV_FILE)

print("✅ Dataset loaded")
print("Rows:", len(df))
print(df.head(), "\n")

# -------------------------------------------------
# 2. DEFINE FEATURES (X) AND TARGET (y)
# -------------------------------------------------
X = df[
    [
        "hour",
        "day_of_week",
        "is_weekend",
        "zone_id",
        "latitude",
        "longitude",
        "accident_count_last_7d"
    ]
]

y = df["accident_risk"]

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

print("✅ Accident risk model trained\n")

# -------------------------------------------------
# 5. EVALUATION
# -------------------------------------------------
probs = model.predict_proba(X_test)[:, 1]
preds = (probs >= 0.6).astype(int)

accuracy = accuracy_score(y_test, preds)
roc_auc = roc_auc_score(y_test, probs)

print("📊 Classification Report:")
print(classification_report(y_test, preds))
print("Accuracy:", round(accuracy * 100, 2), "%")
print("ROC-AUC:", round(roc_auc, 3), "\n")

# -------------------------------------------------
# 6. EXPORT MODEL (PICKLE)
# -------------------------------------------------
bundle = {
    "model": model,
    "features": list(X.columns),
    "threshold": 0.6,
    "type": "accident_risk_model"
}

with open("accident_risk_model.pkl", "wb") as f:
    pickle.dump(bundle, f)

print("✅ Model exported as accident_risk_model.pkl")
