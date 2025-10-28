import type { Episode, Podcast, Release, Season } from '@/schemas/types';
import api from './api';

type SearchResponse = {
  success: boolean;
  query: string;
  empty: true;
  results: {
    news: [];
    subscribers: [];
    podcasts: Podcast[];
    seasons: Season[];
    episodes: Episode[];
    releases: Release[];
  };
};

export async function search(q: string) {
  return api.get<SearchResponse>('/api/search', { params: { q } }).then((res) => res.data);
}
