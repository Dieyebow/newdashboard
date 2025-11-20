import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileQuestion, Plus, TrendingUp } from 'lucide-react';
import apiService from '../services/api';
import QuizzCard from '../components/quizz/QuizzCard';
import QuizzModal from '../components/quizz/QuizzModal';
import type { Quizz as QuizzType } from '../types';

export default function Quizz() {
  const [selectedQuizz, setSelectedQuizz] = useState<QuizzType | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: quizzData, isLoading } = useQuery({
    queryKey: ['quizz'],
    queryFn: () => apiService.getQuizzList(),
  });

  const { data: statsData } = useQuery({
    queryKey: ['quizzStats'],
    queryFn: () => apiService.getQuizzStats(),
  });

  const { data: popularData } = useQuery({
    queryKey: ['popularQuizz'],
    queryFn: () => apiService.getPopularQuizz(5),
  });

  const handleView = async (id: string) => {
    const response: any = await apiService.getQuizzDetails(id);
    setSelectedQuizz(response.quizz);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = async (id: string) => {
    const response: any = await apiService.getQuizzDetails(id);
    setSelectedQuizz(response.quizz);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const quizzList = (quizzData as any)?.quizz || [];
  const stats = (statsData as any)?.stats;
  const popularQuizz = (popularData as any)?.popularQuizz || [];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quiz</h1>
          <p className="text-gray-600 mt-1">Gérez vos quiz de code de la route</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau quiz
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total quiz</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalQuizz}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total questions</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Moyenne questions/quiz</p>
            <p className="text-2xl font-bold text-gray-900">{stats.avgQuestionsPerQuizz.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Max questions</p>
            <p className="text-2xl font-bold text-gray-900">{stats.maxQuestions}</p>
          </div>
        </div>
      )}

      {/* Popular Quizz */}
      {popularQuizz.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Quiz les plus populaires</h3>
          </div>
          <div className="space-y-3">
            {popularQuizz.map((quiz: any, index: number) => (
              <div key={quiz._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{quiz.title}</p>
                    <p className="text-sm text-gray-500">{quiz.testCount} tests effectués</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-purple-600">Score moyen: {quiz.avgScore.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quizz Grid */}
      {quizzList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzList.map((quizz: QuizzType) => (
            <QuizzCard
              key={quizz._id}
              quizz={quizz}
              onView={handleView}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
          <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun quiz disponible</h3>
          <p className="text-gray-600">Commencez par créer votre premier quiz</p>
        </div>
      )}

      {/* Modal */}
      <QuizzModal
        quizz={selectedQuizz}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
}
