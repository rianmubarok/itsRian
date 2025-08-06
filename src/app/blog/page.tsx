"use client";

import { blogs } from "../../data";
import BlogCard from "../../components/blog/BlogCard";
import FeaturedBlogRotator from "../../components/blog/FeaturedBlogRotator";
import { useInfiniteScroll } from "../../hooks";
import {
  BlogCardSkeleton,
  LoadingSpinner,
} from "../../components/shared/ui/SkeletonLoader";

export default function BlogPage() {
  const { displayedItems, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    blogs,
    {
      itemsPerPage: 4,
      threshold: 200,
    }
  );

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      {/* Featured Blog Rotator */}
      <FeaturedBlogRotator blogs={blogs} />

      {/* All Blogs in Grid - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayedItems.map((blog) => (
          <BlogCard key={blog.id} blog={blog} variant="list" />
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {[1, 2, 3, 4].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      )}

      {/* Intersection observer target */}
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
