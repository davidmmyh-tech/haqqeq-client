import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import DataWrapper from '@/layouts/DataWrapper';
import SquareImage from '@/components/cards/SquareImage';
import { useRef } from 'react';
import EpisodeCard from '@/components/cards/EpisodeCard';
import usePrefetchVideo from '@/hooks/queries/prefetch/usePrefetchVideo';
import { getEpisodes } from '@/services/getEpisodes';

export default function NewEpisodesSection() {
  const userViewed = useRef(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) userViewed.current = true;
    }
  });

  const { handlePrefetchVideo } = usePrefetchVideo();
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['new-episodes'],
    queryFn: () => getEpisodes({ page: 1, limit: 8 }),
    enabled: userViewed.current
  });
  const episodes = data ? [...data.data] : [];
  const mainEpisodes = data ? [episodes[0], episodes[1]] : [];
  episodes.splice(0, 2);

  return (
    <div ref={ref}>
      <DataWrapper
        isError={isError}
        isPending={isPending}
        retry={refetch}
        isEmpty={!episodes.length}
        isRefetching={isFetching}
      >
        <div className="flex w-full flex-col items-center justify-between gap-8 py-10 xl:flex-row xl:gap-1">
          <div className="block space-y-6 lg:flex lg:space-y-0 xl:block xl:space-y-10">
            {mainEpisodes.map((podcast) => (
              <EpisodeCard
                key={podcast.id}
                id={podcast.id}
                imageSrc={podcast.cover_image}
                category={podcast.title}
                description={podcast.description}
                title={podcast.title}
                publishDate={podcast.created_at}
              />
            ))}
          </div>

          <div className="grid shrink-0 grid-cols-3 gap-2 sm:gap-6">
            {episodes.map((ep) => (
              <SquareImage
                key={ep.id}
                className="xl:w-56"
                src={ep.cover_image || ''}
                alt={ep.title}
                to={`/البودكاست/${ep.id}`}
                onMouseEnter={() => handlePrefetchVideo(ep.id)}
              />
            ))}
          </div>
        </div>
      </DataWrapper>
    </div>
  );
}
