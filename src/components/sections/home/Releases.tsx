import SquareImage from '../../cards/SquareImage';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { getReleases } from '@/services/getReleases';
import DataWrapper from '@/layouts/DataWrapper';
import { useRef } from 'react';

export default function ReleasesSection() {
  const userViewed = useRef(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) userViewed.current = true;
    }
  });

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['haqqeq-releases'],
    queryFn: () => getReleases({ page: 2, limit: 5 }),
    enabled: userViewed.current
  });

  const releases = data ? [...data] : [];

  return (
    <div ref={ref}>
      <DataWrapper
        isError={isError}
        isPending={isPending}
        retry={refetch}
        isRefetching={isFetching}
        isEmpty={!releases.length}
      >
        <div className="mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {releases.map((release) => (
            <SquareImage src={release.images[0]} alt={release.title} key={release.id} to={`/إصدارات/${release.id}`} />
          ))}
        </div>
      </DataWrapper>
    </div>
  );
}
