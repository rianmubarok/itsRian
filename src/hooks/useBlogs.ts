"use client";

import { useState, useEffect, useRef } from "react";
import { Blog } from "../types";
import { blogs as staticBlogs } from "../data/blogs";


// Simple in-memory cache
let globalCache: Blog[] = [];

export function useBlogs() {
  // Initialize with cache if available
  const [blogs, setBlogs] = useState<Blog[]>(globalCache);
  const [loading, setLoading] = useState(globalCache.length === 0);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    async function fetchBlogs(isRefresh = false) {
      try {
        // Only set loading if we don't have cache and it's not a refresh
        if (!isRefresh && globalCache.length === 0) {
          setLoading(true);
        }

        const response = await fetch("/api/blogs", {
          cache: "no-store", // Always fetch fresh data
        });

        if (!isMountedRef.current) return;

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        if (data.length === 0) {
          console.warn("API returned empty blogs, using static data");
          setBlogs(staticBlogs);
          globalCache = staticBlogs;
        } else {
          setBlogs(data);
          globalCache = data;
        }
      } catch (err) {
        if (!isMountedRef.current) return;
        console.warn("Failed to fetch blogs from API, using static data:", err);
        // Only fallback to static if we absolutely have nothing
        if (blogs.length === 0) {
          setBlogs(staticBlogs);
          globalCache = staticBlogs;
        }
        setError(null);
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }

    fetchBlogs();

    // Listen for refresh events
    const handleRefresh = () => {
      fetchBlogs(true);
    };

    window.addEventListener("refreshBlogs", handleRefresh);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener("refreshBlogs", handleRefresh);
    };
  }, []); // Remove dependency on blogs length to avoid infinite loops if referential equality fails

  return { blogs, loading, error };
}

export function useBlog(slug: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    async function fetchBlog(isRefresh = false) {
      try {
        if (!isRefresh) {
          setLoading(true);
        }

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
      hasIncrementedRef.current = false;
      fetchBlog();
    }
  }, [slug]);

  return { blog, loading, error };
}
