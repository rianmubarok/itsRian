"use client";

import FeaturedBlogRotator from "../../components/blog/FeaturedBlogRotator";
import { useInfiniteScroll } from "../../hooks";
import {
  BlogCardSkeleton,
  LoadingSpinner,
} from "../../components/shared/ui/SkeletonLoader";
import { useBlogs } from "../../hooks/useBlogs";
import { AnimatedBlogCard } from "../../components/blog/BlogCard";

export default function BlogPageClient() {
  const { blogs, loading, error } = useBlogs();

  const { displayedItems, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    blogs,
    {
      itemsPerPage: 4,
      threshold: 200,
    }
  );

  if (loading) {
    return (
      <main className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {[1, 2, 3, 4].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48">
        <div className="text-center">
          <p className="text-red-500">Error loading blogs: {error}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {displayedItems.map((blog, index) => {
          if (!blog) return null;
          return (
            <AnimatedBlogCard
              key={blog.id || index}
              blog={blog}
              variant="list"
            />
          );
        })}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
          {[1, 2, 3, 4].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      )}

      {hasMore && (
        <div
          ref={loadingRef}
          className="h-20 flex items-center justify-center mt-8"
        >
          <div className="flex items-center gap-3 text-primary-gray text-sm">
            <LoadingSpinner />
            <span>Loading more articles...</span>
          </div>
        </div>
      )}
    </main>
  );
}
