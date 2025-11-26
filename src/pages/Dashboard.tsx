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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble de votre plateforme PeeloCar</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer">
            <option>Mensuel</option>
            <option>Hebdomadaire</option>
            <option>Annuel</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Auto-écoles"
          value={kpisData?.kpis?.totalAutoecoles || 0}
          icon={School}
          color="blue"
          trend={{ value: 5, isPositive: true }}
          sparklineData={[8, 10, 9, 12, 11, 14, 13, 16, 15, 18]}
        />
        <KPICard
          title="Élèves"
          value={kpisData?.kpis?.totalStudents || 0}
          icon={Users}
          color="green"
          trend={{ value: 12, isPositive: true }}
          sparklineData={[320, 380, 350, 420, 400, 480, 450, 520, 490, 550]}
        />
        <KPICard
          title="Quiz"
          value={kpisData?.kpis?.totalQuizz || 0}
          icon={FileQuestion}
          color="purple"
          trend={{ value: 3, isPositive: true }}
          sparklineData={[20, 22, 21, 24, 23, 26, 25, 28, 27, 29]}
        />
        <KPICard
          title="Cours"
          value={kpisData?.kpis?.totalCourses || 0}
          icon={BookOpen}
          color="orange"
          trend={{ value: 8, isPositive: true }}
          sparklineData={[15, 17, 16, 19, 18, 21, 20, 23, 22, 24]}
        />
        <KPICard
          title="Tests réalisés"
          value={kpisData?.kpis?.totalTests || 0}
          icon={Award}
          color="indigo"
          trend={{ value: 15, isPositive: true }}
          sparklineData={[2800, 3100, 2900, 3400, 3200, 3700, 3500, 3900, 3700, 4100]}
        />
        <KPICard
          title="En formation"
          value={kpisData?.kpis?.studentsWithoutPermis || 0}
          icon={TrendingUp}
          color="red"
          trend={{ value: 7, isPositive: false }}
          sparklineData={[350, 340, 330, 320, 310, 300, 290, 280, 270, 260]}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Croissance des inscriptions</h3>
            <span className="text-2xl font-bold text-gray-400">$60,800</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={(growthData as any)?.growthData || []}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorGrowth)"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tests Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques des tests</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <p className="text-sm text-blue-600 mb-1 font-medium">Score moyen</p>
              <p className="text-3xl font-bold text-blue-700">
                {((testsStats as any)?.stats?.avgScore || 0).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <p className="text-sm text-green-600 mb-1 font-medium">Score maximum</p>
              <p className="text-3xl font-bold text-green-700">
                {(testsStats as any)?.stats?.maxScore || 0}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <p className="text-sm text-purple-600 mb-1 font-medium">Total tests</p>
              <p className="text-3xl font-bold text-purple-700">
                {(testsStats as any)?.stats?.totalTests || 0}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <p className="text-sm text-orange-600 mb-1 font-medium">Total réponses</p>
              <p className="text-3xl font-bold text-orange-700">
                {(testsStats as any)?.stats?.totalAnswers || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Élèves</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Voir tout
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rang</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Élève</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Auto-école</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Meilleur score</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tests</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Moyenne</th>
              </tr>
            </thead>
            <tbody>
              {((leaderboard as any)?.leaderboard || []).map((student: any, index: number) => (
                <tr key={student.tel} className="border-b border-gray-50 hover:bg-blue-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {student.student_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.student_name}</p>
                        <p className="text-xs text-gray-500">{student.tel}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium">{student.autoecole}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-md">
                      {student.bestScore}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700 font-semibold">{student.totalTests}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-gray-900">{student.avgScore.toFixed(1)}</span>
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
