import SquareImage from '@/components/cards/SquareImage';
import usePrefetchBlogCategory from '@/hooks/queries/prefetch/usePrefetchBlogCategory';
import DataWrapper from '@/layouts/DataWrapper';
import { getBlogsCategories } from '@/services/getBlogs';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function StarBlogsCategorySection() {
  const { handlePrefetchBlogCategory } = usePrefetchBlogCategory();
  const userViewed = useRef(false);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) userViewed.current = true;
    }
  });

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ['star-blog-categories'],
    queryFn: () => getBlogsCategories({ page: 1, limit: 5 }),
    enabled: userViewed.current
  });

  const categories = data || [];

  return (
    <div ref={ref}>
      <DataWrapper
        isError={isError}
        isPending={isPending}
        retry={refetch}
        isRefetching={isFetching}
        isEmpty={!categories.length}
      >
        <div className="mx-auto grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {categories.map((category) => (
            <SquareImage
              key={category.id}
              src={category.image}
              alt={category.name}
              to={`/المدونة/تصنيف/${category.id}`}
              onMouseEnter={() => handlePrefetchBlogCategory(category.id)}
            />
          ))}
        </div>
      </DataWrapper>
    </div>
  );
}
