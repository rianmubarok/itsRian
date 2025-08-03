import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Blog } from "../../types";

interface BlogCardProps {
  blog: Blog;
  variant?: "list" | "featured";
}

export default function BlogCard({ blog, variant = "list" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <article className="group">
        <Link href={`/blog/${blog.slug}`} className="block">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Title */}
              <h1 className="text-6xl font-medium leading-tight tracking-tight">
                {blog.title}
              </h1>

              {/* Read more button */}
              <div className="mt-auto flex items-center gap-2 text-base font-medium text-primary-dark dark:text-primary-light">
                <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                  Read more
                </span>
                <ArrowUpRight className="w-5 h-5 stroke-1" />
              </div>
            </div>

            {/* Thumbnail */}
            <div className="flex-shrink-0 w-full lg:w-110 h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-xl">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Default to list variant
  return (
    <article className="group">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="flex flex-col md:flex-row gap-6 mb-5">
          {/* Content */}
          <div className="flex-1">
            {/* Meta info */}
            <div className="flex items-center gap-2 text-sm text-primary-gray mb-3 font-light">
              <span>{blog.viewCount} views</span>
              <span className="w-1 h-1 bg-primary-gray rounded-full"></span>
              <span>{blog.readingTime} read</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-regular mb-3 text-primary-dark dark:text-primary-light">
              {blog.title}
            </h3>

            {/* Description */}
            <p className="text-lg text-primary-gray mb-4 line-clamp-2">
              {blog.description}
            </p>

            {/* Read more button */}
            <div className="flex items-center gap-2 text-sm font-medium text-primary-dark dark:text-primary-light">
              <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:scale-x-0 group-hover:after:scale-x-100 after:bg-current">
                Read more
              </span>
              <ArrowUpRight className="w-4 h-4 stroke-1" />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="flex-shrink-0 w-full md:w-50 h-50 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-xl">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
