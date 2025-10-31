import { star, videos as vediosIcon } from '@/assets/images';
import SpecialProgramsSection from '@/components/sections/podcast/SpecialPrograms';
import VideosHeroSection from '@/components/sections/videos/Hero';
import MoreVideosSection from '@/components/sections/videos/MoreVideos';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import { VIDEOS_PAGE_QUERY_KEY } from '@/constants/query-keys';
import DataWrapper from '@/layouts/DataWrapper';
import { getVideos } from '@/services/getVideos';
import { useQuery } from '@tanstack/react-query';

export default function VideosPage() {
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: [VIDEOS_PAGE_QUERY_KEY],
    queryFn: () => getVideos({ page: 1, limit: 14 })
  });
  const videos = data?.data.data ? [...data.data.data] : [];

  return (
    <div className="mt-8 mb-28 space-y-12">
      <title>فيديوهات - حقق</title>

      <header className="container space-y-8">
        <SectionHeader icon={vediosIcon} title="الفيديوهات" />
        <DataWrapper
          isError={isError}
          isPending={isPending}
          retry={refetch}
          isRefetching={isFetching}
          isEmpty={!videos.length}
        >
          <VideosHeroSection heroVideo={videos.splice(0, 1)[0]} moreVideos={videos.splice(0, 3)} />
        </DataWrapper>
      </header>

      <section className="bg-accent">
        <div className="container py-8">
          <SectionHeader icon={star} title="برامج متميزة" as="h2" />
          <SpecialProgramsSection />
        </div>
      </section>

      <section className="container">
        <DataWrapper
          isError={isError}
          isPending={isPending}
          retry={refetch}
          isRefetching={isFetching}
          isEmpty={!videos.length}
        >
          <MoreVideosSection videos={videos} />
        </DataWrapper>
      </section>
    </div>
  );
}
