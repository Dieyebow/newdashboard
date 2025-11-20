import { useQuery } from '@tanstack/react-query';
import { School, Users, FileQuestion, BookOpen, Award, TrendingUp } from 'lucide-react';
import apiService from '../services/api';
import KPICard from '../components/dashboard/KPICard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { data: kpis, isLoading: kpisLoading } = useQuery({
    queryKey: ['globalKPIs'],
    queryFn: () => apiService.getGlobalKPIs(),
  });

  const { data: growthData } = useQuery({
    queryKey: ['growth'],
    queryFn: () => apiService.getGrowth(),
  });

  const { data: testsStats } = useQuery({
    queryKey: ['testsStats'],
    queryFn: () => apiService.getTestsStats(),
  });

  const { data: leaderboard } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => apiService.getLeaderboard(5),
  });

  if (kpisLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  const kpisData = kpis as any;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre plateforme PeeloCar</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Auto-écoles"
          value={kpisData?.kpis?.totalAutoecoles || 0}
          icon={School}
          color="blue"
        />
        <KPICard
          title="Élèves"
          value={kpisData?.kpis?.totalStudents || 0}
          icon={Users}
          color="green"
        />
        <KPICard
          title="Quiz"
          value={kpisData?.kpis?.totalQuizz || 0}
          icon={FileQuestion}
          color="purple"
        />
        <KPICard
          title="Cours"
          value={kpisData?.kpis?.totalCourses || 0}
          icon={BookOpen}
          color="orange"
        />
        <KPICard
          title="Tests réalisés"
          value={kpisData?.kpis?.totalTests || 0}
          icon={Award}
          color="indigo"
        />
        <KPICard
          title="En formation"
          value={kpisData?.kpis?.studentsWithoutPermis || 0}
          icon={TrendingUp}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Croissance des inscriptions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={(growthData as any)?.growthData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tests Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques des tests</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Score moyen</p>
              <p className="text-2xl font-bold text-blue-600">
                {((testsStats as any)?.stats?.avgScore || 0).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Score maximum</p>
              <p className="text-2xl font-bold text-green-600">
                {(testsStats as any)?.stats?.maxScore || 0}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total tests</p>
              <p className="text-2xl font-bold text-purple-600">
                {(testsStats as any)?.stats?.totalTests || 0}
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total réponses</p>
              <p className="text-2xl font-bold text-orange-600">
                {(testsStats as any)?.stats?.totalAnswers || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Classement des meilleurs élèves</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Rang</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Élève</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Auto-école</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Meilleur score</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Tests</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Moyenne</th>
              </tr>
            </thead>
            <tbody>
              {((leaderboard as any)?.leaderboard || []).map((student: any, index: number) => (
                <tr key={student.tel} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-bold text-primary-600">#{index + 1}</span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{student.student_name}</p>
                    <p className="text-sm text-gray-500">{student.tel}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{student.autoecole}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {student.bestScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{student.totalTests}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900">{student.avgScore.toFixed(1)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
