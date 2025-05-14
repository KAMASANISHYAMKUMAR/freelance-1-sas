export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff' | 'student';
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'staff' | 'student';
} 