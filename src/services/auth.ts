import type { Role, User } from '@/schemas/types';
import api from './api';
import type { LoginForm, RegisterForm } from '@/schemas/validation';

type LoginResponse = {
  token: string;
  role: Role;
  name: string;
  email: string;
  avatar: string;
};

type RegisterResponse = {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
};

export async function getCurrenytUser() {
  return api.get<User>('/api/user').then((res) => res.data);
}

export async function loginUser(payload: LoginForm) {
  return api.post<LoginResponse>('/api/login', { ...payload }).then((res) => res.data);
}

export async function logoutUser() {
  return api.post<{ message: string }>('/api/logout').then((res) => res.data);
}

export function registerUser(payload: RegisterForm) {
  return api.post<RegisterResponse>('/api/register', { ...payload });
}
