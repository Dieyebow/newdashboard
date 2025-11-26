import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://autoecole.mojay.pro';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include JWT token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('🔑 Token envoyé:', token.substring(0, 20) + '...');
          console.log('📡 Requête vers:', config.url);
        } else {
          console.warn('⚠️ Aucun token trouvé dans localStorage');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          console.error('❌ 401 Unauthorized - Token invalide ou expiré');
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        } else if (error.response?.status === 403) {
          console.error('❌ 403 Forbidden - Accès refusé');
          console.error('URL:', error.config?.url);
          console.error('Réponse:', error.response?.data);
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.api.request<T>(config);
    return response.data;
  }

  // Health Check
  async healthCheck() {
    return this.request({ method: 'GET', url: '/dashboard/health' });
  }

  // Users
  async getUsersCount() {
    return this.request({ method: 'GET', url: '/dashboard/users/count' });
  }

  async getUsersList(page = 1, limit = 10) {
    return this.request({ method: 'GET', url: '/dashboard/users/list', params: { page, limit } });
  }

  // Autoecoles
  async getAutoecolesCount() {
    return this.request({ method: 'GET', url: '/dashboard/autoecoles/count' });
  }

  async getAutoecolesList(page = 1, limit = 10) {
    return this.request({ method: 'GET', url: '/dashboard/autoecoles/list', params: { page, limit } });
  }

  async getAutoecoleStudents(id: string) {
    return this.request({ method: 'GET', url: `/dashboard/autoecoles/${id}/students` });
  }

  async getAutoecolesStats() {
    return this.request({ method: 'GET', url: '/dashboard/autoecoles/stats' });
  }

  // Students
  async getStudentsCount() {
    return this.request({ method: 'GET', url: '/dashboard/students/count' });
  }

  async getStudentsList(page = 1, limit = 10, search = '') {
    return this.request({
      method: 'GET',
      url: '/dashboard/students/list',
      params: { page, limit, search }
    });
  }

  async getStudentsByAutoecole(id: string, page = 1, limit = 10) {
    return this.request({
      method: 'GET',
      url: `/dashboard/students/by-autoecole/${id}`,
      params: { page, limit }
    });
  }

  async getStudentsByDate() {
    return this.request({ method: 'GET', url: '/dashboard/students/by-date' });
  }

  async getPremiumStudents(page = 1, limit = 10) {
    return this.request({ method: 'GET', url: '/dashboard/students/premium', params: { page, limit } });
  }

  async getActiveStudents(idbot?: string) {
    return this.request({ method: 'GET', url: '/dashboard/students/active', params: { idbot } });
  }

  // Quizz
  async getQuizzCount() {
    return this.request({ method: 'GET', url: '/dashboard/quizz/count' });
  }

  async getQuizzList() {
    return this.request({ method: 'GET', url: '/dashboard/quizz/list' });
  }

  async getQuizzDetails(id: string) {
    return this.request({ method: 'GET', url: `/dashboard/quizz/${id}/details` });
  }

  async getQuizzStats() {
    return this.request({ method: 'GET', url: '/dashboard/quizz/stats' });
  }

  async getPopularQuizz(limit = 10) {
    return this.request({ method: 'GET', url: '/dashboard/quizz/popular', params: { limit } });
  }

  // Tests
  async getTestsCount() {
    return this.request({ method: 'GET', url: '/dashboard/tests/count' });
  }

  async getTestsByStudent(tel: string) {
    return this.request({ method: 'GET', url: `/dashboard/tests/by-student/${tel}` });
  }

  async getTestsByQuiz(id: string) {
    return this.request({ method: 'GET', url: `/dashboard/tests/by-quiz/${id}` });
  }

  async getTestsStats() {
    return this.request({ method: 'GET', url: '/dashboard/tests/stats' });
  }

  async getLeaderboard(limit = 10) {
    return this.request({ method: 'GET', url: '/dashboard/tests/leaderboard', params: { limit } });
  }

  // Courses
  async getCoursesCount() {
    return this.request({ method: 'GET', url: '/dashboard/courses/count' });
  }

  async getCoursesList() {
    return this.request({ method: 'GET', url: '/dashboard/courses/list' });
  }

  async getCourseDetails(id: string) {
    return this.request({ method: 'GET', url: `/dashboard/courses/${id}/details` });
  }

  async getCoursesStats() {
    return this.request({ method: 'GET', url: '/dashboard/courses/stats' });
  }

  // KPIs
  async getGlobalKPIs() {
    return this.request({ method: 'GET', url: '/dashboard/kpis/global' });
  }

  async getEngagement(page = 1, limit = 10, idbot?: string) {
    return this.request({
      method: 'GET',
      url: '/dashboard/kpis/engagement',
      params: { page, limit, idbot }
    });
  }

  async getPerformance() {
    return this.request({ method: 'GET', url: '/dashboard/kpis/performance' });
  }

  async getGrowth() {
    return this.request({ method: 'GET', url: '/dashboard/kpis/growth' });
  }
}

export const apiService = new ApiService();
export default apiService;
