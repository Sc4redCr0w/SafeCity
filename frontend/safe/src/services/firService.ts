const API_BASE = "http://127.0.0.1:8001";

export interface FIR {
  "Report Number": number;
  "Date Reported": string;
  "Date of Occurrence": string;
  "Time of Occurrence": string;
  City: string;
  "Crime Code": string;
  "Crime Description": string;
  "Victim Age": number;
  "Victim Gender": string;
  "Weapon Used": string;
  "Crime Domain": string;
  "Police Deployed": string;
  "Case Closed": string;
  "Date Case Closed": string;
}

export async function addFIR(fir: Partial<FIR>) {
  const params = new URLSearchParams();
  
  Object.entries(fir).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const response = await fetch(`${API_BASE}/api/fir/add?${params.toString()}`, {
    method: "POST",
  });

  return response.json();
}

export async function searchFIR(query: string, searchType: string = "report_number") {
  const response = await fetch(
    `${API_BASE}/api/fir/search?query=${encodeURIComponent(query)}&search_type=${searchType}`
  );

  return response.json();
}

export async function getFIR(reportNumber: number) {
  const response = await fetch(`${API_BASE}/api/fir/${reportNumber}`);

  return response.json();
}

export async function updateFIR(reportNumber: number, updates: Partial<FIR>) {
  const params = new URLSearchParams();
  
  // Mapping from display names to API parameter names
  const fieldMapping: Record<string, string> = {
    "Report Number": "report_number",
    "Date Reported": "date_reported",
    "Date of Occurrence": "date_of_occurrence",
    "Time of Occurrence": "time_of_occurrence",
    "City": "city",
    "Crime Code": "crime_code",
    "Crime Description": "crime_description",
    "Victim Age": "victim_age",
    "Victim Gender": "victim_gender",
    "Weapon Used": "weapon_used",
    "Crime Domain": "crime_domain",
    "Police Deployed": "police_deployed",
    "Case Closed": "case_closed",
    "Date Case Closed": "date_case_closed",
  };
  
  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const apiKey = fieldMapping[key] || key;
      params.append(apiKey, String(value));
    }
  });

  const response = await fetch(
    `${API_BASE}/api/fir/${reportNumber}?${params.toString()}`,
    {
      method: "PUT",
    }
  );

  return response.json();
}

export async function getAllFIRs() {
  const response = await fetch(`${API_BASE}/api/fir/search`);

  return response.json();
}
