import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogs } from "../../../lib/blog";
import { notFound } from "next/navigation";
import { use } from "react";
import { formatDate } from "../../../lib/utils";
import BlogCard from "../../../components/blog/BlogCard";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogs.filter((b) => b.slug !== slug).slice(0, 4);

  return (
    <main
      className="text-primary-dark dark:text-primary-light mx-auto mt-48"
      role="main"
    >
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-lg font-light mb-8"
      >
        <ArrowLeft className="w-6 h-6 stroke-1" />
        Back to blog
      </Link>

      {/* Blog Header */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 text-sm font-light rounded-full border border-primary-dark dark:border-primary-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-5xl font-medium leading-tight tracking-tight mb-6">
          {blog.title}
        </h1>
        <p className="text-xl text-primary-gray mb-6 leading-relaxed">
          {blog.description}
        </p>
        <time className="text-base text-primary-gray">
          {formatDate(blog.createdAt)}
        </time>
      </div>

      {/* Blog Thumbnail */}
      <div className="mb-12">
        <div className="relative h-96 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-2xl">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Blog Content */}
      <article className="prose prose-lg max-w-none mb-16">
        <div className="whitespace-pre-line text-lg leading-relaxed text-primary-gray">
          {blog.content.en}
        </div>
      </article>

      <hr className="border-t border-primary-gray my-12" />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 text-primary-dark dark:text-primary-light">
            <h2 className="text-[32px] font-regular ">Related Articles</h2>
            <Link
              href="/blog"
              className="text-lg font-light inline-flex items-center gap-2"
            >
              View all articles
              <ArrowRight className="w-6 h-6 stroke-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedBlog) => (
              <BlogCard
                key={relatedBlog.id}
                blog={relatedBlog}
                variant="list"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
