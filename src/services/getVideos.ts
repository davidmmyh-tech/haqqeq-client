import type { Category, Pagination, VideoDetails, VideoListItem } from '@/schemas/types';
import api from './api';

type VideosResponse = {
  success: boolean;
  data: VideoListItem[];
  pagination: Pagination;
};

type VideoDetailsResponse = {
  success: boolean;
  data: VideoDetails;
};

type VideosCategoriesResponse = {
  success: boolean;
  data: Category[];
  pagination: Pagination;
};

type VideosCategoryDetailsResponse = {
  success: boolean;
  category: Category;
  videos: VideoListItem[];
  pagination: Pagination;
};

export async function getVideos({ page, limit = 5 }: { page?: number; limit?: number }) {
  return await api.get<VideosResponse>(`/api/docvideos`, { params: { page, limit } }).then((res) => res.data);
}

export async function getVideoDetails(id: string | number) {
  return api.get<VideoDetailsResponse>(`/api/docvideos/${id}`).then((res) => res.data);
}

export async function getVideosCategories(params?: { limit: number; page: number }) {
  return api.get<VideosCategoriesResponse>(`/api/categories/docvideos`, { params }).then((res) => res.data);
}

export async function getVideosCategoryDetails(id: string | number, params?: { limit: number; page: number }) {
  return api.get<VideosCategoryDetailsResponse>(`/api/categories/docvideos/${id}`, { params }).then((res) => res.data);
}
