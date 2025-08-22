"use client";

import { useState, useEffect } from "react";
import { Blog } from "../types";
import { blogs as staticBlogs } from "../data/blogs";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await fetch("/api/blogs");

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
  }, []);

  return { blogs, loading, error };
}

export function useBlog(slug: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const response = await fetch(`/api/blogs/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog not found");
          }
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data);
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
