# # import kagglehub
# # import pandas as pd
# # import os

# # path = kagglehub.dataset_download("sudhanvahg/indian-crimes-dataset")

# # os.makedirs("indian_crimes_csv", exist_ok=True)

# # for root, _, files in os.walk(path):
# #     for file in files:
# #         file_path = os.path.join(root, file)

# #         if file.endswith((".xlsx", ".xls")):
# #             df = pd.read_excel(file_path)
# #             df.to_csv(
# #                 os.path.join("indian_crimes_csv", file.rsplit(".", 1)[0] + ".csv"),
# #                 index=False
# #             )

# #         elif file.endswith(".csv"):
# #             df = pd.read_csv(file_path)
# #             df.to_csv(
# #                 os.path.join("indian_crimes_csv", file),
# #                 index=False
# #             )




# import pandas as pd
# import numpy as np
# import pickle

# from sklearn.preprocessing import LabelEncoder
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# # -------------------------------------------------
# # 1. LOAD DATA
# # -------------------------------------------------
# df = pd.read_csv("indian_crimes_csv/crime_dataset_india.csv")

# # -------------------------------------------------
# # 2. PARSE DATE & TIME (INDIAN FORMAT SAFE)
# # -------------------------------------------------
# df["date"] = pd.to_datetime(
#     df["Date of Occurrence"],
#     dayfirst=True,
#     errors="coerce"
# )

# df["hour"] = pd.to_datetime(
#     df["Time of Occurrence"],
#     dayfirst=True,
#     errors="coerce"
# ).dt.hour

# df = df.dropna(subset=["date", "hour"])

# # -------------------------------------------------
# # 3. TIME FEATURES
# # -------------------------------------------------
# df["day_of_week"] = df["date"].dt.dayofweek
# df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)
# df["month"] = df["date"].dt.month

# # -------------------------------------------------
# # 4. LOCATION ENCODING
# # -------------------------------------------------
# le_city = LabelEncoder()
# df["City_encoded"] = le_city.fit_transform(df["City"])

# # -------------------------------------------------
# # 5. HISTORICAL CRIME COUNTS (VERSION SAFE)
# # -------------------------------------------------
# df = df.sort_values("date")

# # helper column for counting
# df["_count"] = 1

# df["crime_count_last_24h"] = (
#     df.groupby("City")
#       .rolling("1D", on="date")["_count"]
#       .count()
#       .reset_index(level=0, drop=True)
# )

# df["crime_count_last_7d"] = (
#     df.groupby("City")
#       .rolling("7D", on="date")["_count"]
#       .count()
#       .reset_index(level=0, drop=True)
# )

# df["crime_count_last_30d"] = (
#     df.groupby("City")
#       .rolling("30D", on="date")["_count"]
#       .count()
#       .reset_index(level=0, drop=True)
# )

# df[
#     ["crime_count_last_24h", "crime_count_last_7d", "crime_count_last_30d"]
# ] = df[
#     ["crime_count_last_24h", "crime_count_last_7d", "crime_count_last_30d"]
# ].fillna(0)

# df = df.drop(columns=["_count"])

# # -------------------------------------------------
# # 6. TARGET VARIABLE (CRIME RISK)
# # -------------------------------------------------
# df["crime_risk"] = (
#     (df["crime_count_last_7d"] >= 5) |
#     ((df["is_weekend"] == 1) & (df["hour"] >= 20))
# ).astype(int)

# # -------------------------------------------------
# # 7. FEATURE SET
# # -------------------------------------------------
# features = [
#     "City_encoded",
#     "hour",
#     "day_of_week",
#     "is_weekend",
#     "month",
#     "crime_count_last_24h",
#     "crime_count_last_7d",
#     "crime_count_last_30d"
# ]

# X = df[features]
# y = df["crime_risk"]

# # -------------------------------------------------
# # 8. TRAIN–TEST SPLIT
# # -------------------------------------------------
# X_train, X_test, y_train, y_test = train_test_split(
#     X,
#     y,
#     test_size=0.2,
#     random_state=42,
#     stratify=y
# )

# # -------------------------------------------------
# # 9. TRAIN MODEL
# # -------------------------------------------------
# model = RandomForestClassifier(
#     n_estimators=300,
#     max_depth=12,
#     random_state=42
# )

# model.fit(X_train, y_train)

# # -------------------------------------------------
# # 10. EXPORT MODEL (PICKLE)
# # -------------------------------------------------
# bundle = {
#     "model": model,
#     "features": features,
#     "city_encoder": le_city,
#     "type": "city_time_crime_risk",
#     "note": "Predicts probability of crime based on city and time"
# }

# with open("city_time_crime_risk_model.pkl", "wb") as f:
#     pickle.dump(bundle, f)



# y_pred = model.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)
# print("Accuracy:", round(accuracy * 100, 2), "%")

import pandas as pd
import numpy as np
import pickle

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, roc_auc_score, classification_report

# -------------------------------------------------
# 1. LOAD DATA
# -------------------------------------------------
df = pd.read_csv("indian_crimes_csv/crime_dataset_india.csv")

# -------------------------------------------------
# 2. PARSE DATE & TIME (INDIAN FORMAT SAFE)
# -------------------------------------------------
df["date"] = pd.to_datetime(
    df["Date of Occurrence"],
    dayfirst=True,
    errors="coerce"
)

df["hour"] = pd.to_datetime(
    df["Time of Occurrence"],
    dayfirst=True,
    errors="coerce"
).dt.hour

# Remove invalid rows
df = df.dropna(subset=["date", "hour"])

# -------------------------------------------------
# 3. TIME FEATURES
# -------------------------------------------------
df["day_of_week"] = df["date"].dt.dayofweek
df["is_weekend"] = (df["day_of_week"] >= 5).astype(int)
df["month"] = df["date"].dt.month

# -------------------------------------------------
# 4. LOCATION ENCODING
# -------------------------------------------------
le_city = LabelEncoder()
df["City_encoded"] = le_city.fit_transform(df["City"])

# -------------------------------------------------
# 5. HISTORICAL CRIME COUNTS (PANDAS-SAFE)
# -------------------------------------------------
df = df.sort_values("date")

df["_count"] = 1

df["crime_count_last_24h"] = (
    df.groupby("City")
      .rolling("1D", on="date")["_count"]
      .count()
      .reset_index(level=0, drop=True)
)

df["crime_count_last_7d"] = (
    df.groupby("City")
      .rolling("7D", on="date")["_count"]
      .count()
      .reset_index(level=0, drop=True)
)

df["crime_count_last_30d"] = (
    df.groupby("City")
      .rolling("30D", on="date")["_count"]
      .count()
      .reset_index(level=0, drop=True)
)

df[
    ["crime_count_last_24h", "crime_count_last_7d", "crime_count_last_30d"]
] = df[
    ["crime_count_last_24h", "crime_count_last_7d", "crime_count_last_30d"]
].fillna(0)

df = df.drop(columns=["_count"])

# -------------------------------------------------
# 6. TARGET VARIABLE (CRIME RISK)
# -------------------------------------------------
df["crime_risk"] = (
    (df["crime_count_last_7d"] >= 5) |
    ((df["is_weekend"] == 1) & (df["hour"] >= 20))
).astype(int)

# -------------------------------------------------
# 7. FEATURE SET
# -------------------------------------------------
features = [
    "City_encoded",
    "hour",
    "day_of_week",
    "is_weekend",
    "month",
    "crime_count_last_24h",
    "crime_count_last_7d",
    "crime_count_last_30d"
]

X = df[features]
y = df["crime_risk"]

# -------------------------------------------------
# 8. TRAIN–TEST SPLIT
# -------------------------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -------------------------------------------------
# 9. TRAIN MODEL
# -------------------------------------------------
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    random_state=42
)

model.fit(X_train, y_train)

# -------------------------------------------------
# 10. EVALUATION (CORRECT LOGIC)
# -------------------------------------------------
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

accuracy = accuracy_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_prob)

print("Accuracy:", round(accuracy * 100, 2), "%")
print("ROC-AUC:", round(roc_auc, 3))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# -------------------------------------------------
# 11. EXPORT MODEL (PICKLE)
# -------------------------------------------------
bundle = {
    "model": model,
    "features": features,
    "city_encoder": le_city,
    "type": "city_time_crime_risk",
    "note": "Predicts probability of crime based on city and time"
}

with open("city_time_crime_risk_model.pkl", "wb") as f:
    pickle.dump(bundle, f)
