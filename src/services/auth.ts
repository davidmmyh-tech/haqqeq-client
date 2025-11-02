import type { User } from '@/schemas/types';
import api from './api';
import type { LoginForm, RegisterForm } from '@/schemas/validation';

type LoginResponse = {
  success: boolean;
  token: string;
  data: User;
};

type RegisterResponse = {
  success: boolean;
  token: string;
  data: User;
};

type CurrentUserResponse = {
  success: boolean;
  data: User;
};

export async function getCurrentUser() {
  return api.get<CurrentUserResponse>('/api/user').then((res) => res.data);
}

export async function loginUser(payload: LoginForm) {
  return api.post<LoginResponse>('/api/login', { ...payload }).then((res) => res.data);
}

export async function logoutUser() {
  return api.post<{ message: string }>('/api/logout').then((res) => res.data);
}

export function registerUser(payload: RegisterForm) {
  return api.post<RegisterResponse>('/api/register', { ...payload }).then((res) => res.data);
}
