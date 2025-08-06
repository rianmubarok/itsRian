"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogs } from "../../../data";
import { notFound } from "next/navigation";
import { use } from "react";
import { formatDate } from "../../../utils";
import BlogCard from "../../../components/blog/BlogCard";
import { useIntersectionObserver } from "../../../hooks";

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

  const relatedPosts = blogs.filter((b) => b.slug !== slug).slice(0, 4);

  const { ref: backButtonRef, isIntersecting: backButtonIntersecting } = useIntersectionObserver<HTMLAnchorElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const { ref: headerRef, isIntersecting: headerIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const { ref: imageRef, isIntersecting: imageIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const { ref: contentRef, isIntersecting: contentIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const { ref: relatedRef, isIntersecting: relatedIntersecting } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  return (
    <main
      className="text-primary-dark dark:text-primary-light mx-auto mt-48"
      role="main"
    >
      {/* Back Button */}
      <Link
        ref={backButtonRef}
        href="/blog"
        className={`group text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 mb-8 transition-all duration-300${
          backButtonIntersecting ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
        }`}
      >
        <ArrowLeft className="w-6 h-6 stroke-1" />
        Back to blog
      </Link>

      {/* Blog Header */}
      <div 
        ref={headerRef}
        className={`mb-12 transition-all duration-700 ease-out delay-200 ${
          headerIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, index) => (
            <span
              key={tag}
              className="px-4 py-1 text-sm font-light rounded-full border border-primary-dark dark:border-primary-light transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${400 + index * 100}ms`,
                transform: headerIntersecting ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                opacity: headerIntersecting ? 1 : 0,
              }}
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
      <div 
        ref={imageRef}
        className={`mb-12 transition-all duration-700 ease-out delay-400 ${
          imageIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="relative h-80 md:h-180 bg-gray-200 dark:bg-white/50 overflow-hidden rounded-2xl">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Blog Content */}
      <article 
        ref={contentRef}
        className={`prose prose-lg max-w-none mb-16 transition-all duration-700 ease-out delay-600 ${
          contentIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="whitespace-pre-line text-lg leading-relaxed text-primary-gray">
          {blog.content.en}
        </div>
      </article>

      <hr className="border-t border-primary-gray/20 my-12" />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section 
          ref={relatedRef}
          className={`mb-16 transition-all duration-700 ease-out delay-800 ${
            relatedIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between mb-8 text-primary-dark dark:text-primary-light">
            <h2 className="text-[32px] font-regular ">Related Articles</h2>
            <Link
              href="/blog"
              className="group text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300"
            >
              View all articles
              <ArrowRight className="w-6 h-6 stroke-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedBlog, index) => (
              <div
                key={relatedBlog.id}
                className="transition-all duration-700 ease-out"
                style={{
                  transitionDelay: `${1000 + index * 150}ms`,
                  transform: relatedIntersecting ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  opacity: relatedIntersecting ? 1 : 0,
                }}
              >
                <BlogCard
                  blog={relatedBlog}
                  variant="list"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
