import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "./list";
import { Blog } from "../../types";

interface RelatedPostsProps {
  relatedPosts: Blog[];
  hasMounted: boolean;
}

export default function RelatedPosts({
  relatedPosts,
  hasMounted,
}: RelatedPostsProps) {
  if (relatedPosts.length === 0) return null;

  return (
    <section
      className={`mb-12 sm:mb-16 transition-all duration-700 ease-out delay-600 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="sm:text-center mb-10 text-primary-dark dark:text-primary-light">
        <h2
          className={`text-5xl font-semibold leading-tight tracking-tighter transition-all duration-700 ease-out`}
        >
          Related Articles
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {relatedPosts.slice(0, 2).map((relatedBlog) => (
          <div key={relatedBlog.id}>
            <BlogCard blog={relatedBlog} variant="tile" />
          </div>
        ))}
      </div>
    </section>
  );
}
