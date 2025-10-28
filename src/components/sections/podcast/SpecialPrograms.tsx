import SquareImage from '@/components/cards/SquareImage';
import { Button } from '@/components/ui/button';
import usePrefetchVideo from '@/hooks/queries/prefetch/usePrefetchVideo';
import DataWrapper from '@/layouts/DataWrapper';
import getPodcasts from '@/services/getPodcasts';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function SpecialProgramsSection() {
  const [more, setMore] = useState(false);
  const userViewed = useRef(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) userViewed.current = true;
    }
  });

  const { handlePrefetchVideo } = usePrefetchVideo();
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['special-programs'],
    queryFn: () => getPodcasts({ page: 1, limit: 20 }),
    enabled: userViewed.current
  });

  const podcasts = data ? [...data.data] : [];
  const mainPodcasts = podcasts.splice(0, 5);

  return (
    <div className="relative" ref={ref}>
      {podcasts.length > 0 && (
        <div className="absolute end-0 -top-20">
          <Button
            variant="link"
            className="text-2xl font-medium underline"
            onClick={() => setMore((prev) => podcasts.length > 0 && !prev)}
          >
            المــــــزيد
          </Button>
        </div>
      )}
      <DataWrapper
        isError={isError}
        isPending={isPending}
        retry={refetch}
        isRefetching={isFetching}
        isEmpty={!data?.data.length}
      >
        <div className="mx-auto mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {mainPodcasts.map((podcast) => (
            <SquareImage
              key={podcast.id}
              src={podcast.cover_image}
              alt={podcast.title}
              to={`/البودكاست/${podcast?.id}`}
              onMouseEnter={() => handlePrefetchVideo(podcast.id)}
            />
          ))}
        </div>
        {more && (
          <div className="mx-auto mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
            {podcasts.map((podcast) => (
              <SquareImage
                key={podcast.id}
                src={podcast.cover_image}
                alt={podcast.title}
                to={`/البودكاست/${podcast?.id}`}
                onMouseEnter={() => handlePrefetchVideo(podcast.id)}
              />
            ))}
          </div>
        )}
      </DataWrapper>
    </div>
  );
}
