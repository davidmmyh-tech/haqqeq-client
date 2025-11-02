import { release as releaseIcon } from '@/assets/images';
import SectionCard from '@/components/cards/SectionCard';
import MoreRelesesSection from '@/components/sections/Releases/MoreReleses';
import Img from '@/components/ui/extend/Img';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import SubmitButton from '@/components/ui/submit-button';
import { MORE_RELEASES_QUERY_KEY, RELEASE_QUERY_KEY } from '@/constants/query-keys';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import DataWrapper from '@/layouts/DataWrapper';
import DefaultMotionDiv from '@/layouts/DefaultMotionElement';
import { DownloadRelease } from '@/services/DownloadRelease';
import { getReleaseDetails, getReleases } from '@/services/getReleases';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function ReleaseDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [busy, setBusy] = useState(false);

  const { data, isError, isPending, refetch, isFetching } = useQuery({
    queryKey: [RELEASE_QUERY_KEY, id],
    queryFn: () => getReleaseDetails(id),
    throwOnError: true,
    retry: 0
  });

  const release = data?.data;

  const handleDownload = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!release?.pdf_url) return;
      setBusy(true);
      await DownloadRelease(release.pdf_url, `${release.title}.pdf`, false).catch(() =>
        toast.error('حدث خطأ أثناء التحميل. حاول مرة أخرى لاحقاً.')
      );
      setBusy(false);
    },
    [release?.pdf_url, release?.title]
  );

  const moreReleases = useQuery({
    queryKey: [MORE_RELEASES_QUERY_KEY],
    queryFn: () => getReleases({ page: 1, limit: 8 })
  });

  useDocumentHead({
    title: `حقق - ${release?.title}`,
    description: release?.description,
    ogTitle: `حقق - ${release?.title}`,
    ogDescription: release?.description
  });

  return (
    <DataWrapper isError={isError} isPending={isPending} retry={refetch} isRefetching={isFetching} isEmpty={!data}>
      <div className="mb-12 space-y-8">
        <header className="bg-accent py-12">
          <DefaultMotionDiv className="container flex flex-col items-center gap-4 md:flex-row">
            <Img
              src={release?.image}
              alt={release?.title}
              loading="eager"
              fetchPriority="high"
              className="h-80 w-full rounded-2xl object-cover object-top md:w-2/6"
            />
            <div className="basis-4/6">
              <h1 className="mb-4 text-[28px] font-medium">{release?.title}</h1>
              <p className="text-muted mb-4">{release?.description}</p>

              <SubmitButton
                isLoading={busy}
                onClick={handleDownload}
                className="me-4 h-11 w-32 text-3xl"
                disabled={busy}
                aria-busy={busy}
              >
                تحميــــل
              </SubmitButton>
            </div>
          </DefaultMotionDiv>
        </header>

        <section>
          <div className="container space-y-8">
            <SectionHeader icon={releaseIcon} title="تفاصيل الإصدار" as="h3" />
            <DefaultMotionDiv>
              <SectionCard>
                <p className="mt-4 text-xl">{release?.description}</p>
              </SectionCard>
            </DefaultMotionDiv>
          </div>
        </section>

        <section>
          <div className="container space-y-8">
            <SectionHeader icon={releaseIcon} title="المزيد من الإصدارات" as="h4" />
            <MoreRelesesSection releases={moreReleases.data ?? []} />
          </div>
        </section>
      </div>
    </DataWrapper>
  );
}
