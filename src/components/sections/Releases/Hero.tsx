import Img from '@/components/ui/extend/Img';
import ViewsBadge from '@/components/ui/extend/ViewsBadge';
import { parsedDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import DefaultMotionDiv from '@/layouts/DefaultMotionElement';
import { Link } from 'react-router';
import usePrefetchRelease from '@/hooks/queries/prefetch/usePrefetchRelease';
import type { Release } from '@/schemas/types';

export default function ReleasesHeroSection({ heroRelease }: { heroRelease: Release }) {
  const { handlePrefetchRelease } = usePrefetchRelease();

  return (
    <DefaultMotionDiv
      onMouseEnter={() => handlePrefetchRelease(heroRelease?.id || '')}
      className="mt-10 flex flex-col overflow-clip md:h-96 md:flex-row md:items-end"
    >
      <Link to={`/إصدارات/${heroRelease?.id}`} className="overflow-clip md:h-96">
        <Img
          src={heroRelease?.images[0]}
          alt={heroRelease?.title}
          className="h-full w-full rounded-2xl object-cover object-top"
        />
      </Link>

      <div className="basis-2/3 p-4">
        <h1 className="mb-4 text-[28px] font-medium">
          <Link to={`/إصدارات/${heroRelease?.id}`}>{heroRelease?.title}</Link>
        </h1>
        <p className="text-muted mb-4 hidden lg:block xl:me-18">{(heroRelease?.description || '').slice(0, 350)}</p>
        <p className="text-muted mb-4 block lg:hidden xl:me-18">{(heroRelease?.description || '').slice(0, 220)}</p>

        <p>
          في <span className="font-bold">{heroRelease?.title}</span>
          <span className="text-muted ms-3 inline-block text-sm">{parsedDate(heroRelease?.created_at || '')}</span>
        </p>

        <ViewsBadge views={0} />

        <Button className="me-4 h-11 w-36 text-3xl">تحميــــل</Button>
        <Button
          variant="link"
          className="border-foreground text-foreground h-11 w-36 border-2 bg-transparent text-3xl hover:no-underline"
        >
          قــــراءة
        </Button>
      </div>
    </DefaultMotionDiv>
  );
}
