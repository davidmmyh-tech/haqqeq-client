import type { Release } from '@/schemas/types';
import api from './api';

export async function getReleases({ page, limit = 5 }: { page: number; limit?: number }) {
  return api.get<Release[]>('/api/releases', { params: { page, limit } }).then((res) => res.data);
}

export async function getReleaseDetails(id: string | number) {
  return api.get<Release>(`/api/releases/${id}`).then((res) => res.data);
}
