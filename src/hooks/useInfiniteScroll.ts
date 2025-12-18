"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions {
  itemsPerPage?: number;
  threshold?: number;
}

export function useInfiniteScroll<T>(
  items: T[],
  options: UseInfiniteScrollOptions = {}
) {
  const { itemsPerPage = 4, threshold = 100 } = options;
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * itemsPerPage;
    const newItems = items.slice(startIndex, endIndex);

    setDisplayedItems(newItems);
    setCurrentPage(nextPage);
    setHasMore(endIndex < items.length);
    setIsLoading(false);
  }, [currentPage, items, itemsPerPage, isLoading, hasMore]);

  useEffect(() => {
    const endIndex = currentPage * itemsPerPage;
    setDisplayedItems(items.slice(0, endIndex));
    setHasMore(items.length > endIndex);
  }, [items, itemsPerPage, currentPage]);

  useEffect(() => {
    if (!loadingRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    );

    observerRef.current.observe(loadingRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoading, threshold]);

  return {
    displayedItems,
    isLoading,
    hasMore,
    loadingRef,
  };
}
