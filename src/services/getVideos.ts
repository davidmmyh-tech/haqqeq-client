import type { Video } from '@/schemas/types';
import api from './api';

type VideosResponse = {
  data: Video[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

export async function getVideos({ page, limit = 5 }: { page: number; limit?: number }) {
  return await api.get<VideosResponse>(`/api/doc_videos`, { params: { page, limit } }).then((res) => res.data);
}

export async function getVideoDetails(id: string | number) {
  return api.get<Video>(`/api/doc_videos/${id}`).then((res) => res.data);
}
