import { BlogSkeleton } from "../../../components/blog";

export default function BlogDetailLoading() {
  return (
    <main
      className="relative max-w-2xl mx-auto mt-24 sm:mt-32 md:mt-40 min-h-screen text-primary-dark dark:text-primary-light"
      role="main"
    >
      <div className="absolute inset-0 w-full min-h-full z-10 bg-primary-light/80 dark:bg-primary-dark/80">
        <BlogSkeleton />
      </div>
    </main>
  );
}
