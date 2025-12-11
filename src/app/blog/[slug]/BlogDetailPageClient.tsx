"use client";

import { use, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useBlog, useBlogs } from "../../../hooks/useBlogs";
import { useBlogAnimation } from "../../../hooks/useBlogAnimation";
import {
  BackButton,
  BlogHeader,
  BlogThumbnail,
  BlogTags,
  BlogContent,
  OtherPosts,
  BlogSkeleton,
} from "../../../components/blog";
import { notFound } from "next/navigation";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPageClient({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const fromHome = searchParams.get("from") === "home";
  const backHref = fromHome ? "/" : "/blog";
  const backLabel = fromHome ? "Back to home" : "Back to blog";

  const { blog, loading, error } = useBlog(slug);
  const { blogs } = useBlogs();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "id">("en");

  const { hasMounted, showContent, handleContentShow } = useBlogAnimation();

  // Memoize the handleContentShow callback to prevent unnecessary re-renders
  const memoizedHandleContentShow = useCallback(() => {
    handleContentShow(loading, blog);
  }, [loading, blog, handleContentShow]);

  useEffect(() => {
    memoizedHandleContentShow();
  }, [memoizedHandleContentShow]);

  useEffect(() => {
    if (!showContent) {
      document.body.classList.add("hide-footer");
    } else {
      document.body.classList.remove("hide-footer");
    }
    return () => {
      document.body.classList.remove("hide-footer");
    };
  }, [showContent]);

  if (!loading && (error || !blog)) {
    notFound();
  }

  const relatedPosts = (() => {
    const pool = blogs.filter((b) => b.slug !== slug);
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 2);
  })();

  return (
    <main
      className="relative max-w-2xl mx-auto mt-24 sm:mt-32 md:mt-40 min-h-screen text-primary-dark dark:text-primary-light"
      role="main"
    >
      <div
        className={`absolute inset-0 w-full min-h-full z-10 bg-primary-light/80 dark:bg-primary-dark/80 transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Hide list skeleton if we are navigating from the blog list */}
        <BlogSkeleton hasMounted={hasMounted} />
      </div>

      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {!blog ? null : (
          <>
            <BackButton
              hasMounted={hasMounted}
              href={backHref}
              label={backLabel}
            />
            <BlogHeader blog={blog} hasMounted={hasMounted} />
            <BlogThumbnail blog={blog} hasMounted={hasMounted} />
            <BlogTags
              blog={blog}
              hasMounted={hasMounted}
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
            <BlogContent
              blog={blog}
              hasMounted={hasMounted}
              currentLanguage={currentLanguage}
            />
            <hr className="border-t border-primary-gray/20 my-12" />
            <OtherPosts relatedPosts={relatedPosts} hasMounted={hasMounted} />
          </>
        )}
      </div>
    </main>
  );
}
