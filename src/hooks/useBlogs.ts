"use client";

import { useState, useEffect, useRef } from "react";
import { Blog } from "../types";
import { blogs as staticBlogs } from "../data/blogs";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await fetch("/api/blogs", {
          cache: "no-store", // Always fetch fresh data
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        if (data.length === 0) {
          console.warn("API returned empty blogs, using static data");
          setBlogs(staticBlogs);
        } else {
          setBlogs(data);
        }
      } catch (err) {
        console.warn("Failed to fetch blogs from API, using static data:", err);
        setBlogs(staticBlogs);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();

    // Listen for refresh events
    const handleRefresh = () => {
      fetchBlogs();
    };

    window.addEventListener("refreshBlogs", handleRefresh);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener("refreshBlogs", handleRefresh);
    };
  }, []);

  return { blogs, loading, error };
}

export function useBlog(slug: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);

        // Only increment view count if we haven't done it yet for this slug
        const shouldIncrement = !hasIncrementedRef.current;
        const url = shouldIncrement
          ? `/api/blogs/${slug}?inc=1`
          : `/api/blogs/${slug}?inc=0`;

        const response = await fetch(url, {
          cache: "no-store",
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog not found");
          }
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data);

        // Mark as incremented after successful fetch
        if (shouldIncrement) {
          hasIncrementedRef.current = true;
        }
      } catch (err) {
        console.warn("Failed to fetch blog from API, trying static data:", err);
        const staticBlog = staticBlogs.find((b) => b.slug === slug);
        if (staticBlog) {
          setBlog(staticBlog);
          setError(null);
        } else {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      // Reset the increment flag when slug changes
      hasIncrementedRef.current = false;
      fetchBlog();
    }
  }, [slug]);

  return { blog, loading, error };
}
