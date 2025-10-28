import BlogCard from '@/components/cards/BlogCard';
import type { Blog } from '@/schemas/types';

export default function NewBlogPostsSection({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2">
      {blogs.map((post) => (
        <BlogCard
          id={post.id}
          key={post.id}
          imageSrc={post.image}
          title={post.title}
          description={post.description.slice(0, 150) + '...'}
          category={post.category}
          publishDate={post.publish_date}
        />
      ))}
    </div>
  );
}
