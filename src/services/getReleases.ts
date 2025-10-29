import type { Release } from '@/schemas/types';
import api from './api';

type ReleasesResponse = {
  current_page: 1;
  data: Release[];
  from: 1;
  last_page: 1;
  links: [
    {
      url: null;
      label: '&laquo; Previous';
      page: null;
      active: false;
    }
  ];
  next_page_url: null;
  per_page: 11;
  prev_page_url: null;
  to: 5;
  total: 5;
};

export async function getReleases({ page, limit = 5 }: { page: number; limit?: number }) {
  return api.get<ReleasesResponse>('/api/releases', { params: { page, limit } }).then((res) => res.data.data);
}

export async function getReleaseDetails(id: string | number) {
  return api.get<Release>(`/api/releases/${id}`).then((res) => res.data);
}
