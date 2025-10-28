import MorePodcastsSection from '@/components/sections/podcast/MoreEpisodes';
import Img from '@/components/ui/extend/Img';
import HSplit from '@/components/ui/h-split';
import Logo from '@/components/ui/logo';
import SubmitButton from '@/components/ui/submit-button';
import { INFINIT_QUERY_KEY, PODCAST_QUERY_KEY } from '@/constants/query-keys';
import DataWrapper from '@/layouts/DataWrapper';
import DefaultMotionElement from '@/layouts/DefaultMotionElement';
import { getPodcastDetails } from '@/services/getPodcasts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useParams } from 'react-router';

const PAGE_LIMIT = 6;

export default function PodcastDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isError, isLoading, refetch, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [PODCAST_QUERY_KEY, INFINIT_QUERY_KEY, id],
      queryFn: ({ pageParam }) => getPodcastDetails(id, { limit: PAGE_LIMIT, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.episode_count <= PAGE_LIMIT * allPages.length) return undefined;
        return allPages.length + 1;
      },
      initialPageParam: 1
    });

  const episodes = data?.pages?.flatMap((p: any) => p.episodes ?? p.data ?? []) ?? [];
  const podcast = data?.pages?.[0].podcast ?? null;
  const totalEpisodes = data?.pages?.[0].episode_count ?? 0;

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <DataWrapper isError={isError} isPending={isLoading} retry={refetch} isRefetching={isFetching} isEmpty={!data}>
      <title>{podcast?.title} - حقق</title>

      <div className="container my-8 space-y-10">
        <DefaultMotionElement as="header" className="flex flex-col gap-2 sm:flex-row">
          <Img
            src={podcast?.cover_image}
            alt={podcast?.title}
            className="aspect-square w-full shrink-0 rounded-xl object-cover sm:w-44"
          />
          <div className="space-y-2">
            <h1 className="mb-4 text-[28px] font-medium">{podcast?.title}</h1>
            <p className="text-muted flex items-center gap-2 text-sm">
              <span>من</span>
              <span>
                <Logo className="w-8" />
              </span>
            </p>
            <p className="text-muted mb-4 pe-14">{podcast?.description?.slice(0, 100)}...</p>
          </div>
        </DefaultMotionElement>

        <HSplit />

        <div className="text-muted -mt-6 flex justify-between">
          <p>{totalEpisodes} حلقة</p>
          <p>مرتب حسب الأحدث</p>
        </div>

        <MorePodcastsSection episodes={episodes} />

        {hasNextPage && (
          <SubmitButton isLoading={isFetching} className="mx-auto flex px-10" onClick={() => loadMore()}>
            المزيد
          </SubmitButton>
        )}
      </div>
    </DataWrapper>
  );
}
