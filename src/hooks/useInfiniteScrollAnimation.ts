"use client";

import { useState, useEffect } from "react";

export function useInfiniteScrollAnimation<T extends { id: number }>(
  items: T[],
  isIntersecting: boolean
) {
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());
  const [prevItemCount, setPrevItemCount] = useState(0);

  useEffect(() => {
    if (items.length > prevItemCount) {
      const newItems = items.slice(prevItemCount);

      newItems.forEach((item, index) => {
        setTimeout(() => {
          setAnimatedItems((prev) => new Set([...prev, item.id]));
        }, index * 150); 
      });
    }
    setPrevItemCount(items.length);
  }, [items, items.length, prevItemCount]);

  useEffect(() => {
    if (isIntersecting && items.length > 0) {
      const allItemIds = items.map((item) => item.id);
      setAnimatedItems(new Set(allItemIds));
    }
  }, [isIntersecting, items.length]);

  const getItemAnimationProps = (item: T, index: number) => {
    const isAnimated = animatedItems.has(item.id);
    const isNewItem = index >= prevItemCount - (items.length - prevItemCount);

    return {
      isAnimated,
      isNewItem,
      className: `transition-all duration-700 ease-out ${
        isNewItem ? "animate-in slide-in-from-bottom-4 fade-in" : ""
      }`,
      style: {
        transitionDelay: isNewItem
          ? `${
              (index - (prevItemCount - (items.length - prevItemCount))) * 150
            }ms`
          : `${600 + index * 100}ms`,
        transform:
          isIntersecting && isAnimated
            ? "translateY(0) scale(1)"
            : "translateY(20px) scale(0.95)",
        opacity: isIntersecting && isAnimated ? 1 : 0,
      },
    };
  };

  return {
    animatedItems,
    getItemAnimationProps,
  };
}
