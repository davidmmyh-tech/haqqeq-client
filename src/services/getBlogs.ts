import api from './api';
import type { Blog } from '@/schemas/types';

type BlogsResponse = {
  data: Blog[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

export async function getBlogs({ page, limit = 5 }: { page: number; limit?: number }) {
  return await api.get<BlogsResponse>(`/api/blogs`, { params: { page, limit } }).then((res) => res.data);
}

export async function getBlogDetails(id: string | number) {
  return api.get<Blog>(`/api/blogs/${id}`).then((res) => res.data);
}

export async function getBlogsCategory(id: string | number, { limit, page }: { limit?: number; page?: number }) {
  return api.get<Blog>(`/api/blogs/category/${id}`, { params: { limit, page } }).then((res) => res.data);
}
