import Img from '@/components/ui/extend/Img';
import ViewsBadge from '@/components/ui/extend/ViewsBadge';
import { parsedDate } from '@/lib/utils';
import { VideoIcon } from '@/components/ui/icons';
import VideoCard from '@/components/cards/VideoCard';
import DefaultMotionElement from '@/layouts/DefaultMotionElement';
import { Link } from 'react-router';
import type { Video } from '@/schemas/types';

export default function VideosHeroSection({ heroVideo, moreVideos }: { heroVideo?: Video; moreVideos: Video[] }) {
  return (
    <>
      <DefaultMotionElement className="mt-6 flex w-full flex-col-reverse items-start justify-between gap-2 md:flex-row md:items-end">
        <div className="basis-7/12">
          <h1 className="mb-4 text-[28px] font-medium">
            <Link to={`/الفيديوهات/${heroVideo?.id}`}>{heroVideo?.title}</Link>
          </h1>
          <p className="text-muted mb-6">{heroVideo?.description}</p>

          <p className="mb-1">
            في{' '}
            <Link to={`/الفيديوهات/تصنيف/${heroVideo?.category_id}`} className="font-bold">
              {heroVideo?.category_name}
            </Link>
            <span className="text-muted ms-3 inline-block text-sm">{parsedDate(heroVideo?.created_at)}</span>
          </p>

          <ViewsBadge views={heroVideo?.views_count || 0} />
        </div>

        <Link
          to={`/الفيديوهات/${heroVideo?.id}`}
          className="relative aspect-video h-full w-full overflow-clip md:basis-5/12"
        >
          <Img
            src={heroVideo?.image_path}
            alt={heroVideo?.title}
            className="h-full w-full rounded-2xl object-cover object-top"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <VideoIcon size={60} />
          </div>
        </Link>
      </DefaultMotionElement>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {moreVideos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            category={video.category_name}
            categoryId={video.category_id}
            publishDate={video.created_at}
            thumbnail={video.image_path}
            title={video.title}
          />
        ))}
      </div>
    </>
  );
}
