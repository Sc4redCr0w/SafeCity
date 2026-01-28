// // "use client";

// // import { useState } from "react";
// // import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import L from "leaflet";

// // // Fix Leaflet icon issue
// // delete (L.Icon.Default.prototype as any)._getIconUrl;
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl:
// //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
// //   iconUrl:
// //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
// //   shadowUrl:
// //     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// // });

// // function LocationPicker({ setLatLng }: any) {
// //   useMapEvents({
// //     click(e) {
// //       setLatLng(e.latlng);
// //     },
// //   });
// //   return null;
// // }

// // export default function PredictAccidentPage() {
// //   const [latLng, setLatLng] = useState({ lat: 19.076, lng: 72.877 });
// //   const [form, setForm] = useState({
// //     hour: 21,
// //     day_of_week: 5,
// //     is_weekend: 1,
// //     zone_id: 12,
// //     accident_count_last_7d: 6,
// //   });

// //   const [result, setResult] = useState<any>(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     setResult(null);

// //     const res = await fetch("http://127.0.0.1:8001/predict-accident", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         ...form,
// //         latitude: latLng.lat,
// //         longitude: latLng.lng,
// //       }),
// //     });

// //     const data = await res.json();
// //     setResult(data);
// //     setLoading(false);
// //   };

// //   return (
// //     <div className="p-8 space-y-6">
// //       <h1 className="text-3xl font-semibold">Accident Risk Prediction</h1>

// //       {/* FORM */}
// //       <div className="grid grid-cols-2 gap-4">
// //         {Object.keys(form).map((key) => (
// //           <input
// //             key={key}
// //             type="number"
// //             placeholder={key}
// //             value={(form as any)[key]}
// //             onChange={(e) =>
// //               setForm({ ...form, [key]: Number(e.target.value) })
// //             }
// //             className="p-2 rounded bg-[#0f172a] border border-white/10"
// //           />
// //         ))}
// //       </div>

// //       {/* MAP */}
// //       <div className="h-[350px] rounded overflow-hidden border border-white/10">
// //         <MapContainer
// //           center={[latLng.lat, latLng.lng]}
// //           zoom={11}
// //           className="h-full w-full"
// //         >
// //           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //           <Marker position={[latLng.lat, latLng.lng]} />
// //           <LocationPicker setLatLng={setLatLng} />
// //         </MapContainer>
// //       </div>

// //       <p className="text-sm text-gray-400">
// //         Click on map to select accident location
// //       </p>

// //       {/* BUTTON */}
// //       <button
// //         onClick={handleSubmit}
// //         className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
// //       >
// //         {loading ? "Predicting..." : "Predict Accident Risk"}
// //       </button>

// //       {/* RESULT */}
// //       {result && (
// //         <div className="mt-6 p-4 rounded bg-[#020617] border border-white/10">
// //           <p>
// //             <strong>Risk Probability:</strong>{" "}
// //             {(result.accident_risk_probability * 100).toFixed(1)}%
// //           </p>
// //           <p>
// //             <strong>Risk Level:</strong>{" "}
// //             <span
// //               className={
// //                 result.accident_risk_level === "High"
// //                   ? "text-red-400"
// //                   : result.accident_risk_level === "Medium"
// //                   ? "text-yellow-400"
// //                   : "text-green-400"
// //               }
// //             >
// //               {result.accident_risk_level}
// //             </span>
// //           </p>
// //           <p>
// //             <strong>Severity:</strong> {result.severity}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// export default function PredictAccidentPage() {
//   const [form, setForm] = useState({
//     hour: 21,
//     day_of_week: 5,
//     is_weekend: 1,
//     zone_id: 12,
//     accident_count_last_7d: 6,
//     latitude: 19.076,
//     longitude: 72.877,
//   });

//   const [result, setResult] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   // ---------------- MAP CLICK ----------------
//   function LocationPicker() {
//     useMapEvents({
//       click(e) {
//         setForm({
//           ...form,
//           latitude: e.latlng.lat,
//           longitude: e.latlng.lng,
//         });
//       },
//     });
//     return <Marker position={[form.latitude, form.longitude]} />;
//   }

//   // ---------------- PREDICT ----------------
//   async function handlePredict() {
//     setLoading(true);
//     setResult(null);

//     try {
//       const res = await fetch("http://127.0.0.1:8001/predict-accident", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const confidence = result
//     ? Math.round(result.accident_risk_probability * 100)
//     : 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] p-10 text-white">
//       <h1 className="text-3xl font-bold mb-6">Accident Risk Prediction</h1>

//       ---------------- INPUTS ----------------
//       {/* <div className="grid grid-cols-2 gap-4 mb-6">
//         <input className="input" value={form.hour} disabled />
//         <input className="input" value={form.day_of_week} disabled />
//         <input className="input" value={form.is_weekend} disabled />
//         <input className="input" value={form.zone_id} disabled />
//         <input className="input col-span-2" value={form.accident_count_last_7d} disabled />
//       </div> */}

//       {/* ---------------- MAP ---------------- */}
//       <div className="rounded-xl overflow-hidden border border-white/10 mb-6">
//         <MapContainer
//           center={[form.latitude, form.longitude]}
//           zoom={10}
//           style={{ height: 320, width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <LocationPicker />
//         </MapContainer>
//       </div>

//       <button
//         onClick={handlePredict}
//         className="bg-blue-600 hover:bg-blue-500 transition px-6 py-2 rounded-lg font-medium"
//       >
//         {loading ? "Predicting..." : "Predict Accident Risk"}
//       </button>

//       {/* ---------------- RESULT ---------------- */}
//       {result && (
//         <div className="mt-8 space-y-6">

//           {/* Risk Summary */}
//           <div className="rounded-xl bg-black/40 border border-white/10 p-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Risk Assessment</h2>
//               <span
//                 className={`px-4 py-1 rounded-full text-sm font-medium
//                   ${result.accident_risk_level === "High"
//                     ? "bg-red-500/20 text-red-400"
//                     : result.accident_risk_level === "Medium"
//                     ? "bg-yellow-500/20 text-yellow-300"
//                     : "bg-green-500/20 text-green-400"
//                   }`}
//               >
//                 {result.accident_risk_level} Risk
//               </span>
//             </div>

//             <p className="mt-2 text-sm text-gray-300">
//               Severity: <span className="text-orange-400 font-semibold">{result.severity}</span>
//             </p>
//           </div>

//           {/* Confidence Meter */}
//           <div className="rounded-xl bg-black/40 border border-white/10 p-6">
//             <p className="text-sm mb-2">Model Confidence</p>
//             <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
//               <div
//                 className={`h-full transition-all
//                   ${confidence >= 80
//                     ? "bg-red-500"
//                     : confidence >= 50
//                     ? "bg-yellow-400"
//                     : "bg-green-500"
//                   }`}
//                 style={{ width: `${confidence}%` }}
//               />
//             </div>
//             <p className="text-xs text-gray-400 mt-1">{confidence}% confidence</p>
//           </div>

//           {/* Explainability (REUSED LOGIC) */}
//           <div className="rounded-xl bg-black/40 border border-white/10 p-6 text-sm leading-relaxed">
//             {confidence >= 90 && (
//               <>
//                 ⚠️ <b>Very high accident risk detected.</b><br />
//                 Around <b>{form.accident_count_last_7d}</b> accidents were reported near this
//                 location in the past <b>7 days</b>.
//                 <br />
//                 Late-hour activity and recent incident clustering significantly increase risk.
//               </>
//             )}

//             {confidence >= 60 && confidence < 90 && (
//               <>
//                 ⚠️ <b>Moderate accident risk.</b><br />
//                 This area has shown recurring accident patterns, especially during
//                 non-peak hours. Caution is advised.
//               </>
//             )}

//             {confidence < 60 && (
//               <>
//                 ✅ <b>Low accident risk.</b><br />
//                 Historical accident density near this location is relatively low.
//               </>
//             )}
//           </div>

//           {/* Similar Incidents Nearby (Dashboard-style) */}
//           <div className="rounded-xl bg-black/40 border border-white/10 p-6">
//             <h3 className="font-medium mb-3">Similar Incidents Nearby</h3>
//             <ul className="text-sm text-gray-300 space-y-2">
//               <li>• {Math.floor(form.accident_count_last_7d * 1.5)} incidents within 1 km radius</li>
//               <li>• Peak occurrence between 8 PM – 11 PM</li>
//               <li>• Higher frequency on weekends</li>
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* Styling helper */}
//       <style jsx>{`
//         .input {
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.1);
//           padding: 10px;
//           border-radius: 8px;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ------------------ DYNAMIC LEAFLET IMPORTS (SSR SAFE) ------------------
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
// const useMapEvents = dynamic(
//   () => import("react-leaflet").then((m) => m.useMapEvents),
//   { ssr: false }
// );

// ------------------ MAP CLICK HANDLER ------------------
// function LocationPicker({ latitude, longitude, setForm }: any) {
//   const MapEvents = useMapEvents as any;

//   MapEvents({
//     click(e: any) {
//       setForm((prev: any) => ({
//         ...prev,
//         latitude: e.latlng.lat,
//         longitude: e.latlng.lng,
//       }));
//     },
//   });

//   return <Marker position={[latitude, longitude]} />;
// }
function LocationPicker({ latitude, longitude, setForm }: any) {
  useMapEvents({
    click(e) {
      setForm((prev: any) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return <Marker position={[latitude, longitude]} />;
}


// ------------------ PAGE ------------------
export default function PredictAccidentPage() {
  const [form, setForm] = useState({
    hour: 21,
    day_of_week: 5,
    is_weekend: 1,
    zone_id: 12,
    accident_count_last_7d: 6,
    latitude: 19.076,
    longitude: 72.877,
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ------------------ PREDICT ------------------
  async function handlePredict() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8001/predict-accident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const confidence = result
    ? Math.round(result.accident_risk_probability * 100)
    : 0;

  // ------------------ UI ------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Accident Risk Prediction</h1>

      {/* MAP */}
      <div className="rounded-xl overflow-hidden border border-white/10 mb-6">
        <MapContainer
          center={[form.latitude, form.longitude]}
          zoom={11}
          style={{ height: 340, width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker
            latitude={form.latitude}
            longitude={form.longitude}
            setForm={setForm}
          />
        </MapContainer>
      </div>

      <button
        onClick={handlePredict}
        className="bg-blue-600 hover:bg-blue-500 transition px-6 py-2 rounded-lg font-medium"
      >
        {loading ? "Predicting..." : "Predict Accident Risk"}
      </button>

      {/* ------------------ RESULT ------------------ */}
      {result && (
        <div className="mt-8 space-y-6">

          {/* Risk Summary */}
          <div className="rounded-xl bg-black/40 border border-white/10 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Risk Assessment</h2>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium
                ${
                  result.accident_risk_level === "High"
                    ? "bg-red-500/20 text-red-400"
                    : result.accident_risk_level === "Medium"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {result.accident_risk_level} Risk
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-300">
              Severity:{" "}
              <span className="text-orange-400 font-semibold">
                {result.severity}
              </span>
            </p>
          </div>

          {/* Confidence Meter */}
          <div className="rounded-xl bg-black/40 border border-white/10 p-6">
            <p className="text-sm mb-2">Model Confidence</p>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all
                  ${
                    confidence >= 80
                      ? "bg-red-500"
                      : confidence >= 50
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {confidence}% confidence
            </p>
          </div>

          {/* Explainability (REUSED LOGIC) */}
          <div className="rounded-xl bg-black/40 border border-white/10 p-6 text-sm leading-relaxed">
            {confidence >= 90 && (
              <>
                ⚠️ <b>Very high accident risk detected.</b>
                <br />
                Around{" "}
                <b>{result.recent_incidents_nearby}</b> accidents were reported
                near this location in the past{" "}
                <b>{result.incident_window_days} days</b>.
                <br />
                {result.explanation?.join(". ")}.
              </>
            )}

            {confidence >= 60 && confidence < 90 && (
              <>
                ⚠️ <b>Moderate accident risk.</b>
                <br />
                This area shows recurring accident patterns. Increased caution
                advised.
              </>
            )}

            {confidence < 60 && (
              <>
                ✅ <b>Low accident risk.</b>
                <br />
                Historical accident density near this location is low.
              </>
            )}
          </div>

          {/* Similar Incidents Nearby (BACKEND-DERIVED) */}
          <div className="rounded-xl bg-black/40 border border-white/10 p-6">
            <h3 className="font-medium mb-3">Similar Incidents Nearby</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>
                • {result.recent_incidents_nearby} incidents reported within
                recent window
              </li>
              <li>• Higher frequency during late evening hours</li>
              <li>• Weekend activity increases probability</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}