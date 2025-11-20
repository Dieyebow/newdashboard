import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Search } from 'lucide-react';
import apiService from '../services/api';

export default function Students() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 10;

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ['students', page, search],
    queryFn: () => apiService.getStudentsList(page, limit, search),
  });

  const { data: countData } = useQuery({
    queryKey: ['studentsCount'],
    queryFn: () => apiService.getStudentsCount(),
  });

  const students = (studentsData as any)?.students || [];
  const pagination = (studentsData as any)?.pagination;
  const totalCount = (countData as any)?.count || 0;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Élèves</h1>
        <p className="text-gray-600 mt-1">Gérez vos élèves inscrits</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total élèves</p>
          <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Résultats affichés</p>
          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Pages</p>
          <p className="text-2xl font-bold text-gray-900">{pagination?.totalPages || 0}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, téléphone ou auto-école..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Rechercher
          </button>
        </form>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Nom complet</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Téléphone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Auto-école</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Téléphone auto-école</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student: any) => (
                  <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{student.fullname}</p>
                      {student.home_ec && (
                        <p className="text-sm text-gray-500">{student.home_ec}</p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{student.tel}</td>
                    <td className="py-3 px-4 text-gray-700">{student.name_autoecole}</td>
                    <td className="py-3 px-4 text-gray-700">{student.tel_autoecole}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(student.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun élève trouvé</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Page {pagination.page} sur {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
