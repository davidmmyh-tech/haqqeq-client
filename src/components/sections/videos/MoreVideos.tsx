import VideoCard from '@/components/cards/VideoCard';
import type { Video } from '@/schemas/types';

export default function MoreVideosSection({ videos }: { videos: Video[] }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          id={video.id}
          thumbnail={video.image_path}
          title={video.title}
          description={video.description}
          category={video.category.name}
          categoryId={video.category.id}
          publishDate={video.created_at}
        />
      ))}
    </div>
  );
}
