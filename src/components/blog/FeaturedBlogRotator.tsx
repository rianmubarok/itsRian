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
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = Math.floor(Math.random() * blogs.length);
          // Ensure we don't show the same blog twice in a row
          return nextIndex === prevIndex
            ? (nextIndex + 1) % blogs.length
            : nextIndex;
        });
        setIsTransitioning(false);
      }, 400); // Wait for fade out animation
    }, 10000);

    return () => clearInterval(interval);
  }, [blogs.length]);

  const handleManualChange = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? "next" : "prev");
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="mb-16 hidden lg:block">
      {/* Featured Blog with Animation - Hidden on Mobile */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isTransitioning
            ? "opacity-0 transform scale-95"
            : "opacity-100 transform scale-100"
        }`}
      >
        <BlogCard blog={blogs[currentIndex]} variant="featured" />
      </div>
    </div>
  );
}
