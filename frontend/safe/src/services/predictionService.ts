import {
  CrimePredictionRequest,
  CrimePredictionResponse
} from "@/types/prediction";

const API_BASE_URL = "http://127.0.0.1:8001";

 export async function predictCrimeRisk(
  payload: CrimePredictionRequest
): Promise<CrimePredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return response.json();
}


