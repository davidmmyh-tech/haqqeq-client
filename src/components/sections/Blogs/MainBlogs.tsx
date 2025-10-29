import BlogCard from '@/components/cards/BlogCard';
import type { Blog } from '@/schemas/types';

export default function MainBlogsSection({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {blogs.map((blog) => (
        <BlogCard
          id={blog.id}
          key={blog.id}
          imageSrc={blog.image}
          category={blog.category.name}
          categoryId={blog.category.id}
          description={blog.description}
          title={blog.title}
          publishDate={blog.created_at}
          views={blog.views}
        />
      ))}
    </div>
  );
}
