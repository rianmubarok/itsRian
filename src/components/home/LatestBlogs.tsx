"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "../blog/BlogCard";
import { useBlogs, useIntersectionObserver } from "../../hooks";
import { useMemo } from "react";
import { FeaturedBlogCardSkeleton } from "../shared/ui/SkeletonLoader";

export default function LatestBlogs() {
  const { blogs, loading } = useBlogs();
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const latestBlogs = useMemo(() => {
    return blogs
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
  }, [blogs]);

  return (
    <section ref={ref} className="mb-16">
      <div className="sm:text-center mb-10 text-primary-dark dark:text-primary-light">
        <p className="text-base lg:text-lg font-noto-serif-display italic">
          Just writing
        </p>
        <h2
          className={`text-5xl font-semibold leading-tight tracking-tighter transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          Latest posts
        </h2>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8`}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <FeaturedBlogCardSkeleton key={index} />
            ))
          : latestBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`transition-all duration-700 ease-out`}
                style={{
                  transitionDelay: `${600 + index * 150}ms`,
                  transform: isIntersecting
                    ? "translateY(0) scale(1)"
                    : "translateY(20px) scale(0.95)",
                  opacity: isIntersecting ? 1 : 0,
                }}
              >
                <BlogCard blog={blog} variant="tile" />
              </div>
            ))}
      </div>

      <div className="text-center">
        <Link
          href="/blog"
          className={`group text-base sm:text-lg font-noto-serif-display italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          See all articles
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>
    </section>
  );
}
