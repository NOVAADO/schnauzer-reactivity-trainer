'use client';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  title: string;
  unit?: string;
}

export function BarChart({ data, maxValue, title, unit = '' }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="flex items-end gap-1.5 h-28">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">
              {d.value > 0 ? `${d.value}${unit}` : ''}
            </span>
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${Math.max((d.value / max) * 80, 2)}%`,
                backgroundColor: d.color ?? '#3b82f6',
                minHeight: d.value > 0 ? '4px' : '2px',
              }}
            />
            <span className="text-xs text-gray-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
}

export function StatCard({ label, value, icon, color = 'bg-blue-50 text-blue-700' }: StatCardProps) {
  return (
    <div className={`rounded-2xl p-4 ${color}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-70 mt-0.5">{label}</div>
    </div>
  );
}
