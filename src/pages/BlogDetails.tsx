import { release } from '@/assets/images';
import SectionCard from '@/components/cards/SectionCard';
// import MoreBlogsSection from '@/components/sections/Blogs/MoreBlogs';
import Img from '@/components/ui/extend/Img';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getBlogDetails } from '@/services/getBlogs';
import DataWrapper from '@/layouts/DataWrapper';
import NewsLetter from '@/components/sections/NewsLetter';
import DOMPurify from 'dompurify';
import DefaultMotionElement from '@/layouts/DefaultMotionElement';
import { PencilLine } from 'lucide-react';
import { BLOG_QUERY_KEY } from '@/constants/query-keys';
//TODO: Add more blogs API
export default function BlogDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();

  const { data, isError, isPending, refetch, isFetching } = useQuery({
    queryKey: [BLOG_QUERY_KEY, id],
    queryFn: () => getBlogDetails(id),
    throwOnError: true,
    retry: 0
  });

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

        {data?.header_image && <Img src={data.header_image} alt={data.announcement} />}

        <section>
          <div className="container space-y-8">
            <SectionHeader icon={release} title="المقالة" as="h3" />
            <DefaultMotionElement>
              <SectionCard>
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.content || '') }}
                  className="mt-4 text-xl"
                ></div>
              </SectionCard>
            </DefaultMotionElement>
          </div>
        </section>

        {data?.announcement && (
          <div
            className="mt-6 [&_a]:cursor-pointer [&_a]:text-[#902907] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.announcement) }}
          ></div>
        )}

        <section>
          <div className="container">
            <NewsLetter />
          </div>
        </section>

        <section>
          <div className="container mb-12 space-y-8">
            <SectionHeader icon={release} title="المزيد من مقالات حقق" as="h4" />
            {/* <MoreBlogsSection /> */}
          </div>
        </section>
      </div>
    </DataWrapper>
  );
}
