import { release } from '@/assets/images';
import SectionCard from '@/components/cards/SectionCard';
import Img from '@/components/ui/extend/Img';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getBlogDetails, getBlogsCategoryDetails } from '@/services/getBlogs';
import DataWrapper from '@/layouts/DataWrapper';
import NewsLetter from '@/components/sections/NewsLetter';
import DefaultMotionElement from '@/layouts/DefaultMotionElement';
import { PencilLine } from 'lucide-react';
import { BLOG_CATEGORY_QUERY_KEY, BLOG_QUERY_KEY } from '@/constants/query-keys';
import MoreBlogsSection from '@/components/sections/Blogs/MoreBlogs';
import InnerHTML from '@/components/ui/extend/InnerHTML';

export default function BlogDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isError, isPending, refetch, isFetching, isFetched } = useQuery({
    queryKey: [BLOG_QUERY_KEY, id],
    queryFn: () => getBlogDetails(id),
    throwOnError: true,
    retry: 0
  });

  const relatedBlogsQuery = useQuery({
    queryKey: [BLOG_CATEGORY_QUERY_KEY, `${data?.category_id}`],
    queryFn: () => getBlogsCategoryDetails(data?.category_id || '', { page: 1, limit: 8 }),
    enabled: !!data?.category_id && isFetched
  });
  const relatedBlogs = relatedBlogsQuery.data?.blogs || [];
  const category = relatedBlogsQuery.data?.category;

  return (
    <DataWrapper
      isError={isError}
      isPending={isPending || isFetching}
      retry={refetch}
      isEmpty={!data}
      isRefetching={isFetching}
    >
      <title>{data?.title} - حقق</title>

      <div className="space-y-8">
        <header className="bg-accent">
          <DefaultMotionElement className="container flex flex-col items-center gap-4 py-12 md:flex-row">
            <Img
              src={data?.image}
              alt={data?.title}
              className="h-80 w-full rounded-2xl object-cover object-top md:w-2/6"
            />
            <div className="basis-4/6">
              <h1 className="mb-4 text-[28px] font-medium">{data?.title}</h1>
              <p className="text-muted mb-4">{data?.description.slice(0, 200)}</p>
              <div className="inline-flex gap-2 rounded-sm bg-[#FFC39B] px-4 py-2 text-xs font-bold">
                <PencilLine size={15} />
                {data?.user.name}
              </div>
            </div>
          </DefaultMotionElement>
        </header>

        {data?.header_image && (
          <div className="container flex justify-center">
            <Img src={data.header_image} alt={data.announcement} className="max-h-36 w-full rounded-lg object-cover" />
          </div>
        )}

        <section>
          <div className="container space-y-8">
            <SectionHeader icon={release} title="المقالة" as="h3" />
            <DefaultMotionElement>
              <SectionCard>
                <InnerHTML content={data?.content || ''} />
              </SectionCard>
            </DefaultMotionElement>
          </div>
        </section>

        {data?.announcement && <InnerHTML content={data.announcement} />}

        <section>
          <div className="container">
            <NewsLetter />
          </div>
        </section>

        <section>
          <div className="container mb-12 space-y-8">
            <SectionHeader icon={release} title="المزيد من مقالات حقق" as="h4" />
            <MoreBlogsSection blogs={relatedBlogs} defaultCategory={{ id: category?.id, name: category?.name }} />
          </div>
        </section>
      </div>
    </DataWrapper>
  );
}
