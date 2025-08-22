"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "../blog/BlogCard";
import { useBlogs } from "../../hooks/useBlogs";
import { useEffect, useState } from "react";
import { FeaturedBlogCardSkeleton } from "../shared/ui/SkeletonLoader";

export default function FeaturedBlogs() {
  const { blogs, loading } = useBlogs();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const featuredBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  if (loading) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8 text-primary-dark dark:text-primary-light">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-regular">
            Latest Articles
          </h2>
          <Link
            href="/blog"
            className="group text-base sm:text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300"
          >
            View all articles
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {[1, 2, 3, 4].map((item) => (
            <FeaturedBlogCardSkeleton key={item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6 sm:mb-8 text-primary-dark dark:text-primary-light">
        <h2
          className={`text-2xl sm:text-3xl md:text-[32px] font-regular transition-all duration-700 ease-out ${
            hasMounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Latest Articles
        </h2>
        <Link
          href="/blog"
          className={`group text-base sm:text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 ${
            hasMounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          View all articles
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-1" />
        </Link>
      </div>

      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 transition-all duration-700 ease-out delay-400 ${
          hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {featuredBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className="transition-all duration-700 ease-out"
            style={{
              transitionDelay: `${600 + index * 150}ms`,
              transform: hasMounted
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.95)",
              opacity: hasMounted ? 1 : 0,
            }}
          >
            <BlogCard blog={blog} variant="list" />
          </div>
        ))}
      </div>
    </section>
  );
}
