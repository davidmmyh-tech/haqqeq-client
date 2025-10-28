import BlogsHeroSection from '@/components/sections/Blogs/Hero';
import MainBlogsSection from '@/components/sections/Blogs/MainBlogs';
import MoreBlogsSection from '@/components/sections/Blogs/MoreBlogs';
import StarBlogsSection from '@/components/sections/Blogs/StarBlogs';
import SectionHeader from '@/components/ui/extend/SectionHeader';
import { blog as blogIcon, star } from '@/assets/images';
import HSplit from '@/components/ui/h-split';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/services/getBlogs';
import DataWrapper from '@/layouts/DataWrapper';
import { BLOGS_PAGE_QUERY_KEY } from '@/constants/query-keys';

export default function BlogPage() {
  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: [BLOGS_PAGE_QUERY_KEY],
    queryFn: () => getBlogs({ page: 1, limit: 15 })
  });
  const blogs = data ? [...data.data] : [];

  return (
    <div className="mt-8 mb-28 space-y-12">
      <title>المدونة - حقق</title>

      <header className="container">
        <SectionHeader icon={blogIcon} title="المقالات الجديدة" />
        <DataWrapper
          isError={isError}
          isPending={isPending}
          retry={refetch}
          isRefetching={isFetching}
          isEmpty={!blogs[0]}
        >
          <BlogsHeroSection heroBlog={blogs.splice(0, 1)[0]} />
        </DataWrapper>
      </header>

      <section className="bg-accent">
        <div className="container py-8">
          <DataWrapper
            isError={isError}
            isPending={isPending}
            retry={refetch}
            isRefetching={isFetching}
            isEmpty={!blogs.length}
          >
            <MainBlogsSection blogs={blogs.splice(0, 4)} />
          </DataWrapper>
        </div>
      </section>

      <section className="container space-y-12">
        <SectionHeader icon={star} moreUrl="/الفديوهات" title="نشرات متميزة" as="h2" />
        <StarBlogsSection />
        <HSplit className="border-t-[#989696CC]" />
      </section>

      <section className="container">
        <DataWrapper
          isError={isError}
          isPending={isPending}
          retry={refetch}
          isRefetching={isFetching}
          isEmpty={!blogs.length}
        >
          <MoreBlogsSection blogs={blogs} />
        </DataWrapper>
      </section>
    </div>
  );
}
