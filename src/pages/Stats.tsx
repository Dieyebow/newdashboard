import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Activity } from 'lucide-react';
import apiService from '../services/api';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export default function Stats() {
  const { data: performanceData } = useQuery({
    queryKey: ['performance'],
    queryFn: () => apiService.getPerformance(),
  });

  const { data: growthData } = useQuery({
    queryKey: ['growth'],
    queryFn: () => apiService.getGrowth(),
  });

  const { data: testsStats } = useQuery({
    queryKey: ['testsStats'],
    queryFn: () => apiService.getTestsStats(),
  });

  const { data: autoecolesStats } = useQuery({
    queryKey: ['autoecolesStats'],
    queryFn: () => apiService.getAutoecolesStats(),
  });

  const performance = (performanceData as any)?.performance;
  const growth = (growthData as any)?.growthData || [];
  const tests = (testsStats as any)?.stats;
  const autoecoles = (autoecolesStats as any)?.stats || [];

  // Prepare data for pie chart
  const autoecolesChartData = autoecoles
    .sort((a: any, b: any) => (b.studentsCount || 0) - (a.studentsCount || 0))
    .slice(0, 6)
    .map((ae: any) => ({
      name: ae.nomAutoecole,
      value: ae.studentsCount || 0,
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
        <p className="text-gray-600 mt-1">Analyses et métriques détaillées</p>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Taux de réussite moyen</p>
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{performance?.avgSuccessRate?.toFixed(1) || 0}%</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total tests</p>
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{tests?.totalTests || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Score moyen</p>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{tests?.avgScore?.toFixed(1) || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des inscriptions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Autoecoles Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition des élèves par auto-école
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={autoecolesChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {autoecolesChartData.map((_entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tests Statistics */}
      {tests && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques des tests</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Total tests</p>
              <p className="text-3xl font-bold text-primary-600">{tests.totalTests}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Score moyen</p>
              <p className="text-3xl font-bold text-green-600">{tests.avgScore?.toFixed(1)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Score max</p>
              <p className="text-3xl font-bold text-purple-600">{tests.maxScore}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Total réponses</p>
              <p className="text-3xl font-bold text-orange-600">{tests.totalAnswers}</p>
            </div>
          </div>
        </div>
      )}

      {/* Autoecoles Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance des auto-écoles
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={autoecoles.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nomAutoecole" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="studentsCount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
