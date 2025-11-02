import type { EpisodeDetails, EpisodeListItem, Pagination } from '@/schemas/types';
import api from './api';

type EpisodesResponse = {
  status: string;
  data: EpisodeListItem[];
  pagination: Pagination;
};

type EpisodeDetailsResponse = {
  status: string;
  data: EpisodeDetails;
};

export async function getEpisodes({ page, limit = 5 }: { page: number; limit?: number }) {
  return await api.get<EpisodesResponse>(`/api/episodes`, { params: { page, limit } }).then((res) => res.data.data);
}

export async function getEpisodeDetails(id: string | number) {
  return api.get<EpisodeDetailsResponse>(`/api/episodes/${id}`).then((res) => res.data.data);
}
