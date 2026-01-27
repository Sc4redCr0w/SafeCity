// export type KPIData = {
//   total_incidents: number;
//   high_risk_zones: number;
//   avg_confidence: number;
// };

// export type RiskDistribution = {
//   low: number;
//   medium: number;
//   high: number;
// };

// export type TrendPoint = {
//   date: string;
//   incidents: number;
// };

// export type HeatmapPoint = {
//   name: string;
//   lat: number;
//   lng: number;
//   risk: "Low" | "Medium" | "High";
//   incidents: number;
//   avg_confidence: number;
// };

// export type DashboardSummary = {
//   kpis: KPIData;
//   risk_distribution: RiskDistribution;
//   trend: TrendPoint[];
//   heatmap_points: HeatmapPoint[];
// };


export type KPIBlock = {
  total_incidents: number;
  high_risk_zones: number;
  avg_confidence: number;
};

export type TrendPoint = {
  date: string;
  incidents: number;
};

export type HeatmapPoint = {
  name: string;
  lat: number;
  lng: number;
  risk: "Low" | "Medium" | "High";
  incidents: number;
  avg_confidence: number;
};

export type DashboardSummary = {
  kpis: KPIBlock;
  risk_distribution: {
    low: number;
    medium: number;
    high: number;
  };
  trend: TrendPoint[];
  heatmap_points: HeatmapPoint[];
};


export type RiskDistribution = {
  low: number;
  medium: number;
  high: number;
};