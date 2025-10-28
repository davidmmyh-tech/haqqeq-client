import VedioCard from '../../cards/VideoCard';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import DataWrapper from '@/layouts/DataWrapper';
import { getVideos } from '@/services/getVideos';
import { useRef } from 'react';

export default function VideosSection() {
  const userViewed = useRef(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) userViewed.current = true;
    }
  });

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['new-videos'],
    queryFn: () => getVideos({ page: 1, limit: 3 }),
    enabled: userViewed.current
  });

  const episodes = data ? data.data : [];

  return (
    <div ref={ref}>
      <DataWrapper
        isError={isError}
        isPending={isPending}
        retry={refetch}
        isRefetching={isFetching}
        isEmpty={!episodes.length}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((video) => (
            <VedioCard
              key={video.id}
              id={video.id}
              thumbnail={video.image_path}
              category={video.category.name}
              categoryId={video.category.id}
              title={video.title}
              publishDate={video.created_at}
            />
          ))}
        </div>
      </DataWrapper>
    </div>
  );
}
