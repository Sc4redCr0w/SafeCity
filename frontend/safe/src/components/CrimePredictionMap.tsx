"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CityMarker {
  name: string;
  lat: number;
  lng: number;
}

interface CrimePredictionMapProps {
  onCitySelect: (city: string) => void;
}

// Major Indian cities with crime data
const CITIES: CityMarker[] = [
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Ludhiana", lat: 30.9010, lng: 75.8573 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
  { name: "Visakhapatnam", lat: 17.6869, lng: 83.2185 },
  { name: "Ghaziabad", lat: 28.6692, lng: 77.4538 },
];

export function CrimePredictionMap({ onCitySelect }: CrimePredictionMapProps) {
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Create custom icon
    const icon = L.icon({
      iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444' width='32' height='32'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12c0 8 10 18 10 18s10-10 10-18c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'/%3E%3C/svg%3E",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
    setCustomIcon(icon);
  }, []);

  if (!customIcon) return <div className="bg-slate-900/50 rounded-lg p-4 h-96 flex items-center justify-center text-gray-400">Loading map...</div>;

  const center: LatLngExpression = [20.5937, 78.9629]; // Center of India

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-600/50 overflow-hidden h-96">
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {CITIES.map((city) => (
          <Marker key={city.name} position={[city.lat, city.lng]} icon={customIcon}>
            <Popup className="crime-popup">
              <div className="text-center">
                <p className="font-bold text-gray-900">{city.name}</p>
                <button
                  onClick={() => onCitySelect(city.name)}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Analyze
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
