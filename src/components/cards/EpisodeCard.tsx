import usePrefetchPodcast from '@/hooks/queries/prefetch/usePrefetchPodcast';
import type { DetailedCardProps } from './DetailedCard';
import DetailedCard from './DetailedCard';

type Props = { id: string | number } & Omit<DetailedCardProps, 'to'>;

export default function PodcastCard({ id, ...props }: Props) {
  const { handlePrefetchPodcast } = usePrefetchPodcast();

  return (
    <div onMouseEnter={() => handlePrefetchPodcast(id)}>
      <DetailedCard {...props} to={`/الحلقات/${id}`} />
    </div>
  );
}
