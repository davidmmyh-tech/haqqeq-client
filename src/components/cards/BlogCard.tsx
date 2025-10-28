import usePrefetchBlog from '@/hooks/queries/prefetch/usePrefetchBlog';
import DetailedCard, { type DetailedCardProps } from './DetailedCard';

type Props = { id: string | number } & Omit<DetailedCardProps, 'to'>;

export default function BlogCard({ id, ...props }: Props) {
  const { handlePrefetchBlog } = usePrefetchBlog();

  return (
    <div onMouseEnter={() => handlePrefetchBlog(id)}>
      <DetailedCard {...props} to={`/المدونة/${id}`} />
    </div>
  );
}
