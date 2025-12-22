import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>

        {trend && (
          <p className="text-xs text-green-600 mt-1">{trend}</p>
        )}
      </div>

      {icon && (
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
          {icon}
        </div>
      )}
    </div>
  );
}
