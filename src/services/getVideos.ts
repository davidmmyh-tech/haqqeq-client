import type { Video } from '@/schemas/types';
import api from './api';

interface VideosResponse {
  status: string;
  data: {
    current_page: number;
    data: Video[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string;
      label: string;
      page: number;
      active: boolean;
    }[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
  };
  message: string;
}

type VideoDetailsResponse = Video;

type VideosCategoryResponse = {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    created_at: string;
    doc_videos: Video[];
  };
};

type VideosCategoriesResponse = {
  status: string;
  message: string;
  data: {
    id: 1;
    name: string;
    description: string;
    image: string;
    created_at: string;
  }[];
};

export async function getVideos({ page, limit = 5 }: { page?: number; limit?: number }) {
  return await api.get<VideosResponse>(`/api/docvideos`, { params: { page, limit } }).then((res) => res.data);
}

export async function getVideoDetails(id: string | number) {
  return api.get<VideoDetailsResponse>(`/api/docvideos/${id}`).then((res) => res.data);
}

export async function getVideosCategories(params?: { limit: number; page: number }) {
  return api.get<VideosCategoriesResponse>(`/api/categories/docvideo`, { params }).then((res) => res.data);
}

export async function getVideosCategoryDetails(id: string | number, params?: { limit: number; page: number }) {
  return api.get<VideosCategoryResponse>(`/api/categories/docvideos/${id}`, { params }).then((res) => res.data);
}
