"use client";

import { useState, useEffect, useCallback } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { Blog } from "../types";

export function useBlogAnimation(initialShowContent: boolean = false) {
  const [hasMounted, setHasMounted] = useState(false);
  const [showContent, setShowContent] = useState(initialShowContent);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { ref: backButtonRef } = useIntersectionObserver<HTMLAnchorElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const { ref: headerRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const { ref: imageRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const { ref: contentRef } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const { ref: relatedRef } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const { ref: tagsRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const handleContentShow = useCallback(
    (loading: boolean, blog: Blog | null) => {
      if (!loading && blog) {
        setShowContent((prev) => {
          if (!prev) {
            setTimeout(() => setShowContent(true), 50);
          }
          return prev; // keep true if already true
        });
      } else {
        setShowContent(false);
      }
    },
    []
  );

  return {
    hasMounted,
    showContent,
    handleContentShow,
    refs: {
      backButtonRef,
      headerRef,
      imageRef,
      contentRef,
      relatedRef,
      tagsRef,
    },
  };
}
