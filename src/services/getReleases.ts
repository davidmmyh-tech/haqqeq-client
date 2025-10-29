import type { Release } from '@/schemas/types';
import api from './api';

type ReleasesResponse = {
  data: Release[];
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: string | null;
      label: string;
      page: string | null;
      active: boolean;
    }
  ];
  next_page_url: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};

export async function getReleases({ page, limit = 5 }: { page: number; limit: number }) {
  return api.get<ReleasesResponse>('/api/releases', { params: { page, limit } }).then((res) => res.data.data);
}

export async function getReleaseDetails(id: string | number) {
  return api.get<Release>(`/api/releases/${id}`).then((res) => res.data);
}
