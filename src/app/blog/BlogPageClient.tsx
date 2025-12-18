"use client";

import FeaturedBlogRotator from "../../components/blog/FeaturedBlogRotator";
import { useEffect } from "react";
import { useInfiniteScroll } from "../../hooks";
import {
  BlogCardSkeleton,
  FeaturedBlogRotatorSkeleton,
} from "../../components/shared/ui/SkeletonLoader";
import { useBlogs } from "../../hooks/useBlogs";
import { useEffect as useEffectReact, useState } from "react";
import BlogCard from "../../components/blog/BlogCard";

export default function BlogPageClient() {
  const { blogs, loading, error } = useBlogs();
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Refresh blogs when returning from detail page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Refresh data when page becomes visible (returning from detail)
        // Use a more efficient approach than full page reload
        const event = new Event("refreshBlogs");
        window.dispatchEvent(event);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Debounce skeleton to avoid brief flashes on fast route transitions
  useEffectReact(() => {
    let timeoutId: number | undefined;
    if (loading) {
      timeoutId = window.setTimeout(() => setShowSkeleton(true), 200);
    } else {
      setShowSkeleton(false);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [loading]);

  const { displayedItems, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    blogs,
    {
      itemsPerPage: 4,
      threshold: 200,
    }
  );

  if (error) {
    return (
      <main className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40">
        <div className="text-center">
          <p className="text-red-500">Error loading blogs: {error}</p>
        </div>
      </main>
    );
  }

  const navigatingToDetail =
    typeof window !== "undefined" &&
    sessionStorage.getItem("navigatingToBlogDetail") === "1";

  if (
    !navigatingToDetail &&
    ((loading && showSkeleton) || (displayedItems.length === 0 && showSkeleton))
  ) {
    return (
      <main
        className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40"
        role="main"
      >
        {/* Featured Blog Rotator Skeleton */}
        <FeaturedBlogRotatorSkeleton />

        {/* Blog Grid Skeleton with animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={item}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <BlogCardSkeleton />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40"
      role="main"
    >
      {/* Clear navigation flag on render */}
      <span
        className="hidden"
        aria-hidden
        ref={() => {
          try {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("navigatingToBlogDetail");
            }
          } catch { }
        }}
      />
      <FeaturedBlogRotator blogs={blogs} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayedItems.map((blog, index) => {
          if (!blog) return null;
          return (
            <div
              key={blog.id || index}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${(index % 4) * 100}ms`, // Stagger based on position in current page/view mostly
                animationFillMode: "forwards",
              }}
            >
              <BlogCard blog={blog} variant="tile" />
            </div>
          );
        })}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 sm:mt-8">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={item}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <BlogCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {hasMore && <div ref={loadingRef} className="h-20" />}
    </main>
  );
}
