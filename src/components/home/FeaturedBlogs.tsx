"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogs } from "../../data";
import BlogCard from "../blog/BlogCard";
import { useIntersectionObserver } from "../../hooks";

export default function FeaturedBlogs() {
  const featuredBlogs = blogs
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section ref={ref} className="mb-16">
      <div className="flex items-center justify-between mb-8 text-primary-dark dark:text-primary-light">
        <h2
          className={`text-[32px] font-regular transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          Latest Articles
        </h2>
        <Link
          href="/blog"
          className={`group text-lg font-light inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          View all articles
          <ArrowRight className="w-6 h-6 stroke-1" />
        </Link>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-out delay-400 ${
          isIntersecting
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {featuredBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className="transition-all duration-700 ease-out"
            style={{
              transitionDelay: `${600 + index * 150}ms`,
              transform: isIntersecting
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.95)",
              opacity: isIntersecting ? 1 : 0,
            }}
          >
            <BlogCard blog={blog} variant="list" />
          </div>
        ))}
      </div>
    </section>
  );
}
