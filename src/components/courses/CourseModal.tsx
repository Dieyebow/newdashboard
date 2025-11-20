import { X } from 'lucide-react';
import type { Course } from '../../types';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
}

export default function CourseModal({ course, isOpen, onClose, mode }: CourseModalProps) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'view' ? 'Détails du cours' : 'Modifier le cours'}
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600">
                  {course.number_chapter} {course.number_chapter === 1 ? 'chapitre' : 'chapitres'}
                </p>
              </div>

              {course.Sections && course.Sections.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Sections :</h4>
                  {course.Sections.map((section, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{section.title}</h5>
                      <p className="text-gray-700 whitespace-pre-wrap">{section.content}</p>
                      {section.images && section.images.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {section.images.map((img, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={img}
                              alt={`Section ${index + 1} - Image ${imgIndex + 1}`}
                              className="rounded-lg w-full h-48 object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du cours
                </label>
                <input
                  type="text"
                  defaultValue={course.title}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de chapitres
                </label>
                <input
                  type="number"
                  defaultValue={course.number_chapter}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  💡 L'édition complète des sections sera disponible dans la prochaine version.
                  Pour le moment, utilisez l'API directement pour modifier le contenu des sections.
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
            <button className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
