import { useQuery } from '@tanstack/react-query';
import DataWrapper from '@/layouts/DataWrapper';
import SquareImage from '@/components/cards/SquareImage';
import EpisodeCard from '@/components/cards/EpisodeCard';
import { getEpisodes } from '@/services/getEpisodes';
import usePrefetchPodcast from '@/hooks/queries/prefetch/usePrefetchPodcast';

export default function EpisodesSection() {
  const { handlePrefetchPodcast } = usePrefetchPodcast();
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['new-episodes'],
    queryFn: () => getEpisodes({ page: 1, limit: 8 })
  });
  const episodes = data ? [...data] : [];
  const mainEpisodes = data && data?.length >= 2 ? [episodes[0], episodes[1]] : [];
  episodes.splice(0, 2);

  return (
    <DataWrapper
      isError={isError}
      isPending={isPending}
      retry={refetch}
      isEmpty={!episodes.length}
      isRefetching={isFetching}
    >
      <div className="flex w-full flex-col items-center justify-between gap-8 py-10 xl:flex-row xl:gap-1">
        <div className="block space-y-6 lg:flex lg:space-y-0 xl:block xl:space-y-10">
          {mainEpisodes.map((ep) => (
            <EpisodeCard
              key={ep.id}
              id={ep.id}
              imageSrc={ep.cover_image}
              category={ep.podcast?.title || ''}
              categoryId={ep.podcast?.id || ''}
              description={ep.description}
              title={ep.title}
              publishDate={ep.created_at}
            />
          ))}
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-2 sm:gap-6">
          {episodes.map((podcast) => (
            <SquareImage
              key={podcast.id}
              className="xl:w-56"
              src={podcast.cover_image || ''}
              alt={podcast.title}
              to={`/البودكاست/${podcast.id}`}
              onMouseEnter={() => handlePrefetchPodcast(podcast.id)}
            />
          ))}
        </div>
      </div>
    </DataWrapper>
  );
}
