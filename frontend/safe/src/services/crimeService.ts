const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8001";

export interface CrimeStatistics {
  total_crimes: number;
  unique_cities: number;
  unique_crime_types: number;
  crime_distribution: Record<string, number>;
  top_cities: Record<string, number>;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  city: string;
  intensity: number;
  crime_count: number;
}

export interface TopCrimes {
  top_crimes: Record<string, number>;
}

export async function getCrimeStatistics(): Promise<CrimeStatistics> {
  const res = await fetch(`${API_BASE}/api/crime/statistics`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch crime statistics");
  return res.json();
}

export async function getCrimesByCity(city: string) {
  const res = await fetch(`${API_BASE}/api/crime/by-city?city=${city}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch city crimes");
  return res.json();
}

export async function getCrimeHeatmap() {
  const res = await fetch(`${API_BASE}/api/crime/heatmap-data`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch heatmap data");
  return res.json();
}

export async function getTopCrimes(limit: number = 10): Promise<TopCrimes> {
  const res = await fetch(`${API_BASE}/api/crime/top-crimes?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch top crimes");
  return res.json();
}
