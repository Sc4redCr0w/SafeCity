import { ReactNode } from "react";

 function KPICard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div className="card flex items-center gap-4">
      <div className="text-blue-400">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-3xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default KPICard
