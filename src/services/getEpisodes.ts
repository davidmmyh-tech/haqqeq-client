import type { Episode } from '@/schemas/types';
import api from './api';

type EpisodesResponse = {
  data: Episode[];

  current_page: number;
  last_page: number;
  from: number;
  per_page: number;
  to: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  links: [
    {
      url: string;
      label: string;
      page: number;
      active: boolean;
    }
  ];
  next_page_url: string;
  path: string;
  prev_page_url: string;
};

export async function getEpisodes({ page, limit = 5 }: { page: number; limit?: number }) {
  return await api.get<EpisodesResponse>(`/api/episodes`, { params: { page, limit } }).then((res) => res.data.data);
}

export async function getEpisodeDetails(id: string | number) {
  return api.get<{ data: Episode }>(`/api/episodes/${id}`).then((res) => res.data.data);
}
