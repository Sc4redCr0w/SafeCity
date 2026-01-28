"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface HeatmapPoint {
  name: string;
  lat: number;
  lng: number;
  incidents: number;
  intensity: number;
  risk_level: string;
  avg_confidence: number;
}

interface HeatmapMapProps {
  points: HeatmapPoint[];
}

const getRiskColor = (risk_level: string, intensity: number) => {
  // Color based on risk level
  if (risk_level === "High") return "#ef4444";
  if (risk_level === "Medium") return "#facc15";
  return "#22c55e";
};

const getCircleRadius = (intensity: number) => {
  // Size based on intensity (5-30px)
  return 5 + intensity * 25;
};

export default function FilteredHeatmapMap({ points }: HeatmapMapProps) {
  return (
    <MapContainer
      center={[19.0760, 72.8777]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {points.map((point, idx) => (
        <CircleMarker
          key={idx}
          center={[point.lat, point.lng]}
          radius={getCircleRadius(point.intensity)}
          pathOptions={{
            color: getRiskColor(point.risk_level, point.intensity),
            fillColor: getRiskColor(point.risk_level, point.intensity),
            fillOpacity: 0.6 + point.intensity * 0.3,
            weight: 2,
          }}
        >
          <Tooltip>
            <div className="text-sm">
              <div className="font-semibold">{point.name}</div>
              <div className="text-xs text-gray-600">
                Risk: <span className="font-medium">{point.risk_level}</span>
              </div>
              <div className="text-xs text-gray-600">
                Incidents: <span className="font-medium">{point.incidents}</span>
              </div>
              <div className="text-xs text-gray-600">
                Heat Index:{" "}
                <span className="font-medium">
                  {(point.intensity * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
