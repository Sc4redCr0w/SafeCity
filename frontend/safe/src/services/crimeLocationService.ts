const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8001";

export interface CrimePredictionData {
  city: string;
  found: boolean;
  risk_percentage: number;
  crime_breakdown: Record<string, { count: number; percentage: number }>;
  total_incidents: number;
  unique_crime_types: number;
  avg_crimes_per_type: number;
}

export interface CrimeTypePrediction {
  city: string;
  found: boolean;
  crime_type_predictions: Record<string, number>;
}

export async function predictCrimeByCity(city: string): Promise<CrimePredictionData> {
  const res = await fetch(`${API_BASE}/api/crime/predict-by-city?city=${city}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch crime prediction");
  return res.json();
}

export async function predictCrimeTypes(city: string): Promise<CrimeTypePrediction> {
  const res = await fetch(`${API_BASE}/api/crime/predict-crime-types?city=${city}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch crime type predictions");
  return res.json();
}
