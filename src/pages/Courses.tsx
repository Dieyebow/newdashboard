import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Plus } from 'lucide-react';
import apiService from '../services/api';
import CourseCard from '../components/courses/CourseCard';
import CourseModal from '../components/courses/CourseModal';
import type { Course } from '../types';

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coursesData, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => apiService.getCoursesList(),
  });

  const { data: statsData } = useQuery({
    queryKey: ['coursesStats'],
    queryFn: () => apiService.getCoursesStats(),
  });

  const handleView = async (id: string) => {
    const response: any = await apiService.getCourseDetails(id);
    setSelectedCourse(response.course);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEdit = async (id: string) => {
    const response: any = await apiService.getCourseDetails(id);
    setSelectedCourse(response.course);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const courses = (coursesData as any)?.courses || [];
  const stats = (statsData as any)?.stats;

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
          <h1 className="text-3xl font-bold text-gray-900">Cours</h1>
          <p className="text-gray-600 mt-1">Gérez vos cours de code de la route</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau cours
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total cours</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Total sections</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalSections}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Moyenne sections/cours</p>
            <p className="text-2xl font-bold text-gray-900">{stats.avgSectionsPerCourse.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Max sections</p>
            <p className="text-2xl font-bold text-gray-900">{stats.maxSections}</p>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: Course) => (
            <CourseCard
              key={course._id}
              course={course}
              onView={handleView}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun cours disponible</h3>
          <p className="text-gray-600">Commencez par créer votre premier cours</p>
        </div>
      )}

      {/* Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
}
