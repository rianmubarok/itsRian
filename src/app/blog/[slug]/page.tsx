"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useBlog, useBlogs } from "../../../hooks/useBlogs";
import { useBlogAnimation } from "../../../hooks/useBlogAnimation";
import {
  BackButton,
  BlogHeader,
  BlogThumbnail,
  BlogTags,
  BlogContent,
  RelatedPosts,
  BlogSkeleton,
} from "../../../components/blog";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const [slug, setSlug] = useState<string>("");
  useEffect(() => {
    (async () => {
      const { slug } = await params;
      setSlug(slug);
    })();
  }, [params]);

  const { blog, loading, error } = useBlog(slug);
  const { blogs } = useBlogs();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "id">("en");

  const { hasMounted, showContent, handleContentShow, refs } =
    useBlogAnimation();

  useEffect(() => {
    handleContentShow(loading, blog);
  }, [loading, blog, handleContentShow]);

  if (!loading && (error || !blog)) {
    notFound();
  }

  const relatedPosts = blogs.filter((b) => b.slug !== slug).slice(0, 4);

  return (
    <main
      className="relative max-w-2xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48 min-h-screen text-primary-dark dark:text-primary-light"
      role="main"
    >
      {/* Skeleton Loader */}
      <div
        className={`absolute inset-0 w-full min-h-full z-10 bg-white/80 dark:bg-primary-dark/80 transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <BlogSkeleton hasMounted={hasMounted} />
      </div>

      {/* Blog Content */}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {!blog ? null : (
          <>
            <BackButton hasMounted={hasMounted} />
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
            <RelatedPosts relatedPosts={relatedPosts} hasMounted={hasMounted} />
          </>
        )}
      </div>
    </main>
  );
}
