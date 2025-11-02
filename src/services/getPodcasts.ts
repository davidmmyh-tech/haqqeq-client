import type { Category, EpisodeListItem, Pagination } from '@/schemas/types';
import api from './api';

type PodcastsResponse = {
  success: boolean;
  data: Category[];
  pagination: Pagination;
};

type PodcastResponse = {
  podcast: Category;
  episodes: EpisodeListItem[];
  pagination: Pagination;
};

export default async function getPodcasts({ page, limit = 5 }: { page: number; limit?: number }) {
  return await api.get<PodcastsResponse>(`/api/podcasts`, { params: { page, limit } }).then((res) => res.data);
}

export async function getPodcastDetails(id: string | number, { limit, page }: { limit?: number; page?: number } = {}) {
  return api.get<PodcastResponse>(`/api/podcasts/${id}`, { params: { limit, page } }).then((res) => res.data);
}
