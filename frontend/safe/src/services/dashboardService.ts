// import { DashboardSummary } from "@/types/dashboard";

// const API_BASE = "http://127.0.0.1:8001";

// export async function fetchDashboardSummary(): Promise<DashboardSummary> {
//   const res = await fetch(`${API_BASE}/dashboard/summary`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch dashboard summary");
//   }
//   return res.json();
// }


// import { DashboardSummary } from "@/types/dashboard";

// const API_BASE = "http://127.0.0.1:8001";

// export async function fetchDashboardSummary(): Promise<DashboardSummary> {
//   const res = await fetch(`${API_BASE}/dashboard/summary`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch dashboard summary");
//   }

//   return res.json();
// }


import { DashboardSummary } from "@/types/dashboard";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8001";

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const res = await fetch(`${API_BASE}/dashboard/summary`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  return res.json();
}
