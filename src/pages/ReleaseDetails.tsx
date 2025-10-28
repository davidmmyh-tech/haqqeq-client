import { release } from '@/assets/images';
import SectionCard from '@/components/cards/SectionCard';
// import MoreRelesesSection from '@/components/sections/Releases/MoreReleses';
import Img from '@/components/ui/extend/Img';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import { RELEASE_QUERY_KEY } from '@/constants/query-keys';
import DataWrapper from '@/layouts/DataWrapper';
import DefaultMotionDiv from '@/layouts/DefaultMotionElement';
import { getReleaseDetails } from '@/services/getReleases';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function ReleaseDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isError, isPending, refetch, isFetching } = useQuery({
    queryKey: [RELEASE_QUERY_KEY, id],
    queryFn: () => getReleaseDetails(id),
    throwOnError: true,
    retry: 0
  });

  return (
    <DataWrapper isError={isError} isPending={isPending} retry={refetch} isRefetching={isFetching} isEmpty={!data}>
      <title>{data?.title} - حقق</title>

      <div className="mb-12 space-y-8">
        <header className="bg-accent py-12">
          <DefaultMotionDiv className="container flex flex-col items-center gap-4 md:flex-row">
            <Img
              src={data?.images[0]}
              alt={data?.title}
              className="h-80 w-full rounded-2xl object-cover object-top md:w-2/6"
            />
            <div className="basis-4/6">
              <h1 className="mb-4 text-[28px] font-medium">{data?.title}</h1>
              <p className="text-muted mb-4">{data?.description}</p>

              <a
                href="/"
                target="_blank"
                download={data?.file_url}
                className="bg-primary text-primary-foreground me-4 h-11 w-36 rounded-md px-4 py-2 text-3xl disabled:opacity-50"
              >
                تحميــــل
              </a>
            </div>
          </DefaultMotionDiv>
        </header>

        <section>
          <div className="container space-y-8">
            <SectionHeader icon={release} title="تفاصيل الإصدار" as="h3" />
            <DefaultMotionDiv>
              <SectionCard>
                <p className="mt-4 text-xl">{data?.description}</p>
              </SectionCard>
            </DefaultMotionDiv>
          </div>
        </section>

        <section>
          <div className="container space-y-8">
            <SectionHeader icon={release} title="المزيد من الإصدارات" as="h4" />
            {/* <MoreRelesesSection /> */}
          </div>
        </section>
      </div>
    </DataWrapper>
  );
}
