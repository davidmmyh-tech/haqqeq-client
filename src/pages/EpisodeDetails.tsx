import { videos } from '@/assets/images';
import SectionCard from '@/components/cards/SectionCard';
import MoreEpisodesSection from '@/components/sections/podcast/MoreEpisodes';
import HeroAudio from '@/components/ui/extend/HeroTarack';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import { EPISODE_QUERY_KEY, PODCAST_QUERY_KEY } from '@/constants/query-keys';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import DataWrapper from '@/layouts/DataWrapper';
import DefaultMotionElement from '@/layouts/DefaultMotionElement';
import { parsedDate, remote } from '@/lib/utils';
import { getEpisodeDetails } from '@/services/getEpisodes';
import { getPodcastDetails } from '@/services/getPodcasts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function EpisodeDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isError, isPending, refetch, isFetching, isFetched } = useQuery({
    queryKey: [EPISODE_QUERY_KEY, id],
    queryFn: () => getEpisodeDetails(id),
    throwOnError: true,
    retry: 0
  });

  const relatedEpisodesQuery = useQuery({
    queryKey: [PODCAST_QUERY_KEY, data?.podcast_id],
    queryFn: () => getPodcastDetails(data?.podcast_id || '', { page: 1, limit: 8 }),
    enabled: !!data?.podcast_id && isFetched
  });
  const relatedEpisodes = relatedEpisodesQuery.data?.episodes || [];

  useDocumentHead({
    title: `حقق - ${data?.title}`,
    description: data?.description,
    ogTitle: `حقق - ${data?.title}`,
    ogDescription: data?.description
  });

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
              {data?.short_description}
            </DefaultMotionElement>

            <DefaultMotionElement as="p">
              في <span className="font-bold">{data?.podcast?.title}</span>
              <span className="text-muted ms-3 inline-block text-sm">{parsedDate(data?.published_at)}</span>
            </DefaultMotionElement>

            <DefaultMotionElement>
              <HeroAudio src={data?.audio_url} />
            </DefaultMotionElement>

            <DefaultMotionElement className="mt-8 aspect-video max-h-[80vh] w-full overflow-clip rounded-2xl bg-black">
              <video
                controls
                src={remote(`${data?.video_url}`)}
                poster={data?.cover_image}
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

          {relatedEpisodes.length > 0 && (
            <section className="space-y-4">
              <SectionHeader title="المزيد من مقاطع فيديو حقق" icon={videos} />
              <MoreEpisodesSection episodes={relatedEpisodes} />
            </section>
          )}
        </div>
      </DataWrapper>
    </>
  );
}
