import ReleaseCard from '@/components/cards/ReleaseCard';
import type { Release } from '@/schemas/types';

export default function MoreRelesesSection({ releases }: { releases: Release[] }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 xl:grid-cols-2">
      {releases.map((release) => (
        <ReleaseCard
          key={release.id}
          id={release.id}
          srcUrl={release.file_url}
          imageSrc={release.images[0]}
          title={release.title}
          description={release.description}
          publishDate={release.created_at}
        />
      ))}
    </div>
  );
}
