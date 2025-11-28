import { X } from 'lucide-react';
import type { Quizz } from '../../types';

interface QuizzModalProps {
  quizz: Quizz | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
}

export default function QuizzModal({ quizz, isOpen, onClose, mode }: QuizzModalProps) {
  if (!isOpen || !quizz) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'view' ? 'Détails du quiz' : 'Modifier le quiz'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {mode === 'view' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{quizz.title}</h3>
                <p className="text-gray-600">
                  {quizz.number_quizz} {quizz.number_quizz === 1 ? 'question' : 'questions'}
                </p>
              </div>

              {quizz.list_quizz && quizz.list_quizz.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Questions :</h4>
                  {quizz.list_quizz.map((question, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{question.text}</p>
                        </div>
                      </div>

                      {question.image && (
                        <div className="mb-3">
                          <img
                            src={question.image}
                            alt={`Question ${index + 1}`}
                            className="rounded-lg max-h-64 w-auto"
                          />
                        </div>
                      )}

                      {question.buttons && question.buttons.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-700">Réponses :</p>
                          {question.buttons.map((button, btnIndex) => (
                            <div
                              key={button.id || btnIndex}
                              className={`p-3 rounded-lg border-2 ${
                                button.id === question.answer?.text
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="font-semibold text-sm mr-2">{button.id?.toUpperCase() || ''}.</span>
                                <span className="text-sm">{button.title || 'Sans titre'}</span>
                                {button.id === question.answer?.text && (
                                  <span className="ml-auto text-xs font-semibold text-green-600">
                                    ✓ Bonne réponse
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Affichage du JSON brut */}
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2">JSON brut :</p>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                          {JSON.stringify(question, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du quiz
                </label>
                <input
                  type="text"
                  defaultValue={quizz.title}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de questions
                </label>
                <input
                  type="number"
                  defaultValue={quizz.number_quizz}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  💡 L'édition complète des questions sera disponible dans la prochaine version.
                  Pour le moment, utilisez l'API directement pour modifier les questions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
          {mode === 'edit' && (
            <button className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
