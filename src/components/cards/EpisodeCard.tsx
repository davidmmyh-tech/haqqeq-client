import type { DetailedCardProps } from './DetailedCard';
import DetailedCard from './DetailedCard';
import usePrefetchEpisode from '@/hooks/queries/prefetch/usePrefetchEpisode';

type Props = { id: string | number } & Omit<DetailedCardProps, 'to'>;

export default function PodcastCard({ id, ...props }: Props) {
  const { handlePrefetchEpisode } = usePrefetchEpisode();

  return (
    <div onMouseEnter={() => handlePrefetchEpisode(id)}>
      <DetailedCard {...props} to={`/البودكاست/الحلقات/${id}`} />
    </div>
  );
}
