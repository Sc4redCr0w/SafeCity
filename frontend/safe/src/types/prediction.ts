export interface CrimePredictionRequest {
  crime_type: number;
  hour: number;
  day_of_week: number;
  is_weekend: number;
  zone_id: number;
  crime_count_last_7d: number;
  latitude: number;
  longitude: number;
}

export interface CrimePredictionResponse {
  risk_probability: number;
  risk_level: string;
  urgency_score: number;
  priority: string;
  recommended_deployment: {
    unit_type: string;
    personnel_required: string;
    support_units: string[];
  };
  explanation: string[];
}
