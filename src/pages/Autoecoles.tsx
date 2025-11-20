import { useQuery } from '@tanstack/react-query';
import { School } from 'lucide-react';
import apiService from '../services/api';

export default function Autoecoles() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['autoecolesStats'],
    queryFn: () => apiService.getAutoecolesStats(),
  });

  const { data: countData } = useQuery({
    queryKey: ['autoecolesCount'],
    queryFn: () => apiService.getAutoecolesCount(),
  });

  const stats = (statsData as any)?.stats || [];
  const totalCount = (countData as any)?.count || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Auto-écoles</h1>
        <p className="text-gray-600 mt-1">Gérez les auto-écoles partenaires</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total auto-écoles</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total élèves</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.reduce((acc: number, ae: any) => acc + (ae.studentsCount || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Moyenne élèves/auto-école</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.length > 0
              ? Math.round(
                  stats.reduce((acc: number, ae: any) => acc + (ae.studentsCount || 0), 0) / stats.length
                )
              : 0}
          </p>
        </div>
      </div>

      {/* Autoecoles Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Nom</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Téléphone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Administrateur</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Email admin</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Nombre d'élèves</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date création</th>
              </tr>
            </thead>
            <tbody>
              {stats.length > 0 ? (
                stats.map((autoecole: any) => (
                  <tr key={autoecole._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <School className="w-5 h-5 text-primary-600 mr-2" />
                        <p className="font-medium text-gray-900">{autoecole.nomAutoecole}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{autoecole.phoneNumber}</td>
                    <td className="py-3 px-4 text-gray-700">{autoecole.Admin_displayName}</td>
                    <td className="py-3 px-4 text-gray-700">{autoecole.Admin_email || '-'}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {autoecole.studentsCount || 0} élèves
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(autoecole.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <School className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune auto-école trouvée</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Autoecoles */}
      {stats.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top auto-écoles par nombre d'élèves</h3>
          <div className="space-y-3">
            {stats
              .sort((a: any, b: any) => (b.studentsCount || 0) - (a.studentsCount || 0))
              .slice(0, 5)
              .map((autoecole: any, index: number) => (
                <div key={autoecole._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{autoecole.nomAutoecole}</p>
                      <p className="text-sm text-gray-500">{autoecole.Admin_displayName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">{autoecole.studentsCount || 0}</p>
                    <p className="text-xs text-gray-500">élèves</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
