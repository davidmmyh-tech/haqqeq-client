import SquareImage from '@/components/cards/SquareImage';
import usePrefetchBlog from '@/hooks/queries/prefetch/usePrefetchBlog';
import DataWrapper from '@/layouts/DataWrapper';
import { getBlogs } from '@/services/getBlogs';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function StarBlogsSection() {
  const { handlePrefetchBlog } = usePrefetchBlog();
  const userViewed = useRef(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) userViewed.current = true;
    }
  });

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['special-blogs'],
    queryFn: () => getBlogs({ page: 1 }),
    enabled: userViewed.current
  });

  const blogs = data ? data.data.slice(0, 5) : [];

  return (
    <div ref={ref}>
      <DataWrapper
        isError={isError}
        isPending={isPending}
        retry={refetch}
        isRefetching={isFetching}
        isEmpty={!blogs.length}
      >
        <div className="mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {blogs.map((blog) => (
            <SquareImage
              key={blog.id}
              src={blog.image}
              alt={blog.title}
              to={`/المدونة/${blog.id}`}
              onMouseEnter={() => handlePrefetchBlog(blog.id)}
            />
          ))}
        </div>
      </DataWrapper>
    </div>
  );
}
