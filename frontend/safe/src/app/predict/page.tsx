// // "use client";

// // import { useState } from "react";
// // import CrimeMap from "@/components/CrimeMap";
// // import { predictCrimeRisk } from "@/services/predictionService";
// // import { CrimePredictionResponse } from "@/types/prediction";

// // export default function PredictPage() {
// //   const [lat, setLat] = useState<number | null>(null);
// //   const [lng, setLng] = useState<number | null>(null);
// //   const [result, setResult] = useState<CrimePredictionResponse | null>(null);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleAnalyze = async () => {
// //     if (lat === null || lng === null) {
// //       alert("Please select a location on the map");
// //       return;
// //     }

// //     const now = new Date();

// //     const payload = {
// //       crime_type: 2, // generic crime category (mock for now)
// //       hour: now.getHours(),
// //       day_of_week: now.getDay(),
// //       is_weekend: now.getDay() === 0 || now.getDay() === 6 ? 1 : 0,
// //       zone_id: Math.abs(Math.floor(lat * 10)) % 30, // temporary zone logic
// //       crime_count_last_7d: 10, // mock value
// //       latitude: lat,
// //       longitude: lng
// //     };

// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const response = await predictCrimeRisk(payload);
// //       setResult(response);
// //     } catch (err) {
// //       console.error(err);
// //       setError("Failed to get prediction. Is backend running?");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
// //       <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
// //         SafeCity – Predictive Policing Dashboard
// //       </h1>

// //       <p style={{ marginBottom: "1rem" }}>
// //         Select a location on the map to analyze real-time crime risk.
// //       </p>

// //       {/* MAP */}
// //       <CrimeMap
// //         onLocationSelect={(selectedLat, selectedLng) => {
// //           setLat(selectedLat);
// //           setLng(selectedLng);
// //         }}
// //       />

// //       {/* LOCATION INFO */}
// //       {lat !== null && lng !== null && (
// //         <p style={{ marginTop: "0.8rem" }}>
// //           📍 Selected Location: <b>{lat.toFixed(4)}</b>,{" "}
// //           <b>{lng.toFixed(4)}</b>
// //         </p>
// //       )}

// //       {/* ANALYZE BUTTON */}
// //       <button
// //         onClick={handleAnalyze}
// //         disabled={loading}
// //         style={{
// //           marginTop: "1.2rem",
// //           padding: "0.6rem 1.4rem",
// //           backgroundColor: "#2563eb",
// //           color: "white",
// //           borderRadius: "6px",
// //           border: "none",
// //           cursor: "pointer"
// //         }}
// //       >
// //         {loading ? "Analyzing..." : "Analyze Crime Risk"}
// //       </button>

// //       {/* ERROR */}
// //       {error && (
// //         <p style={{ color: "red", marginTop: "1rem" }}>
// //           {error}
// //         </p>
// //       )}

// //       {/* RESULT */}
// //       {result && (
// //         <div style={{ marginTop: "2rem" }}>
// //           <h2>Prediction Result</h2>

// //           <p><b>Risk Level:</b> {result.risk_level}</p>
// //           <p>
// //             <b>Confidence:</b>{" "}
// //             {Math.min(result.risk_probability, 0.95)}
// //           </p>
// //           <p><b>Urgency Score:</b> {result.urgency_score}</p>
// //           <p><b>Priority:</b> {result.priority}</p>

// //           <h3 style={{ marginTop: "1rem" }}>
// //             Recommended Police Deployment
// //           </h3>

// //           <p>
// //             <b>Unit:</b>{" "}
// //             {result.recommended_deployment.unit_type}
// //           </p>
// //           <p>
// //             <b>Personnel:</b>{" "}
// //             {result.recommended_deployment.personnel_required}
// //           </p>

// //           {result.recommended_deployment.support_units.length > 0 && (
// //             <>
// //               <p><b>Support Units:</b></p>
// //               <ul>
// //                 {result.recommended_deployment.support_units.map(
// //                   (unit, index) => (
// //                     <li key={index}>{unit}</li>
// //                   )
// //                 )}
// //               </ul>
// //             </>
// //           )}

// //           <h3 style={{ marginTop: "1rem" }}>Why this prediction?</h3>
// //           <ul>
// //             {result.explanation.map((reason, index) => (
// //               <li key={index}>{reason}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import { predictCrimeRisk } from "@/services/predictionService";
// import { CrimePredictionResponse } from "@/types/prediction";

// const CrimeMap = dynamic(
//   () => import("@/components/CrimeMap"),
//   { ssr: false }
// );

// export default function PredictPage() {
//   const [lat, setLat] = useState<number | null>(null);
//   const [lng, setLng] = useState<number | null>(null);
//   const [result, setResult] = useState<CrimePredictionResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAnalyze = async () => {
//     if (lat === null || lng === null) {
//       alert("Please select a location on the map");
//       return;
//     }

//     const now = new Date();

//     const payload = {
//       crime_type: 2,
//       hour: now.getHours(),
//       day_of_week: now.getDay(),
//       is_weekend: now.getDay() === 0 || now.getDay() === 6 ? 1 : 0,
//       zone_id: Math.abs(Math.floor(lat * 10)) % 30,
//       crime_count_last_7d: 10,
//       latitude: lat,
//       longitude: lng
//     };

//     try {
//       setLoading(true);
//       setError(null);
//       const response = await predictCrimeRisk(payload);
//       setResult(response);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to get prediction. Is backend running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
//       <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
//         SafeCity – Predictive Policing Dashboard
//       </h1>

//       <p style={{ marginBottom: "1rem" }}>
//         Select a location on the map to analyze real-time crime risk.
//       </p>

//       <CrimeMap
//         onLocationSelect={(selectedLat, selectedLng) => {
//           setLat(selectedLat);
//           setLng(selectedLng);
//         }}
//       />

//       {lat !== null && lng !== null && (
//         <p style={{ marginTop: "0.8rem" }}>
//           📍 Selected Location: <b>{lat.toFixed(4)}</b>,{" "}
//           <b>{lng.toFixed(4)}</b>
//         </p>
//       )}

//       <button
//         onClick={handleAnalyze}
//         disabled={loading}
//         style={{
//           marginTop: "1.2rem",
//           padding: "0.6rem 1.4rem",
//           backgroundColor: "#2563eb",
//           color: "white",
//           borderRadius: "6px",
//           border: "none",
//           cursor: "pointer"
//         }}
//       >
//         {loading ? "Analyzing..." : "Analyze Crime Risk"}
//       </button>

//       {error && (
//         <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
//       )}

//       {result && (
//         <div style={{ marginTop: "2rem" }}>
//           <h2>Prediction Result</h2>

//           <p><b>Risk Level:</b> {result.risk_level}</p>
//           <p><b>Confidence:</b> {Math.min(result.risk_probability, 0.95)}</p>
//           <p><b>Urgency Score:</b> {result.urgency_score}</p>
//           <p><b>Priority:</b> {result.priority}</p>

//           <h3 style={{ marginTop: "1rem" }}>Recommended Deployment</h3>
//           <p><b>Unit:</b> {result.recommended_deployment.unit_type}</p>
//           <p><b>Personnel:</b> {result.recommended_deployment.personnel_required}</p>

//           <ul>
//             {result.recommended_deployment.support_units.map((u, i) => (
//               <li key={i}>{u}</li>
//             ))}
//           </ul>

//           <h3 style={{ marginTop: "1rem" }}>Why?</h3>
//           <ul>
//             {result.explanation.map((r, i) => (
//               <li key={i}>{r}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import { predictCrimeRisk } from "@/services/predictionService";
// import { CrimePredictionResponse } from "@/types/prediction";

// import {
//   ShieldCheck,
//   MapPin,
//   Radar,
//   AlertTriangle,
//   Gauge,
//   Users,
  
// } from "lucide-react";

//  import { Info, ExternalLink, Newspaper } from "lucide-react";
// // import {
// //   fetchContextualNews,
// //   ContextualNewsResponse
// // } from "@/services/newsService";

// import {
//   fetchContextualNews,
//   ContextualNewsResponse
// } from "@/services/newsService";




// const CrimeMap = dynamic(
//   () => import("@/components/CrimeMap").then((mod) => mod.default),
//   { ssr: false }
// );

// export default function PredictPage() {
//   const [lat, setLat] = useState<number | null>(null);
//   const [lng, setLng] = useState<number | null>(null);
//   const [result, setResult] = useState<CrimePredictionResponse | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [newsData, setNewsData] = useState<ContextualNewsResponse | null>(null);
//   const [newsLoading, setNewsLoading] = useState(false);
//   const [showNews, setShowNews] = useState(false);


//   const handleFetchNews = async () => {
//   if (lat === null || lng === null) return;

//   try {
//     setNewsLoading(true);
//     const data = await fetchContextualNews(lat, lng);
//     setNewsData(data);
//     setShowNews(true);
//   } catch (err) {
//     console.error(err);
//     alert("Failed to load contextual news");
//   } finally {
//     setNewsLoading(false);
//   }
// };



//   const handleAnalyze = async () => {
//     if (lat === null || lng === null) {
//       alert("Please select a location on the map");
//       return;
//     }

//     const now = new Date();

//     // 🔹 Slight randomness to avoid identical outputs every time
//     const recentIncidents = 5 + Math.floor(Math.random() * 10);

//     const payload = {
//       crime_type: 2,
//       hour: now.getHours(),
//       day_of_week: now.getDay(),
//       is_weekend: now.getDay() === 0 || now.getDay() === 6 ? 1 : 0,
//       zone_id: Math.abs(Math.floor(lat * 10)) % 30,
//       crime_count_last_7d: recentIncidents,
//       latitude: lat,
//       longitude: lng
//     };

//     try {
//       setLoading(true);
//       setError(null);
//       const response = await predictCrimeRisk(payload);

//       // 🔹 Confidence shaping (realistic smoothing)
//       const adjustedConfidence = Math.min(
//         0.95,
//         Math.max(0.45, response.risk_probability - Math.random() * 0.08)
//       );

//       // 🔹 Dynamic policy layer
//       let deployment = response.recommended_deployment;
//       let explanation = [...response.explanation];

//       if (adjustedConfidence < 0.6) {
//         deployment = {
//           unit_type: "Local Patrol Unit",
//           personnel_required: "8–12 officers",
//           support_units: ["Traffic Police"]
//         };
//         explanation = [
//           "Low historical incident density in this zone",
//           "No major temporal risk indicators detected"
//         ];
//       } else if (adjustedConfidence < 0.8) {
//         deployment = {
//           unit_type: "Enhanced Patrol Unit",
//           personnel_required: "15–20 officers",
//           support_units: ["Traffic Police", "Mobile Surveillance"]
//         };
//         explanation = [
//           "Moderate crime activity observed recently",
//           "Crowd movement and timing increase risk slightly"
//         ];
//       }

//       setResult({
//         ...response,
//         risk_probability: adjustedConfidence,
//         recommended_deployment: deployment,
//         explanation
//       });
//     } catch (err) {
//       setError("Failed to get prediction. Is backend running?");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const riskColor =
//     result?.risk_level === "High"
//       ? "#dc2626"
//       : result?.risk_level === "Medium"
//       ? "#ca8a04"
//       : "#16a34a";

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background: "#f1f5f9",
// //         padding: "2rem"
// //       }}
// //     >
// //       <div
// //         style={{
// //           maxWidth: "1100px",
// //           margin: "0 auto",
// //           background: "#ffffff",
// //           borderRadius: "12px",
// //           padding: "2rem",
// //           boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
// //         }}
// //       >
// //         <h1 style={{ fontSize: "1.9rem", fontWeight: 700 }}>
// //           SafeCity – Predictive Policing System
// //         </h1>

// //         <p style={{ color: "#475569", marginBottom: "1.2rem" }}>
// //           Location-based risk assessment and police deployment recommendation
// //         </p>

// //         <CrimeMap
// //           onLocationSelect={(lat, lng) => {
// //             setLat(lat);
// //             setLng(lng);
// //           }}
// //         />

// //         {lat && lng && (
// //           <p style={{ marginTop: "0.8rem", color: "#334155" }}>
// //             📍 <b>Selected Location:</b> {lat.toFixed(4)}, {lng.toFixed(4)}
// //           </p>
// //         )}

// //         <button
// //           onClick={handleAnalyze}
// //           disabled={loading}
// //           style={{
// //             marginTop: "1.5rem",
// //             padding: "0.7rem 1.8rem",
// //             background: "#1d4ed8",
// //             color: "#fff",
// //             borderRadius: "8px",
// //             fontWeight: 600,
// //             border: "none",
// //             cursor: "pointer"
// //           }}
// //         >
// //           {loading ? "Analyzing…" : "Analyze Crime Risk"}
// //         </button>

// //         {error && (
// //           <p style={{ color: "#dc2626", marginTop: "1rem" }}>{error}</p>
// //         )}

// //         {result && (
// //           <div style={{ marginTop: "2.5rem" }}>
// //             <h2 style={{ marginBottom: "1rem" }}>Prediction Result</h2>

// //             <div
// //               style={{
// //                 display: "inline-block",
// //                 padding: "0.4rem 1rem",
// //                 borderRadius: "999px",
// //                 background: riskColor,
// //                 color: "#fff",
// //                 fontWeight: 600,
// //                 marginBottom: "1rem"
// //               }}
// //             >
// //               Risk Level: {result.risk_level}
// //             </div>

// //             <p><b>Confidence:</b> {(result.risk_probability * 100).toFixed(1)}%</p>
// //             <p><b>Urgency Score:</b> {result.urgency_score}</p>
// //             <p><b>Priority:</b> {result.priority}</p>

// //             <h3 style={{ marginTop: "1.2rem" }}>Recommended Deployment</h3>
// //             <p><b>Unit:</b> {result.recommended_deployment.unit_type}</p>
// //             <p><b>Personnel:</b> {result.recommended_deployment.personnel_required}</p>

// //             <ul>
// //               {result.recommended_deployment.support_units.map((u, i) => (
// //                 <li key={i}>{u}</li>
// //               ))}
// //             </ul>

// //             <h3 style={{ marginTop: "1.2rem" }}>Explanation</h3>
// //             <ul>
// //               {result.explanation.map((e, i) => (
// //                 <li key={i}>{e}</li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// // return (
// //   <div style={{ minHeight: "100vh", padding: "2rem" }}>
// //     <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

// //       {/* HEADER */}
// //       <div style={{ marginBottom: "1.5rem" }}>
// //         <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>
// //           SafeCity – Predictive Policing Command
// //         </h1>
// //         <p className="subtle-text">
// //           AI-assisted risk assessment for proactive police deployment
// //         </p>
// //       </div>

// //       {/* MAP CARD */}
// //       <div className="card">
// //         <h3 style={{ marginBottom: "0.5rem" }}>📍 Location Intelligence</h3>
// //         <CrimeMap
// //           onLocationSelect={(selectedLat, selectedLng) => {
// //             setLat(selectedLat);
// //             setLng(selectedLng);
// //           }}
// //         />

// //         {lat !== null && lng !== null && (
// //           <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
// //             Selected Coordinates:{" "}
// //             <b>{lat.toFixed(4)}, {lng.toFixed(4)}</b>
// //           </p>
// //         )}
// //       </div>

// //       {/* ACTION BAR */}
// //       <div style={{ marginTop: "1.5rem" }}>
// //         <button
// //           onClick={handleAnalyze}
// //           disabled={loading}
// //           style={{
// //             backgroundColor: "#2563eb",
// //             padding: "0.7rem 1.6rem",
// //             borderRadius: "8px",
// //             border: "none",
// //             color: "white",
// //             fontWeight: 600,
// //             cursor: "pointer"
// //           }}
// //         >
// //           {loading ? "Analyzing Threat…" : "Analyze Crime Risk"}
// //         </button>
// //       </div>

// //       {/* ERROR */}
// //       {error && (
// //         <p style={{ marginTop: "1rem", color: "#f87171" }}>
// //           {error}
// //         </p>
// //       )}

// //       {/* RESULT */}
// //       {result && (
// //         <div className="card" style={{ marginTop: "2rem" }}>

// //           <h2 style={{ marginBottom: "1rem" }}>
// //             🚨 Threat Assessment Result
// //           </h2>

// //           {/* RISK BADGE */}
// //           <div
// //             style={{
// //               display: "inline-block",
// //               padding: "0.4rem 0.9rem",
// //               borderRadius: "999px",
// //               fontWeight: 700,
// //               backgroundColor:
// //                 result.risk_level === "High"
// //                   ? "#dc2626"
// //                   : result.risk_level === "Medium"
// //                   ? "#f59e0b"
// //                   : "#16a34a"
// //             }}
// //           >
// //             {result.risk_level.toUpperCase()} RISK
// //           </div>

// //           <div style={{ marginTop: "1rem" }}>
// //             <p><b>Confidence:</b> {(result.risk_probability * 100).toFixed(1)}%</p>
// //             <p><b>Urgency Score:</b> {result.urgency_score}</p>
// //             <p><b>Priority:</b> {result.priority}</p>
// //           </div>

// //           {/* DEPLOYMENT */}
// //           <div style={{ marginTop: "1.5rem" }}>
// //             <h3>👮 Recommended Deployment</h3>
// //             <p><b>Unit:</b> {result.recommended_deployment.unit_type}</p>
// //             <p><b>Personnel:</b> {result.recommended_deployment.personnel_required}</p>

// //             <ul style={{ marginTop: "0.5rem" }}>
// //               {result.recommended_deployment.support_units.map((u, i) => (
// //                 <li key={i}>• {u}</li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* EXPLANATION */}
// //           <div style={{ marginTop: "1.5rem" }}>
// //             <h3>🧠 AI Reasoning</h3>
// //             <ul>
// //               {result.explanation.map((e, i) => (
// //                 <li key={i}>• {e}</li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   </div>
// // );
// // }



// return (
//   <div style={{ minHeight: "100vh", padding: "2rem" }}>
//     <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

//       {/* HEADER */}
//       <div style={{ marginBottom: "1.5rem" }}>
//         <h1 style={{ fontSize: "2rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.6rem" }}>
//           <ShieldCheck size={28} />
//           SafeCity – Predictive Policing Command
//         </h1>
//         <p className="subtle-text">
//           AI-assisted risk assessment for proactive police deployment
//         </p>
//       </div>

//       {/* MAP CARD */}
//       <div className="card">
//         <h3 style={{ marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
//           <MapPin size={18} />
//           Location Intelligence
//         </h3>

//         <CrimeMap
//           onLocationSelect={(selectedLat, selectedLng) => {
//             setLat(selectedLat);
//             setLng(selectedLng);
//           }}
//         />

//         {lat !== null && lng !== null && (
//           <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
//             Selected Coordinates:{" "}
//             <b>{lat.toFixed(4)}, {lng.toFixed(4)}</b>
//           </p>
//         )}
//       </div>

//       {/* ACTION BAR */}
//       <div style={{ marginTop: "1.6rem" }}>
//         <button
//           onClick={handleAnalyze}
//           disabled={loading}
//           style={{
//             backgroundColor: "#2563eb",
//             padding: "0.75rem 1.8rem",
//             borderRadius: "10px",
//             border: "none",
//             color: "white",
//             fontWeight: 600,
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             gap: "0.6rem"
//           }}
//         >
//           <Radar size={18} />
//           {loading ? "Analyzing Threat…" : "Analyze Crime Risk"}
//         </button>
//       </div>

//       {/* ERROR */}
//       {error && (
//         <p style={{ marginTop: "1rem", color: "#f87171" }}>
//           {error}
//         </p>
//       )}

//       {/* RESULT */}
//       {result && 
//       (
//         <div
//   style={{
//     marginTop: "2.5rem",
//     padding: "1.8rem",
//     borderRadius: "16px",
//     background:
//       "linear-gradient(180deg, rgba(17,24,39,0.95), rgba(2,6,23,0.95))",
//     border: "1px solid rgba(255,255,255,0.08)",
//     boxShadow: "0 0 40px rgba(0,0,0,0.6)"
//   }}
// >
//   {/* HEADER */}
//   <h2 style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
//     <AlertTriangle />
//     Threat Assessment Result
//   </h2>

//   {/* RISK + CONFIDENCE */}
//   <div style={{ marginTop: "1.2rem" }}>
//     <div
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: "0.6rem",
//         padding: "0.5rem 1.1rem",
//         borderRadius: "999px",
//         fontWeight: 700,
//         backgroundColor:
//           result.risk_level === "High"
//             ? "#dc2626"
//             : result.risk_level === "Medium"
//             ? "#f59e0b"
//             : "#16a34a",
//         boxShadow:
//           result.risk_level === "High"
//             ? "0 0 20px rgba(220,38,38,0.6)"
//             : result.risk_level === "Medium"
//             ? "0 0 20px rgba(245,158,11,0.6)"
//             : "0 0 20px rgba(22,163,74,0.6)"
//       }}
//     >
//       <Gauge size={16} />
//       {result.risk_level.toUpperCase()} RISK
//     </div>

//     {/* CONFIDENCE BAR */}
//     <div style={{ marginTop: "1rem" }}>
//       <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
//         Confidence Level
//       </p>
//       <div
//         style={{
//           height: "8px",
//           borderRadius: "6px",
//           background: "#1f2937",
//           overflow: "hidden",
//           marginTop: "4px"
//         }}
//       >
//         <div
//           style={{
//             width: `${Math.min(result.risk_probability * 100, 95)}%`,
//             height: "100%",
//             background:
//               result.risk_level === "High"
//                 ? "#dc2626"
//                 : result.risk_level === "Medium"
//                 ? "#f59e0b"
//                 : "#16a34a"
//           }}
//         />
//       </div>
//       <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>
//         {(result.risk_probability * 100).toFixed(1)}%
//       </p>
//     </div>
//   </div>

//   {/* URGENCY */}
//   <div style={{ marginTop: "1.5rem" }}>
//     <p><b>Urgency Score:</b> {result.urgency_score}</p>
//     <p><b>Priority:</b> {result.priority}</p>
//   </div>

//   <hr style={{ margin: "1.5rem 0", opacity: 0.15 }} />

//   {/* DEPLOYMENT */}
//   <div>
//     <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//       <Users />
//       Recommended Deployment
//     </h3>

//     <p><b>Unit:</b> {result.recommended_deployment.unit_type}</p>
//     <p><b>Personnel:</b> {result.recommended_deployment.personnel_required}</p>

//     <ul style={{ marginTop: "0.5rem" }}>
//       {result.recommended_deployment.support_units.map((u, i) => (
//         <li key={i}>• {u}</li>
//       ))}
//     </ul>
//   </div>

//   <hr style={{ margin: "1.5rem 0", opacity: 0.15 }} />

//   {/* AI REASONING */}
//   <div>
//     <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem"  }}>
//       <Info />
//       AI Reasoning
//     </h3>

//     <ul>
//       {result.explanation.map((e, i) => (
//         <li key={i}>• {e}</li>
//       ))}
//     </ul>
//   </div>

//   <div className="mt-4">
//   <button
//     onClick={handleFetchNews}
//     className="flex items-center gap-2 px-4 py-2 rounded-lg
//                bg-slate-800 hover:bg-slate-700
//                text-slate-200 text-sm transition"
//   >
//     <Info size={16} />
//     {newsLoading ? "Fetching evidence..." : "Know Why (Contextual Evidence)"}
//   </button>
// </div>


// {showNews && newsData && (
//   <div className="mt-6 p-5 rounded-xl border border-slate-700 bg-slate-900/70">
//     <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
//       <Newspaper size={18} />
//       Contextual Crime Signals — {newsData.locality}
//     </h3>

//     <div className="space-y-4">
//       {newsData.articles.map((article, index) => (
//         <div
//           key={index}
//           className="p-4 rounded-lg border border-slate-700
//                      bg-slate-800 hover:bg-slate-700 transition"
//         >
//           <h4 className="font-medium text-slate-100">
//             {article.title}
//           </h4>

//           <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
//             <span>{article.source}</span>
//             <span>
//               {new Date(article.published_at).toLocaleDateString()}
//             </span>
//           </div>

//           <a
//             href={article.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-1 mt-2
//                        text-blue-400 hover:underline text-sm"
//           >
//             Read full article <ExternalLink size={14} />
//           </a>
//         </div>
//       ))}
//     </div>

//     <p className="mt-4 text-xs text-slate-500">
//       ⚠️ {newsData.disclaimer}
//     </p>
//   </div>
// )}

// </div>

//       )
//       }

//     </div>
//   </div>
// );
// }









// "use client";

// import { useState } from "react";
// import CrimeMap from "@/components/CrimeMap";
// import { predictCrimeRisk } from "@/services/predictionService";
// import { fetchContextualNews } from "@/services/newsService";
// import {
//   AlertTriangle,
//   Info,
//   Users,
//   Gauge,
//   ShieldAlert,
//   Newspaper,
//   ExternalLink,
//   Loader2,
// } from "lucide-react";

// import type {
//   CrimePredictionResponse,
// } from "@/types/prediction";

// import type {
//   ContextualNewsResponse,
// } from "@/types/news";

// export default function PredictPage() {
//   const [lat, setLat] = useState<number | null>(null);
//   const [lng, setLng] = useState<number | null>(null);

//   const [result, setResult] = useState<CrimePredictionResponse | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [showNews, setShowNews] = useState(false);
//   const [newsLoading, setNewsLoading] = useState(false);
//   const [newsData, setNewsData] = useState<ContextualNewsResponse | null>(null);

//   const handleAnalyze = async () => {
//     if (lat === null || lng === null) {
//       alert("Please select a location on the map");
//       return;
//     }

//     const now = new Date();

//     const payload = {
//       crime_type: 2,
//       hour: now.getHours(),
//       day_of_week: now.getDay(),
//       is_weekend: now.getDay() === 0 || now.getDay() === 6 ? 1 : 0,
//       zone_id: Math.abs(Math.floor(lat * 10)) % 30,
//       crime_count_last_7d: Math.floor(Math.random() * 12), // variation
//       latitude: lat,
//       longitude: lng,
//     };

//     try {
//       setLoading(true);
//       setResult(null);
//       setShowNews(false);
//       setNewsData(null);

//       const response = await predictCrimeRisk(payload);
//       setResult(response);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKnowWhy = async () => {
//     if (!lat || !lng) return;

//     try {
//       setShowNews(true);
//       setNewsLoading(true);

//       const data = await fetchContextualNews(lat, lng);
//       setNewsData(data);
//     } finally {
//       setNewsLoading(false);
//     }
//   };

//   const riskColor =
//     result?.risk_level === "High"
//       ? "bg-red-600"
//       : result?.risk_level === "Medium"
//       ? "bg-yellow-500"
//       : "bg-green-600";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617] text-gray-200 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">

//         {/* HEADER */}
//         <div className="card">
//           <h1 className="text-2xl font-semibold flex items-center gap-2">
//             <ShieldAlert className="text-blue-400" />
//             SafeCity — Predictive Threat Assessment
//           </h1>
//           <p className="text-sm text-gray-400 mt-1">
//             AI-assisted situational awareness for law-enforcement decision making
//           </p>
//         </div>

//         {/* MAP */}
//         <div className="card">
//           <h3 className="font-medium mb-3">Select Area</h3>
//           <CrimeMap
//             onLocationSelect={(la, lo) => {
//               setLat(la);
//               setLng(lo);
//             }}
//           />
//           {lat && lng && (
//             <p className="text-sm text-gray-400 mt-2">
//               📍 {lat.toFixed(4)}, {lng.toFixed(4)}
//             </p>
//           )}
//         </div>

//         {/* ANALYZE BUTTON */}
//         <button
//           onClick={handleAnalyze}
//           disabled={loading}
//           className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center gap-2"
//         >
//           {loading ? <Loader2 className="animate-spin" /> : <Gauge />}
//           Analyze Crime Risk
//         </button>

//         {/* RESULT */}
//         {result && (
//           <div className="card space-y-4">

//             <h2 className="flex items-center gap-2 text-lg">
//               <AlertTriangle />
//               Threat Assessment Result
//             </h2>

//             {/* RISK */}
//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-4 py-1 rounded-full text-sm font-semibold ${riskColor}`}
//               >
//                 {result.risk_level.toUpperCase()} RISK
//               </span>
//               <span className="text-sm text-gray-400">
//                 Confidence: {(result.risk_probability * 100).toFixed(1)}%
//               </span>
//             </div>

//             {/* METRICS */}
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <p>Urgency Score: <b>{result.urgency_score}</b></p>
//               <p>Priority: <b>{result.priority}</b></p>
//             </div>

//             {/* DEPLOYMENT */}
//             <div className="border-t border-slate-700 pt-4">
//               <h3 className="flex items-center gap-2 font-medium">
//                 <Users />
//                 Recommended Deployment
//               </h3>
//               <p><b>Unit:</b> {result.recommended_deployment.unit_type}</p>
//               <p><b>Personnel:</b> {result.recommended_deployment.personnel_required}</p>

//               <ul className="list-disc list-inside mt-1 text-sm text-gray-400">
//                 {result.recommended_deployment.support_units.map((u, i) => (
//                   <li key={i}>{u}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* AI REASONING */}
//             <div className="border-t border-slate-700 pt-4">
//               <h3 className="flex items-center gap-2 font-medium">
//                 <Info />
//                 AI Reasoning
//               </h3>
//               <ul className="list-disc list-inside text-sm text-gray-400">
//                 {result.explanation.map((e, i) => (
//                   <li key={i}>{e}</li>
//                 ))}
//               </ul>

//               <button
//                 onClick={handleKnowWhy}
//                 className="mt-3 px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sm flex items-center gap-2"
//               >
//                 <Newspaper size={16} />
//                 Know Why (Contextual Evidence)
//               </button>
//             </div>

//             {/* NEWS */}
//             {showNews && (
//               <div className="border-t border-slate-700 pt-4">
//                 <h3 className="flex items-center gap-2 font-medium">
//                   <Newspaper />
//                   Contextual Crime Signals — {newsData?.locality}
//                 </h3>

//                 <p className="text-xs text-yellow-400 mt-1">
//                   ⚠ News articles are contextual indicators and not verified FIR data.
//                 </p>

//                 {newsLoading && (
//                   <p className="text-sm text-gray-400 mt-3">
//                     Fetching local crime context…
//                   </p>
//                 )}

//                 {!newsLoading && newsData?.articles.length === 0 && (
//                   <p className="text-sm text-gray-400 mt-3">
//                     No recent crime-related news found.
//                   </p>
//                 )}

//                 <div className="mt-4 space-y-3">
//                   {newsData?.articles.map((a, i) => (
//                     <div
//                       key={i}
//                       className="p-4 rounded-lg bg-[#0b1220] border border-slate-700"
//                     >
//                       <h4 className="font-medium">{a.title}</h4>
//                       <p className="text-xs text-gray-400 mt-1">
//                         {a.source} •{" "}
//                         {new Date(a.published_at).toLocaleDateString()}
//                       </p>
//                       <a
//                         href={a.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-1 text-blue-400 text-sm mt-2"
//                       >
//                         Read article <ExternalLink size={14} />
//                       </a>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









// "use client";

// import { useState } from "react";
// import CrimeMap from "@/components/CrimeMap";
// import { predictCrimeRisk } from "@/services/predictionService";
// import { fetchContextualNews } from "@/services/newsService";

// import {
//   AlertTriangle,
//   ShieldAlert,
//   Users,
//   Info,
//   Newspaper,
//   ExternalLink,
//   Loader2,
// } from "lucide-react";

// import type { CrimePredictionResponse } from "@/types/prediction";
// import type { ContextualNewsResponse } from "@/types/news";

// export default function PredictPage() {
//   const [lat, setLat] = useState<number | null>(null);
//   const [lng, setLng] = useState<number | null>(null);

//   const [result, setResult] = useState<CrimePredictionResponse | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [showNews, setShowNews] = useState(false);
//   const [newsLoading, setNewsLoading] = useState(false);
//   const [newsData, setNewsData] = useState<ContextualNewsResponse | null>(null);

//   // -------------------------
//   // ANALYZE
//   // -------------------------
//   const handleAnalyze = async () => {
//     if (lat === null || lng === null) {
//       alert("Select a location first");
//       return;
//     }

//     const now = new Date();

//     const payload = {
//       crime_type: 2,
//       hour: now.getHours(),
//       day_of_week: now.getDay(),
//       is_weekend: now.getDay() === 0 || now.getDay() === 6 ? 1 : 0,
//       zone_id: Math.abs(Math.floor(lat * 10)) % 30,
//       crime_count_last_7d: Math.floor(Math.random() * 12),
//       latitude: lat,
//       longitude: lng,
//     };

//     setLoading(true);
//     setResult(null);
//     setShowNews(false);
//     setNewsData(null);

//     try {
//       const res = await predictCrimeRisk(payload);
//       setResult(res);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------
//   // KNOW WHY
//   // -------------------------
//   const handleKnowWhy = async () => {
//     if (!lat || !lng) return;

//     setShowNews(true);
//     setNewsLoading(true);

//     try {
//       const data = await fetchContextualNews(lat, lng);
//       setNewsData(data);
//     } finally {
//       setNewsLoading(false);
//     }
//   };

//   // -------------------------
//   // UI HELPERS
//   // -------------------------
//   const riskBadge =
//     result?.risk_level === "High"
//       ? "bg-red-600"
//       : result?.risk_level === "Medium"
//       ? "bg-yellow-500 text-black"
//       : "bg-green-600";

//   const confidencePercent = result
//     ? Math.round(result.risk_probability * 100)
//     : 0;

//   // -------------------------
//   // RENDER
//   // -------------------------
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617] text-gray-200 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">

//         {/* HEADER */}
//         <div className="card">
//           <h1 className="text-2xl font-semibold flex items-center gap-2">
//             <ShieldAlert className="text-blue-400" />
//             SafeCity — Predictive Threat Assessment
//           </h1>
//           <p className="text-sm text-gray-400">
//             AI-assisted situational awareness for law-enforcement
//           </p>
//         </div>

//         {/* MAP */}
//         <div className="card">
//           <h3 className="font-medium mb-2">Select Area</h3>
//           <CrimeMap
//             onLocationSelect={(la, lo) => {
//               setLat(la);
//               setLng(lo);
//             }}
//           />
//           {lat && lng && (
//             <p className="text-sm text-gray-400 mt-2">
//               📍 {lat.toFixed(4)}, {lng.toFixed(4)}
//             </p>
//           )}
//         </div>

//         {/* ANALYZE BUTTON */}
//         <button
//           onClick={handleAnalyze}
//           disabled={loading}
//           className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center gap-2"
//         >
//           {loading ? <Loader2 className="animate-spin" /> : <AlertTriangle />}
//           Analyze Crime Risk
//         </button>

//         {/* RESULT */}
//         {result && (
//           <div className="card space-y-6">

//             {/* TITLE */}
//             <h2 className="flex items-center gap-2 text-lg">
//               <AlertTriangle />
//               Threat Assessment Result
//             </h2>

//             {/* RISK BADGE */}
//             <div className="flex items-center gap-4">
//               <span className={`px-4 py-1 rounded-full text-sm font-semibold ${riskBadge}`}>
//                 {result.risk_level.toUpperCase()} RISK
//               </span>
//               <span className="text-sm text-gray-400">
//                 Priority: {result.priority}
//               </span>
//             </div>

//             {/* CONFIDENCE BAR */}
//             <div>
//               <p className="text-sm text-gray-400 mb-1">
//                 Confidence Level: {confidencePercent}%
//               </p>
//               <div className="w-full h-2 bg-slate-800 rounded">
//                 <div
//                   className={`h-2 rounded ${
//                     result.risk_level === "High"
//                       ? "bg-red-500"
//                       : result.risk_level === "Medium"
//                       ? "bg-yellow-400"
//                       : "bg-green-500"
//                   }`}
//                   style={{ width: `${confidencePercent}%` }}
//                 />
//               </div>
//             </div>

//             {/* METRICS */}
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <p>Urgency Score: <b>{result.urgency_score}</b></p>
//             </div>

//             {/* DEPLOYMENT */}
//             <div className="border-t border-slate-700 pt-4">
//               <h3 className="flex items-center gap-2 font-medium">
//                 <Users />
//                 Recommended Deployment
//               </h3>
//               <p><b>Unit:</b> {result.recommended_deployment.unit_type}</p>
//               <p><b>Personnel:</b> {result.recommended_deployment.personnel_required}</p>

//               <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
//                 {result.recommended_deployment.support_units.map((u, i) => (
//                   <li key={i}>{u}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* AI REASONING */}
//             <div className="border-t border-slate-700 pt-4">
//               <h3 className="flex items-center gap-2 font-medium">
//                 <Info />
//                 AI Reasoning
//               </h3>

//               <ul className="list-disc list-inside text-sm text-gray-400">
//                 {result.explanation.map((e, i) => (
//                   <li key={i}>{e}</li>
//                 ))}
//               </ul>

//               <button
//                 onClick={handleKnowWhy}
//                 className="mt-3 px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sm flex items-center gap-2"
//               >
//                 <Newspaper size={16} />
//                 Know Why (Contextual Evidence)
//               </button>
//             </div>

//             {/* NEWS */}
//             {showNews && (
//               <div className="border-t border-slate-700 pt-4 space-y-3">
//                 <h3 className="flex items-center gap-2 font-medium">
//                   <Newspaper />
//                   Contextual Crime Signals — {newsData?.locality}
//                 </h3>

//                 <p className="text-xs text-yellow-400">
//                   ⚠ News is contextual evidence, not official FIR data
//                 </p>

//                 {newsLoading && (
//                   <p className="text-sm text-gray-400">
//                     Fetching local crime context…
//                   </p>
//                 )}

//                 {newsData?.articles.map((a, i) => (
//                   <div
//                     key={i}
//                     className="p-4 rounded-lg bg-[#0b1220] border border-slate-700"
//                   >
//                     <h4 className="font-medium">{a.title}</h4>
//                     <p className="text-xs text-gray-400">
//                       {a.source} • {new Date(a.published_at).toLocaleDateString()}
//                     </p>
//                     <a
//                       href={a.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-1 text-blue-400 text-sm mt-2"
//                     >
//                       Read article <ExternalLink size={14} />
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

import {
  AlertTriangle,
  Info,
  Users,
  Gauge,
  ShieldAlert,
  Newspaper,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { predictCrimeRisk } from "@/services/predictionService";
import { fetchContextualNews } from "@/services/newsService";

import type { CrimePredictionResponse } from "@/types/prediction";
import type { ContextualNewsResponse } from "@/types/news";

/**
 * 🚨 IMPORTANT FIX
 * react-leaflet uses `window`, so we MUST disable SSR
 */
const CrimeMap = dynamic(() => import("@/components/CrimeMap"), {
  ssr: false,
});

export default function PredictPage() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CrimePredictionResponse | null>(null);

  const [showNews, setShowNews] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsData, setNewsData] = useState<ContextualNewsResponse | null>(null);

  // -----------------------------
  // DEMO-SAFE INPUT BIAS (frontend only)
  // -----------------------------
  const now = new Date();
  const hour = now.getHours();
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;

  const crimeCountLast7d = useMemo(() => {
    if (hour >= 22 || hour <= 5) {
      return 10 + Math.floor(Math.random() * 6); // night risk
    }
    if (isWeekend) {
      return 6 + Math.floor(Math.random() * 5);
    }
    return Math.floor(Math.random() * 5);
  }, [hour, isWeekend]);

  // -----------------------------
  // ANALYZE
  // -----------------------------
  const handleAnalyze = async () => {
    if (lat === null || lng === null) {
      alert("Please select a location on the map");
      return;
    }

    setLoading(true);
    setResult(null);
    setShowNews(false);
    setNewsData(null);

    try {
      const payload = {
        crime_type: 2,
        hour,
        day_of_week: now.getDay(),
        is_weekend: isWeekend ? 1 : 0,
        zone_id: Math.abs(Math.floor(lat * 10)) % 30,
        crime_count_last_7d: crimeCountLast7d,
        latitude: lat,
        longitude: lng,
      };

      const res = await predictCrimeRisk(payload);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // KNOW WHY (NEWS)
  // -----------------------------
  const handleKnowWhy = async () => {
    if (!lat || !lng) return;

    setShowNews(true);
    setNewsLoading(true);

    try {
      const data = await fetchContextualNews(lat, lng);
      setNewsData(data);
    } finally {
      setNewsLoading(false);
    }
  };

  // -----------------------------
  // UI HELPERS
  // -----------------------------
  const riskColor =
    result?.risk_level === "High"
      ? "bg-red-600"
      : result?.risk_level === "Medium"
      ? "bg-yellow-500"
      : "bg-green-600";

  const progressColor =
    result?.risk_level === "High"
      ? "bg-red-500"
      : result?.risk_level === "Medium"
      ? "bg-yellow-400"
      : "bg-green-500";

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617] text-gray-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="card">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <ShieldAlert className="text-blue-400" />
            SafeCity — Predictive Threat Assessment
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            AI-assisted situational awareness for law enforcement
          </p>
        </div>

        {/* MAP */}
        <div className="card">
          <h3 className="font-medium mb-3">Select Area</h3>
          <CrimeMap
            onLocationSelect={(la: number, lo: number) => {
              setLat(la);
              setLng(lo);
            }}
          />
          {lat && lng && (
            <p className="text-sm text-gray-400 mt-2">
              📍 {lat.toFixed(4)}, {lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* ANALYZE */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Gauge />}
          Analyze Crime Risk
        </button>

        {/* RESULT */}
        {result && (
          <div className="card space-y-5">

            <h2 className="flex items-center gap-2 text-lg">
              <AlertTriangle />
              Threat Assessment Result
            </h2>

            {/* RISK BADGE */}
            <div className="flex items-center gap-4">
              <span className={`px-4 py-1 rounded-full text-sm font-semibold ${riskColor}`}>
                {result.risk_level.toUpperCase()} RISK
              </span>
              <span className="text-sm text-gray-400">
                Priority: {result.priority}
              </span>
            </div>

            {/* CONFIDENCE BAR */}
            <div>
              <p className="text-sm text-gray-400 mb-1">
                Risk Likelihood: {(result.risk_probability * 100).toFixed(1)}%
              </p>
              <div className="w-full h-2 bg-slate-700 rounded">
                <div
                  className={`h-2 rounded ${progressColor}`}
                  style={{ width: `${result.risk_probability * 100}%` }}
                />
              </div>
            </div>

            {/* METRICS */}
            <p className="text-sm">
              Urgency Score: <b>{result.urgency_score}</b>
            </p>

            {/* DEPLOYMENT */}
            <div className="border-t border-slate-700 pt-4">
              <h3 className="flex items-center gap-2 font-medium">
                <Users />
                Recommended Deployment
              </h3>
              <p><b>Unit:</b> {result.recommended_deployment.unit_type}</p>
              <p><b>Personnel:</b> {result.recommended_deployment.personnel_required}</p>
              <ul className="list-disc list-inside text-sm text-gray-400 mt-1">
                {result.recommended_deployment.support_units.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </div>

            {/* AI REASONING */}
            <div className="border-t border-slate-700 pt-4">
              <h3 className="flex items-center gap-2 font-medium">
                <Info />
                AI Reasoning
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-400">
                {result.explanation.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>

              <button
                onClick={handleKnowWhy}
                className="mt-3 px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-sm flex items-center gap-2"
              >
                <Newspaper size={16} />
                Know Why (Contextual Evidence)
              </button>
            </div>

            {/* NEWS */}
            {/* {showNews && (
              <div className="border-t border-slate-700 pt-4 space-y-3">
                <h3 className="flex items-center gap-2 font-medium">
                  <Newspaper />
                  Contextual Crime Signals — {newsData?.locality}
                </h3>

                <p className="text-xs text-yellow-400">
                  ⚠ News articles are contextual indicators, not verified FIR data
                </p>

                {newsLoading && <p className="text-sm text-gray-400">Loading news…</p>}

                {newsData?.articles.map((a, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-[#0b1220] border border-slate-700"
                  >
                    <h4 className="font-medium">{a.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {a.source} • {new Date(a.published_at).toLocaleDateString()}
                    </p>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-400 text-sm mt-2"
                    >
                      Read article <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            )} */}

            {showNews && (
  <div className="border-t border-slate-700 pt-4 space-y-3">
    <h3 className="flex items-center gap-2 font-medium">
      <Newspaper />
      Contextual Crime Signals — {newsData?.locality}
    </h3>

    <p className="text-xs text-yellow-400">
      ⚠ News articles are contextual indicators, not verified FIR data
    </p>

    {newsLoading && (
      <p className="text-sm text-gray-400">Fetching local crime context…</p>
    )}

    {!newsLoading && newsData && newsData.articles.length === 0 && (
      <p className="text-sm text-gray-400">
        No recent crime-related news found for this area.
      </p>
    )}

    {!newsLoading && newsData && newsData.articles.length > 0 && (
      <div className="space-y-3">
        {newsData.articles.map((a, i) => (
          <div
            key={i}
            className="p-4 rounded-lg bg-[#0b1220] border border-slate-700"
          >
            <h4 className="font-medium">{a.title}</h4>
            <p className="text-xs text-gray-400 mt-1">
              {a.source} •{" "}
              {new Date(a.published_at).toLocaleDateString()}
            </p>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-400 text-sm mt-2"
            >
              Read article <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    )}
  </div>
)}


          </div>
        )}
      </div>
    </div>
  );
}
