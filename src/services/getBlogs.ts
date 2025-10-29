import api from './api';
import type { Blog, BlogCategory } from '@/schemas/types';

type BlogsResponse = {
  data: Blog[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

type BlogsCategoriesResponse = {
  data: BlogCategory[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

type CategoryDetailsResponse = {
  category: {
    id: string | number;
    name: string;
    slug: string;
    image: string;
    description: string;
  };
  blogs: Blog[];
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

export async function getBlogsCategories({ limit, page }: { limit?: number; page?: number }) {
  return api
    .get<BlogsCategoriesResponse>(`/api/categories/blogs`, { params: { limit, page } })
    .then((res) => res.data.data);
}

export async function getBlogsCategoryDetails(id: string | number, { limit, page }: { limit?: number; page?: number }) {
  return api
    .get<CategoryDetailsResponse>(`/api/categories/blogs/${id}`, { params: { limit, page } })
    .then((res) => res.data);
}
