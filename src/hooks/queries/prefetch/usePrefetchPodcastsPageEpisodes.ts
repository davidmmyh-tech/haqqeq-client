import { PODCASTS_PAGE_EPISODES_QUERY_KEY } from '@/constants/query-keys';
import getPodcasts from '@/services/getPodcasts';
import usePrefetch from './usePrefetch';

export default function usePrefetchPodcastsPageEpisodes() {
  const handlePrefetchPodcastsPageEpisodes = usePrefetch({
    getKey: () => [PODCASTS_PAGE_EPISODES_QUERY_KEY],
    queryFn: () => getPodcasts({ page: 1, limit: 15 })
  });

  return { handlePrefetchPodcastsPageEpisodes };
}
