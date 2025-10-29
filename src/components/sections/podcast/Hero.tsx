import HeroAudio from '@/components/ui/extend/HeroTarack';
import Img from '@/components/ui/extend/Img';
import ViewsBadge from '@/components/ui/extend/ViewsBadge';
import { parsedDate } from '@/lib/utils';
import DefaultMotionDiv from '@/layouts/DefaultMotionElement';
import { Link } from 'react-router';
import type { Episode } from '@/schemas/types';
import usePrefetchEpisode from '@/hooks/queries/prefetch/usePrefetchEpisode';

export default function PodcastsHeroSection({ heroEpisode }: { heroEpisode: Episode }) {
  const { handlePrefetchEpisode } = usePrefetchEpisode();

  return (
    <DefaultMotionDiv
      onMouseEnter={() => handlePrefetchEpisode(heroEpisode?.id || '')}
      className="flex flex-col items-end md:h-80 md:flex-row"
    >
      <Link to={`/البودكاست/الحلقات/${heroEpisode?.id}`} className="max-h-80 basis-1/3 overflow-clip md:h-80">
        <Img
          src={heroEpisode?.cover_image}
          alt={heroEpisode?.title}
          className="h-full w-full rounded-2xl object-cover object-top"
        />
      </Link>

      <div className="w-full sm:p-4 md:basis-2/3">
        <h1 className="mb-4 text-[28px] font-medium">
          <Link to={`/البودكاست/${heroEpisode?.id}`}>{heroEpisode?.title}</Link>
        </h1>
        <p className="text-muted mb-6">{heroEpisode?.description}</p>

        <p className="inline-block">
          في <span className="font-bold">{heroEpisode?.title}</span>
        </p>
        <p className="text-muted ms-3 inline-block text-sm">{parsedDate(heroEpisode?.created_at || '')}</p>

        <ViewsBadge views={heroEpisode?.views_count || 0} />

        <HeroAudio src={heroEpisode?.audio_url ?? ''} />
      </div>
    </DefaultMotionDiv>
  );
}
