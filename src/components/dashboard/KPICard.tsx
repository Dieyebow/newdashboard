import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  sparklineData?: number[];
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    chart: '#3b82f6',
  },
  green: {
    bg: 'bg-gradient-to-br from-green-500 to-green-600',
    light: 'bg-green-50',
    text: 'text-green-600',
    chart: '#10b981',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    light: 'bg-purple-50',
    text: 'text-purple-600',
    chart: '#8b5cf6',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    light: 'bg-orange-50',
    text: 'text-orange-600',
    chart: '#f59e0b',
  },
  red: {
    bg: 'bg-gradient-to-br from-red-500 to-red-600',
    light: 'bg-red-50',
    text: 'text-red-600',
    chart: '#ef4444',
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    light: 'bg-indigo-50',
    text: 'text-indigo-600',
    chart: '#6366f1',
  },
};

export default function KPICard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  sparklineData = [20, 35, 30, 45, 40, 55, 50, 65, 60, 70]
}: KPICardProps) {
  const colors = colorClasses[color];
  const maxValue = Math.max(...sparklineData);
  const TrendIcon = trend?.isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          </div>
          <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {trend && (
          <div className="flex items-center gap-2 mb-3">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
              trend.isPositive ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <TrendIcon className={`w-4 h-4 ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`} />
              <span className={`text-xs font-semibold ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.value}%
              </span>
            </div>
            <span className="text-xs text-gray-500">vs dernier mois</span>
          </div>
        )}

        {/* Mini Sparkline Chart */}
        <div className="h-12 flex items-end gap-1">
          {sparklineData.map((val, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-t transition-all duration-300 ${colors.light}`}
              style={{
                height: `${(val / maxValue) * 100}%`,
                background: `linear-gradient(to top, ${colors.chart}40, ${colors.chart}20)`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
