import Img from '@/components/ui/extend/Img';
import ViewsBadge from '@/components/ui/extend/ViewsBadge';
import { parsedDate } from '@/lib/utils';
import DefaultMotionDiv from '@/layouts/DefaultMotionElement';
import { Link } from 'react-router';
import usePrefetchRelease from '@/hooks/queries/prefetch/usePrefetchRelease';
import type { Release } from '@/schemas/types';
import { DownloadRelease } from '@/services/DownloadRelease';
import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import SubmitButton from '@/components/ui/submit-button';

export default function ReleasesHeroSection({ heroRelease }: { heroRelease: Release }) {
  const { handlePrefetchRelease } = usePrefetchRelease();
  const [busy, setBusy] = useState(false);

  const handleDownload = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!heroRelease.file_url) return;
      setBusy(true);
      await DownloadRelease(heroRelease.file_url, `${heroRelease.title}.pdf`, false).catch(() =>
        toast.error('حدث خطأ أثناء التحميل. حاول مرة أخرى لاحقاً.')
      );
      setBusy(false);
    },
    [heroRelease.file_url, heroRelease.title]
  );

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

        <SubmitButton
          isLoading={busy}
          onClick={handleDownload}
          className="me-4 h-11 w-32 text-3xl"
          disabled={busy}
          aria-busy={busy}
        >
          تحميــــل
        </SubmitButton>
        <a
          href={heroRelease.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-foreground text-foreground inline-flex h-11 w-32 justify-center rounded-md border-2 bg-transparent py-1 text-3xl hover:no-underline"
          aria-busy={busy}
        >
          قــــراءة
        </a>
      </div>
    </DefaultMotionDiv>
  );
}
