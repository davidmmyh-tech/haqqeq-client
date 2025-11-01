import EpisodeCard from '@/components/cards/EpisodeCard';
import type { Episode } from '@/schemas/types';

export default function RecentEpisodesSection({ episodes }: { episodes: Episode[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {episodes.map((ep) => (
        <EpisodeCard
          key={ep.id}
          id={ep.id}
          imageSrc={ep.cover_image}
          category={ep.podcast?.title || ''}
          categoryId={ep.podcast?.id || ''}
          description={ep.description}
          title={ep.title}
          publishDate={ep.created_at}
          audioSrc={ep.audio_url}
        />
      ))}
    </div>
  );
}
