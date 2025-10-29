import type { Episode, Podcast } from '@/schemas/types';
import api from './api';

type PodcastsResponse = {
  data: {
    id: number;
    slug: string;
    title: string;
    language: string;
    website_url: string;
    cover_image: string;
    rss_url: string;
    created_at: string;
    updated_at: string;
  }[];
};

type PodcastResponse = {
  podcast: Podcast;
  episodes: Episode[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

export default async function getPodcasts({ page, limit = 5 }: { page: number; limit?: number }) {
  return await api.get<PodcastsResponse>(`/api/podcasts`, { params: { page, limit } }).then((res) => res.data);
}

export async function getPodcastDetails(id: string | number, { limit, page }: { limit?: number; page?: number } = {}) {
  return api.get<PodcastResponse>(`/api/podcasts/${id}`, { params: { limit, page } }).then((res) => res.data);
}
