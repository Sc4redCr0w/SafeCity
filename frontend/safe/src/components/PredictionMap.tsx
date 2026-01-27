"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "@/lib/leafletFix";
import { CrimePredictionResponse } from "@/types/prediction";

interface Props {
  onPredictionResult?: (result: CrimePredictionResponse | null) => void;
}

function InteractivePredictionMarker({ onPredictionResult }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CrimePredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());

  const predictAtLocation = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      setError(null);

      const now = new Date();
      
      // Calculate zone_id based on latitude and longitude
      const zoneId = Math.abs(Math.floor((lat + lng) * 10)) % 32;
      
      // Determine if it's a weekend
      const dayOfWeek = now.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 0;

      const payload = {
        crime_type: 0,
        hour: selectedHour,
        day_of_week: dayOfWeek,
        is_weekend: isWeekend,
        zone_id: zoneId,
        crime_count_last_7d: 5,
        latitude: lat,
        longitude: lng
      };

      const response = await fetch("http://127.0.0.1:8001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);
      onPredictionResult?.(data);
    } catch (err) {
      setError("Failed to get prediction. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setResult(null);
      predictAtLocation(lat, lng);
    }
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        <div style={{ width: "280px" }}>
          <h3 style={{ margin: "0 0 8px 0" }}>Accident Risk Prediction</h3>
          
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "12px", fontWeight: "bold" }}>
              Hour (0-23):
            </label>
            <input 
              type="number" 
              min="0" 
              max="23" 
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
              style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>

          <button
            onClick={() => position && predictAtLocation(position[0], position[1])}
            disabled={loading}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: loading ? "#ccc" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "8px"
            }}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {error && (
            <div style={{ color: "red", fontSize: "12px", marginBottom: "8px" }}>
              {error}
            </div>
          )}

          {result && (
            <div style={{ fontSize: "12px", backgroundColor: "#f0f9ff", padding: "8px", borderRadius: "4px" }}>
              <div style={{ marginBottom: "4px" }}>
                <strong>Risk Probability:</strong> {(result.risk_probability * 100).toFixed(1)}%
              </div>
              <div style={{ marginBottom: "4px" }}>
                <strong>Risk Level:</strong> <span style={{ color: result.risk_level === "High" ? "red" : result.risk_level === "Medium" ? "orange" : "green" }}>
                  {result.risk_level}
                </span>
              </div>
              <div style={{ marginBottom: "4px" }}>
                <strong>Priority:</strong> {result.priority}
              </div>
              <div style={{ marginBottom: "4px" }}>
                <strong>Urgency Score:</strong> {result.urgency_score}
              </div>
            </div>
          )}

          <div style={{ fontSize: "11px", color: "#666", marginTop: "8px" }}>
            <p style={{ margin: "0" }}>
              📍 {position[0].toFixed(4)}, {position[1].toFixed(4)}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

function PredictionMap({ onPredictionResult }: Props) {
  return (
    <MapContainer
      center={[19.076, 72.877]} // Mumbai center
      zoom={12}
      style={{ height: "600px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InteractivePredictionMarker onPredictionResult={onPredictionResult} />
    </MapContainer>
  );
}

export default PredictionMap;
