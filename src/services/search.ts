import type { Category, EpisodeDetails, ReleaseDetails } from '@/schemas/types';
import api from './api';
interface SearchResultData<T> {
  count: number;
  data: T[];
}

interface FullSearchResponse {
  success: true;
  query: string;
  total_tables_scanned: number;
  matched_tables: number;
  total_results: number;
  results: {
    blogs?: SearchResultData<{
      id: number;
      header_image: string;
      user_id: number;
      title: string;
      description: string;
      content: string;
      category_id: number;
      status: 'published';
      publish_date: string | null;
      views: number;
      image: string;
      announcement: string;
      footer: string;
      created_at: string;
      updated_at: string;
    }>;
    categories?: SearchResultData<{
      id: number;
      name: string;
      slug: string;
      description: string;
      created_at: string;
      updated_at: string;
    }>;
    releases?: SearchResultData<ReleaseDetails>;
    doc_videos?: SearchResultData<{
      id: number;
      title: string;
      description: string;
      views_count: number;
      category_id: string;
      image_path: string;
      video_path: string;
      created_at: string;
      updated_at: string;
    }>;
    episodes?: SearchResultData<EpisodeDetails>;
    podcasts?: SearchResultData<Category>;
  };
}

export async function search(q: string) {
  return api.get<FullSearchResponse>('/api/search', { params: { q } }).then((res) => res.data);
}
