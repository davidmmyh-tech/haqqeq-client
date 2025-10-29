import { videos } from '@/assets/images';
import SectionCard from '@/components/cards/SectionCard';
import MoreVideosSection from '@/components/sections/videos/MoreVideos';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import { VIDEO_CATEGORY_QUERY_KEY, VIDEO_QUERY_KEY } from '@/constants/query-keys';
import DataWrapper from '@/layouts/DataWrapper';
import DefaultMotionElement from '@/layouts/DefaultMotionElement';
import { parsedDate, remote } from '@/lib/utils';
import { getVideoDetails, getVideos } from '@/services/getVideos';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
//TODO: Add more Related videos API
export default function VideoDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isError, isPending, refetch, isFetching, isFetched } = useQuery({
    queryKey: [VIDEO_QUERY_KEY, id],
    queryFn: () => getVideoDetails(id),
    throwOnError: true,
    retry: 0
  });

  const relatedVideosQuery = useQuery({
    queryKey: [VIDEO_CATEGORY_QUERY_KEY, '5'],
    queryFn: () => getVideos({ page: 1, limit: 6 }),
    enabled: isFetched
  });
  const relatedVideos = relatedVideosQuery.data?.data || [];

  return (
    <>
      <title>{data?.title} - حقق</title>

      <DataWrapper isError={isError} isPending={isPending} retry={refetch} isRefetching={isFetching} isEmpty={!data}>
        <div className="container my-8 space-y-12">
          <header className="space-y-2">
            <DefaultMotionElement className="mb-4 text-[28px] font-medium" as="h1">
              {data?.title}
            </DefaultMotionElement>

            <DefaultMotionElement as="p" className="text-muted mb-4 pe-14">
              {data?.description}
            </DefaultMotionElement>

            <DefaultMotionElement as="p">
              في <span className="font-bold">{'category'}</span>
              <span className="text-muted ms-3 inline-block text-sm">{parsedDate(data?.created_at)}</span>
            </DefaultMotionElement>

            <DefaultMotionElement className="mt-8 aspect-video max-h-[80vh] w-full overflow-clip rounded-2xl bg-black">
              <video
                controls
                src={remote(`${data?.video_path}`)}
                poster={data?.image_path}
                className="h-full w-full bg-black object-contain"
              />
            </DefaultMotionElement>
          </header>

          <section>
            <DefaultMotionElement className="container space-y-8">
              <SectionCard>
                <p className="text-muted mt-4 text-xl">{data?.description}</p>
              </SectionCard>
            </DefaultMotionElement>
          </section>

          {relatedVideos.length > 0 && (
            <section className="space-y-4">
              <SectionHeader title="المزيد من حلقات حقق" icon={videos} />
              <MoreVideosSection videos={relatedVideos} />
            </section>
          )}
        </div>
      </DataWrapper>
    </>
  );
}
