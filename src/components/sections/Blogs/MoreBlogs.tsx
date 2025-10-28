import BlogCard from '@/components/cards/BlogCard';
import type { Blog } from '@/schemas/types';

export default function MoreBlogsSection({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          imageSrc={blog.image}
          category={blog.category}
          description={blog.description}
          title={blog.title}
          publishDate={blog.created_at}
        />
      ))}
    </div>
  );
}
