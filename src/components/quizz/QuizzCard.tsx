import { FileQuestion, Eye, Edit } from 'lucide-react';
import type { Quizz } from '../../types';

interface QuizzCardProps {
  quizz: Quizz;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function QuizzCard({ quizz, onView, onEdit }: QuizzCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <FileQuestion className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{quizz.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {quizz.number_quizz} {quizz.number_quizz === 1 ? 'question' : 'questions'}
          </p>
          {quizz.created_at && (
            <p className="text-xs text-gray-500">
              Créé le {new Date(quizz.created_at).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onView(quizz._id)}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          Voir
        </button>
        <button
          onClick={() => onEdit(quizz._id)}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </button>
      </div>
    </div>
  );
}
