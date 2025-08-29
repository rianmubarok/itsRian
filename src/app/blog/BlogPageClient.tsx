"use client";

import FeaturedBlogRotator from "../../components/blog/FeaturedBlogRotator";
import { useEffect } from "react";
import { useInfiniteScroll } from "../../hooks";
import {
  BlogCardSkeleton,
  FeaturedBlogRotatorSkeleton,
} from "../../components/shared/ui/SkeletonLoader";
import { useBlogs } from "../../hooks/useBlogs";
import { AnimatedBlogCard } from "../../components/blog/BlogCard";

export default function BlogPageClient() {
  const { blogs, loading, error } = useBlogs();

  useEffect(() => {
    const refetchOnSignal = () => {
      // No-op here; useBlogs already refetches on visibility/focus/page show.
      // Triggering state by dispatching a visibility event in case browsers suppress it.
      try {
        document.dispatchEvent(new Event("visibilitychange"));
      } catch {}
    };
    window.addEventListener("blogViewUpdated", refetchOnSignal);
    return () => window.removeEventListener("blogViewUpdated", refetchOnSignal);
  }, []);

  const { displayedItems, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    blogs,
    {
      itemsPerPage: 4,
      threshold: 200,
    }
  );

  if (error) {
    return (
      <main className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48">
        <div className="text-center">
          <p className="text-red-500">Error loading blogs: {error}</p>
        </div>
      </main>
    );
  }

  // Tampilkan skeleton loader saat data sedang dimuat
  if (loading || displayedItems.length === 0) {
    return (
      <main
        className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48"
        role="main"
      >
        {/* Featured Blog Rotator Skeleton */}
        <FeaturedBlogRotatorSkeleton />

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48"
      role="main"
    >
      <FeaturedBlogRotator blogs={blogs} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayedItems.map((blog, index) => {
          if (!blog) return null;
          return (
            <AnimatedBlogCard
              key={blog.id || index}
              blog={blog}
              variant="tile"
            />
          );
        })}
      </div>

      {/* Loading untuk infinite scroll - menggunakan skeleton card yang sama */}
      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 sm:mt-8">
          {[1, 2, 3, 4].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      )}

      {/* Hidden div untuk infinite scroll trigger */}
      {hasMore && <div ref={loadingRef} className="h-20" />}
    </main>
  );
}
