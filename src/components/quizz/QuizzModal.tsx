import { X, Upload, Trash2, Plus, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Quizz, QuizzQuestion, QuizzButton } from '../../types';

interface QuizzModalProps {
  quizz: Quizz | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
  onSave?: (quizz: Quizz) => void;
}

export default function QuizzModal({ quizz, isOpen, onClose, mode, onSave }: QuizzModalProps) {
  const [editedQuizz, setEditedQuizz] = useState<Quizz | null>(quizz);
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: boolean }>({});

  // Update editedQuizz when quizz prop changes
  useEffect(() => {
    if (quizz) {
      setEditedQuizz(quizz);
    }
  }, [quizz]);

  if (!isOpen || !quizz || !editedQuizz) return null;

  const API_BASE_URL = 'https://autoecole.mojay.pro/dashboard';
  const token = localStorage.getItem('auth_token');

  // Upload image for a question
  const handleImageUpload = async (questionIndex: number, file: File) => {
    const uploadKey = `image-${questionIndex}`;
    setUploadingFiles(prev => ({ ...prev, [uploadKey]: true }));

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        `${API_BASE_URL}/quizz/${editedQuizz._id}/questions/${questionIndex}/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success && result.imageUrl) {
        // Update the question with the new image URL
        const updatedQuestions = [...(editedQuizz.list_quizz || [])];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          image: result.imageUrl,
        };
        setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
        alert('Image uploadée avec succès!');
      } else {
        alert('Erreur lors de l\'upload de l\'image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingFiles(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  // Upload audio for a question
  const handleQuestionAudioUpload = async (questionIndex: number, file: File) => {
    const uploadKey = `audio-${questionIndex}`;
    setUploadingFiles(prev => ({ ...prev, [uploadKey]: true }));

    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await fetch(
        `${API_BASE_URL}/quizz/${editedQuizz._id}/questions/${questionIndex}/upload-audio`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success && result.audioUrl) {
        const updatedQuestions = [...(editedQuizz.list_quizz || [])];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          audio: result.audioUrl,
        };
        setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
        alert('Audio uploadé avec succès!');
      } else {
        alert('Erreur lors de l\'upload de l\'audio');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload de l\'audio');
    } finally {
      setUploadingFiles(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  // Upload answer audio for a question
  const handleAnswerAudioUpload = async (questionIndex: number, file: File) => {
    const uploadKey = `answer-audio-${questionIndex}`;
    setUploadingFiles(prev => ({ ...prev, [uploadKey]: true }));

    try {
      const formData = new FormData();
      formData.append('audioanswer', file);

      const response = await fetch(
        `${API_BASE_URL}/quizz/${editedQuizz._id}/questions/${questionIndex}/upload-answer-audio`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success && result.audioUrl) {
        const updatedQuestions = [...(editedQuizz.list_quizz || [])];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          answer: {
            ...updatedQuestions[questionIndex].answer,
            audio: result.audioUrl,
          },
        };
        setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
        alert('Audio de réponse uploadé avec succès!');
      } else {
        alert('Erreur lors de l\'upload de l\'audio de réponse');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload de l\'audio de réponse');
    } finally {
      setUploadingFiles(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  // Add a new question
  const handleAddQuestion = () => {
    const newQuestion: QuizzQuestion = {
      text: '',
      image: '',
      audio: '',
      buttons: [
        { value: 'false', title: 'A' },
        { value: 'true', title: 'B' },
      ],
      answer: {
        text: '',
        audio: '',
      },
    };

    const updatedQuestions = [...(editedQuizz.list_quizz || []), newQuestion];
    setEditedQuizz({
      ...editedQuizz,
      list_quizz: updatedQuestions,
      number_quizz: updatedQuestions.length,
    });
  };

  // Delete a question
  const handleDeleteQuestion = (index: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question?')) {
      const updatedQuestions = (editedQuizz.list_quizz || []).filter((_, i) => i !== index);
      setEditedQuizz({
        ...editedQuizz,
        list_quizz: updatedQuestions,
        number_quizz: updatedQuestions.length,
      });
    }
  };

  // Update question text
  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...(editedQuizz.list_quizz || [])];
    updatedQuestions[index] = { ...updatedQuestions[index], text };
    setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
  };

  // Update answer text
  const updateAnswerText = (index: number, text: string) => {
    const updatedQuestions = [...(editedQuizz.list_quizz || [])];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      answer: { ...updatedQuestions[index].answer, text },
    };
    setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
  };

  // Update button
  const updateButton = (questionIndex: number, buttonIndex: number, field: 'title' | 'value', value: string) => {
    const updatedQuestions = [...(editedQuizz.list_quizz || [])];
    const updatedButtons = [...updatedQuestions[questionIndex].buttons];
    updatedButtons[buttonIndex] = { ...updatedButtons[buttonIndex], [field]: value };
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], buttons: updatedButtons };
    setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
  };

  // Add button to question
  const addButton = (questionIndex: number) => {
    const updatedQuestions = [...(editedQuizz.list_quizz || [])];
    const updatedButtons = [...updatedQuestions[questionIndex].buttons, { value: 'false', title: '' }];
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], buttons: updatedButtons };
    setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
  };

  // Delete button from question
  const deleteButton = (questionIndex: number, buttonIndex: number) => {
    const updatedQuestions = [...(editedQuizz.list_quizz || [])];
    const updatedButtons = updatedQuestions[questionIndex].buttons.filter((_, i) => i !== buttonIndex);
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], buttons: updatedButtons };
    setEditedQuizz({ ...editedQuizz, list_quizz: updatedQuestions });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedQuizz);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
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
                    <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 whitespace-pre-wrap">{question.text}</p>
                        </div>
                      </div>

                      {/* Question Audio */}
                      {question.audio && (
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Volume2 className="w-5 h-5 text-blue-600" />
                            <p className="text-sm font-semibold text-blue-900">Audio de la question :</p>
                          </div>
                          <audio controls className="w-full">
                            <source src={question.audio} type="audio/mpeg" />
                            Votre navigateur ne supporte pas l'élément audio.
                          </audio>
                        </div>
                      )}

                      {/* Question Image */}
                      {question.image && (
                        <div className="mb-3">
                          <img
                            src={question.image}
                            alt={`Question ${index + 1}`}
                            className="rounded-lg max-h-64 w-auto"
                          />
                        </div>
                      )}

                      {/* Answer Buttons */}
                      {question.buttons && question.buttons.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-700">Réponses :</p>
                          {question.buttons.map((button, btnIndex) => {
                            const isCorrect = button.value === 'true';
                            return (
                              <div
                                key={btnIndex}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrect
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 bg-white'
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="text-sm">{button.title || 'Sans titre'}</span>
                                  {isCorrect && (
                                    <span className="ml-auto text-xs font-semibold text-green-600">
                                      ✓ Bonne réponse
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Answer Explanation */}
                      {question.answer && (
                        <div className="bg-green-50 rounded-lg p-4 space-y-3">
                          <p className="text-sm font-semibold text-green-900">Explication de la réponse :</p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{question.answer.text}</p>

                          {/* Answer Audio */}
                          {question.answer.audio && (
                            <div className="mt-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Volume2 className="w-5 h-5 text-green-600" />
                                <p className="text-sm font-semibold text-green-900">Audio de la réponse :</p>
                              </div>
                              <audio controls className="w-full">
                                <source src={question.answer.audio} type="audio/mpeg" />
                                Votre navigateur ne supporte pas l'élément audio.
                              </audio>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Debug JSON View */}
                      <details className="mt-4">
                        <summary className="text-xs font-semibold text-gray-700 cursor-pointer hover:text-gray-900">
                          Afficher le JSON brut
                        </summary>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto mt-2">
                          {JSON.stringify(question, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quiz Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du quiz
                </label>
                <input
                  type="text"
                  value={editedQuizz.title}
                  onChange={(e) => setEditedQuizz({ ...editedQuizz, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Questions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Questions ({editedQuizz.list_quizz?.length || 0})
                  </h4>
                  <button
                    onClick={handleAddQuestion}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter une question
                  </button>
                </div>

                {editedQuizz.list_quizz && editedQuizz.list_quizz.map((question, qIndex) => (
                  <div key={qIndex} className="bg-gray-50 rounded-lg p-4 mb-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {qIndex + 1}
                      </span>
                      <button
                        onClick={() => handleDeleteQuestion(qIndex)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer cette question"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Question Text */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Texte de la question
                      </label>
                      <textarea
                        value={question.text}
                        onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image
                      </label>
                      {question.image && (
                        <img src={question.image} alt="Preview" className="mb-2 rounded-lg max-h-32" />
                      )}
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4" />
                          {uploadingFiles[`image-${qIndex}`] ? 'Upload en cours...' : 'Upload Image'}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(qIndex, file);
                            }}
                            disabled={uploadingFiles[`image-${qIndex}`]}
                          />
                        </label>
                        {question.image && (
                          <a href={question.image} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Voir l'image
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Question Audio Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Audio de la question
                      </label>
                      {question.audio && (
                        <audio controls className="w-full mb-2">
                          <source src={question.audio} type="audio/mpeg" />
                        </audio>
                      )}
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4" />
                          {uploadingFiles[`audio-${qIndex}`] ? 'Upload en cours...' : 'Upload Audio'}
                          <input
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleQuestionAudioUpload(qIndex, file);
                            }}
                            disabled={uploadingFiles[`audio-${qIndex}`]}
                          />
                        </label>
                        {question.audio && (
                          <a href={question.audio} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Télécharger
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Buttons/Answers */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Réponses
                        </label>
                        <button
                          onClick={() => addButton(qIndex)}
                          className="text-sm text-purple-600 hover:text-purple-700"
                        >
                          + Ajouter une réponse
                        </button>
                      </div>
                      {question.buttons.map((button, bIndex) => (
                        <div key={bIndex} className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={button.title}
                            onChange={(e) => updateButton(qIndex, bIndex, 'title', e.target.value)}
                            placeholder="Texte de la réponse"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <select
                            value={button.value}
                            onChange={(e) => updateButton(qIndex, bIndex, 'value', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="false">Faux</option>
                            <option value="true">Vrai</option>
                          </select>
                          <button
                            onClick={() => deleteButton(qIndex, bIndex)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Answer Explanation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Explication de la réponse
                      </label>
                      <textarea
                        value={question.answer?.text || ''}
                        onChange={(e) => updateAnswerText(qIndex, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                      />
                    </div>

                    {/* Answer Audio Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Audio de la réponse
                      </label>
                      {question.answer?.audio && (
                        <audio controls className="w-full mb-2">
                          <source src={question.answer.audio} type="audio/mpeg" />
                        </audio>
                      )}
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                          <Upload className="w-4 h-4" />
                          {uploadingFiles[`answer-audio-${qIndex}`] ? 'Upload en cours...' : 'Upload Audio Réponse'}
                          <input
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleAnswerAudioUpload(qIndex, file);
                            }}
                            disabled={uploadingFiles[`answer-audio-${qIndex}`]}
                          />
                        </label>
                        {question.answer?.audio && (
                          <a href={question.answer.audio} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Télécharger
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
