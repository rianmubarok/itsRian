import {
  BlogCardSkeleton,
  FeaturedBlogRotatorSkeleton,
} from "../../components/shared/ui/SkeletonLoader";

export default function BlogLoading() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      {/* Featured Blog Rotator Skeleton */}
      <FeaturedBlogRotatorSkeleton />

      {/* Blog Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <BlogCardSkeleton key={item} />
        ))}
      </div>
    </main>
  );
}
