"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

type HeatmapPoint = {
  name: string;
  lat: number;
  lng: number;
  risk: "Low" | "Medium" | "High";
  incidents: number;
  avg_confidence: number;
};

const riskColors: Record<HeatmapPoint["risk"], string> = {
  Low: "#22c55e",
  Medium: "#facc15",
  High: "#ef4444",
};

export default function DashboardMap({
  points,
}: {
  points: HeatmapPoint[];
}) {
  return (
    <MapContainer
      center={[19.076, 72.8777]} // Mumbai
      zoom={11}
      style={{ height: "280px", width: "100%" }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map((p, idx) => (
        <CircleMarker
          key={idx}
          center={[p.lat, p.lng]}
          radius={10}
          pathOptions={{
            color: riskColors[p.risk],
            fillColor: riskColors[p.risk],
            fillOpacity: 0.6,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={1}>
            <div className="text-sm">
              <div className="font-semibold">{p.name}</div>
              <div>Risk: {p.risk}</div>
              <div>Incidents: {p.incidents}</div>
              <div>
                Confidence: {Math.round(p.avg_confidence * 100)}%
              </div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
