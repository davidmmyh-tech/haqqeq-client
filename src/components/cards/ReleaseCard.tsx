import DefaultMotionDiv from '@/layouts/DefaultMotionElement';
import Img from '../ui/extend/Img';
import { Link } from 'react-router';
import { memo, useCallback, useState } from 'react';
import usePrefetchRelease from '@/hooks/queries/prefetch/usePrefetchRelease';
import SubmitButton from '../ui/submit-button';
import { DownloadRelease } from '@/services/DownloadRelease';
import { toast } from 'react-toastify';

type Props = {
  title: string;
  description: string;
  imageSrc: string | null;
  publishDate: string;
  srcUrl: string;
  id: string | number;
};

const ReleaseCard = memo(({ title, description, imageSrc, srcUrl, id }: Props) => {
  const { handlePrefetchRelease } = usePrefetchRelease();
  const [busy, setBusy] = useState(false);

  const handleDownload = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!srcUrl) return;
      setBusy(true);
      await DownloadRelease(srcUrl, `${title}.pdf`, false).catch(() =>
        toast.error('حدث خطأ أثناء التحميل. حاول مرة أخرى لاحقاً.')
      );
      setBusy(false);
    },
    [srcUrl, title]
  );

  return (
    <DefaultMotionDiv
      onMouseEnter={() => handlePrefetchRelease(id)}
      delay={0.2}
      className="flex flex-col sm:flex-row md:items-end"
    >
      <Link to={`/إصدارات/${id}`} className="block aspect-295/409 shrink-0 lg:w-52">
        <Img className="h-full w-full rounded-2xl object-cover" src={imageSrc || ''} alt={title} />
      </Link>

      <div className="flex-1 space-y-6 px-4 py-2 sm:my-0">
        <Link to={`/إصدارات/${id}`} className="text-xl font-medium">
          {title}
        </Link>

        <p className="text-muted text-[15px]">{(description || '').slice(0, 300)}...</p>

        <div className="space-y-2">
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
            href={srcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground text-foreground inline-flex h-11 w-32 justify-center rounded-md border-2 bg-transparent py-1 text-3xl hover:no-underline"
            aria-busy={busy}
          >
            قــــراءة
          </a>
        </div>
      </div>
    </DefaultMotionDiv>
  );
});

ReleaseCard.displayName = 'ReleaseCard';
export default ReleaseCard;
