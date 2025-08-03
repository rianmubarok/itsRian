import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogs } from "../../lib/blog";
import BlogCard from "../blog/BlogCard";

export default function FeaturedBlogs() {
  // Get the 4 most recent blog posts
  const featuredBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8 text-primary-dark dark:text-primary-light">
        <h2 className="text-[32px] font-regular">Latest Articles</h2>
        <Link
          href="/blog"
          className="text-lg font-light inline-flex items-center gap-2"
        >
          View all articles
          <ArrowRight className="w-6 h-6 stroke-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} variant="list" />
        ))}
      </div>
    </section>
  );
}
