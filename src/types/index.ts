// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
  };
}

// User Types
export interface User {
  _id: string;
  displayName: string;
  email: string;
  tel: string;
  created_at: string;
}

// Autoecole Types
export interface Autoecole {
  _id: string;
  nomAutoecole: string;
  phoneNumber: string;
  Admin_displayName: string;
  Admin_email: string;
  created_at: string;
  studentsCount?: number;
}

// Student Types
export interface Student {
  _id: string;
  fullname: string;
  tel: string;
  name_autoecole: string;
  tel_autoecole: string;
  home_ec?: string | { id: string; title: string };
  created_at: string;
}

// Quiz Types
export interface QuizzButton {
  id: string;
  title: string;
}

export interface QuizzQuestion {
  text: string;
  image?: string;
  buttons: QuizzButton[];
  answer: {
    text: string;
  };
}

export interface Quizz {
  _id: string;
  title: string;
  number_quizz?: number;
  list_quizz?: QuizzQuestion[];
  created_at?: string;
}

// Test Types
export interface Test {
  _id: string;
  tel: string;
  id_quizz: string;
  score: number;
  answers: any[];
  created_at: string;
  student_name?: string;
  autoecole?: string;
}

// Course Types
export interface CourseSection {
  title: string;
  content: string;
  images?: string[];
}

export interface Course {
  _id: string;
  title: string;
  number_chapter?: number;
  Sections?: CourseSection[];
  created_at?: string;
}

// KPI Types
export interface GlobalKPIs {
  totalAutoecoles: number;
  totalStudents: number;
  totalQuizz: number;
  totalCourses: number;
  totalTests: number;
  studentsWithoutPermis: number;
}

export interface DailyStats {
  date: string;
  count: number;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}
