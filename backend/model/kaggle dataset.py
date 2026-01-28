import kagglehub
import pandas as pd
import os

path = kagglehub.dataset_download("sudhanvahg/indian-crimes-dataset")

os.makedirs("indian_crimes_csv", exist_ok=True)

for root, _, files in os.walk(path):
    for file in files:
        file_path = os.path.join(root, file)

        if file.endswith((".xlsx", ".xls")):
            df = pd.read_excel(file_path)
            df.to_csv(
                os.path.join("indian_crimes_csv", file.rsplit(".", 1)[0] + ".csv"),
                index=False
            )

        elif file.endswith(".csv"):
            df = pd.read_csv(file_path)
            df.to_csv(
                os.path.join("indian_crimes_csv", file),
                index=False
            )
