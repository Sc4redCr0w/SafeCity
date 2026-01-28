"use client";

import { MapContainer, TileLayer, CircleMarker, useMapEvents } from "react-leaflet";
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
    <CircleMarker
      center={position}
      radius={12}
      pathOptions={{
        color: '#3b82f6',
        fillColor: '#60a5fa',
        fillOpacity: 0.8,
        weight: 3,
      }}
    />
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
