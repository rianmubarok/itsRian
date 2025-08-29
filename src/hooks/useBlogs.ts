"use client";

import { useState, useEffect, useRef } from "react";
import { Blog } from "../types";
import { blogs as staticBlogs } from "../data/blogs";

// Simple in-memory cache with TTL to reduce refetching
const BLOGS_CACHE_KEY = "__blogs_cache__";
const BLOGS_CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes
type BlogsCache = { data: Blog[]; expiresAt: number } | null;
let blogsCache: BlogsCache = null;

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        // Determine if we should bypass cache (e.g., returning from detail page)
        let shouldBypassCache = false;
        try {
          shouldBypassCache =
            sessionStorage.getItem("navigatingToBlogDetail") === "1";
          if (shouldBypassCache) {
            sessionStorage.removeItem("navigatingToBlogDetail");
          }
        } catch {}

        // Try cache first unless bypassing
        const now = Date.now();
        if (!shouldBypassCache && blogsCache && blogsCache.expiresAt > now) {
          setBlogs(blogsCache.data);
          setLoading(false);
          return;
        }

        const url = `/api/blogs`;
        const response = await fetch(url, {
          cache: shouldBypassCache ? "no-store" : "force-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        if (data.length === 0) {
          console.warn("API returned empty blogs, using static data");
          setBlogs(staticBlogs);
          blogsCache = {
            data: staticBlogs,
            expiresAt: now + BLOGS_CACHE_TTL_MS,
          };
        } else {
          setBlogs(data);
          blogsCache = { data, expiresAt: now + BLOGS_CACHE_TTL_MS };
        }
      } catch (err) {
        console.warn("Failed to fetch blogs from API, using static data:", err);
        setBlogs(staticBlogs);
        blogsCache = {
          data: staticBlogs,
          expiresAt: Date.now() + BLOGS_CACHE_TTL_MS,
        };
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return { blogs, loading, error };
}

export function useBlog(slug: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inflightPrefix = "viewing:";

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const normalized = (slug || "").trim().toLowerCase();
        let shouldInc = true;
        const viewedKey = `viewed:${normalized}`;
        const viewingKey = `${inflightPrefix}${normalized}`;
        try {
          if (
            sessionStorage.getItem(viewedKey) ||
            sessionStorage.getItem(viewingKey)
          ) {
            shouldInc = false;
          } else {
            sessionStorage.setItem(viewingKey, "1");
          }
        } catch {}

        const response = await fetch(
          `/api/blogs/${slug}?inc=${shouldInc ? "1" : "0"}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog not found");
          }
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data);
        // Only mark as viewed after a successful response, and clear inflight
        try {
          if (shouldInc) sessionStorage.setItem(viewedKey, "1");
          sessionStorage.removeItem(viewingKey);
        } catch {}
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
      fetchBlog();
    }
  }, [slug]);

  return { blog, loading, error };
}
