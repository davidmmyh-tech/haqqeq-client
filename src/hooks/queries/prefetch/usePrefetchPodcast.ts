import { PODCAST_QUERY_KEY } from '@/constants/query-keys';
import { getPodcastDetails } from '@/services/getPodcasts';
import usePrefetch from './usePrefetch';

export default function usePrefetchPodcast() {
  const handlePrefetchPodcast = usePrefetch({
    getKey: (id: string | number) => [PODCAST_QUERY_KEY, `${id}`],
    queryFn: (id: string | number) => getPodcastDetails(id)
  });

  return { handlePrefetchPodcast };
}
