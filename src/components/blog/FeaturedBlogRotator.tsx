"use client";

import { useState, useEffect } from "react";
import { Blog } from "../../types";
import BlogCard from "./BlogCard";

interface FeaturedBlogRotatorProps {
  blogs: Blog[];
}

export default function FeaturedBlogRotator({
  blogs,
}: FeaturedBlogRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (blogs.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = Math.floor(Math.random() * blogs.length);
          return nextIndex === prevIndex
            ? (nextIndex + 1) % blogs.length
            : nextIndex;
        });
        setIsTransitioning(false);
      }, 400);
    }, 10000);

    return () => clearInterval(interval);
  }, [blogs.length]);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  const safeBlog = blogs[currentIndex] || blogs[0];

  return (
    <div
      className="mb-4 hidden lg:block opacity-0 animate-fade-in-up"
      style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
    >
      {/* Featured Blog with Animation - Hidden on Mobile */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isTransitioning
            ? "opacity-0 transform scale-95"
            : "opacity-100 transform scale-100"
        }`}
      >
        <BlogCard blog={safeBlog} variant="featured" />
      </div>
    </div>
  );
}
