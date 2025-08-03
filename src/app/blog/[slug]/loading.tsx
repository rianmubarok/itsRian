import { BlogCardSkeleton } from "../../../components/ui/SkeletonLoader";

export default function BlogDetailLoading() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light mx-auto mt-48"
      role="main"
    >
      {/* Back Button Skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      </div>

      {/* Blog Header Skeleton */}
      <div className="mb-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
        </div>

        {/* Title */}
        <div className="h-16 w-full bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse"></div>

        {/* Description */}
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse"></div>

        {/* Date */}
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      </div>

      {/* Blog Thumbnail Skeleton */}
      <div className="mb-12">
        <div className="h-96 w-full bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
      </div>

      {/* Blog Content Skeleton */}
      <div className="space-y-4 mb-16">
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-4/5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      </div>

      <hr className="border-t border-primary-gray my-12" />

      {/* Related Posts Skeleton */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((item) => (
            <BlogCardSkeleton key={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
