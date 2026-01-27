import { HeatmapPoint } from "@/types/dashboard";

 function AlertsPanel({
  points,
}: {
  points: HeatmapPoint[];
}) {
  const alerts = points
    .filter((p) => p.risk === "High")
    .slice(0, 5);

  return (
    <div className="card">
      <h3 className="mb-3 font-medium">Recent Alerts</h3>
      <ul className="space-y-2 text-sm">
        {alerts.map((a, i) => (
          <li key={i} className="flex justify-between">
            <span>{a.name}</span>
            <span className="text-red-400 font-medium">
              High Risk
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertsPanel
