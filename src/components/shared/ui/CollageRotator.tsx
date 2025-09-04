"use client";

import React, { useMemo, useState, useCallback } from "react";
import InfiniteLoopSlider from "./InfiniteLoopSlider";
import VerticalLoopSlider from "./VerticalLoopSlider";

interface CollageRotatorProps {
  images: Array<{ src: string; alt?: string }>;
  rowCount?: number;
  reverseEveryOther?: boolean;
  imageSize?: number;
  gap?: number;
  direction?: "horizontal" | "vertical";
  columns?: number;
  containerClassName?: string;
  columnGap?: number;
  columnWidthPercent?: number;
}

export default function CollageRotator({
  images,
  rowCount = 3,
  reverseEveryOther = true,
  imageSize = 160,
  gap = 2,
  direction = "horizontal",
  columns = 2,
  containerClassName = "",
  columnGap = 6,
}: CollageRotatorProps) {
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const markLoaded = useCallback((key: string) => {
    setLoadedMap((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  const groups = useMemo(() => {
    if (!images || images.length === 0) return [] as Array<typeof images>;
    const cloned = [...images];
    const groupCount = direction === "horizontal" ? rowCount : columns;
    const perGroup = Math.max(1, Math.ceil(cloned.length / groupCount));
    const result: Array<typeof images> = [];
    for (let i = 0; i < groupCount; i += 1) {
      const start = i * perGroup;
      const slice = cloned.slice(start, start + perGroup);
      result.push([...slice].sort(() => Math.random() - 0.5));
    }
    return result;
  }, [images, rowCount, direction, columns]);

  if (!groups.length) return null;

  if (direction === "horizontal") {
    return (
      <div className="w-full overflow-hidden">
        <div className="flex flex-col" style={{ gap }}>
          {groups.map((items, groupIndex) => (
            <InfiniteLoopSlider
              key={`row-${groupIndex}`}
              isReverse={reverseEveryOther ? groupIndex % 2 === 1 : false}
            >
              <div className="flex" style={{ gap }}>
                {items.map((img, idx) => (
                  <div
                    key={`${img.src}-${idx}`}
                    className="relative rounded-xl overflow-hidden border border-primary-gray/20 bg-gray-100 dark:bg-primary-light/5"
                    style={{ width: imageSize, height: imageSize }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt || "Collage image"}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        loadedMap[`${img.src}-${idx}`]
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      loading="lazy"
                      onLoad={() => markLoaded(`${img.src}-${idx}`)}
                      onError={() => markLoaded(`${img.src}-${idx}`)}
                    />
                  </div>
                ))}
              </div>
            </InfiniteLoopSlider>
          ))}
        </div>
      </div>
    );
  }

  // vertical
  return (
    <div className={`w-full overflow-hidden ${containerClassName}`}>
      <div
        className="flex justify-center items-center w-full mx-auto"
        style={{ gap: columnGap }}
      >
        {groups.map((items, groupIndex) => (
          <VerticalLoopSlider
            key={`col-${groupIndex}`}
            isReverse={reverseEveryOther ? groupIndex % 2 === 1 : false}
            gap={gap}
          >
            {items.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-primary-light/5 w-full flex justify-center"
              >
                <img
                  src={img.src}
                  alt={img.alt || "Collage image"}
                  className={`w-full h-auto object-cover transition-opacity duration-300 ${
                    loadedMap[`${img.src}-${idx}`] ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => markLoaded(`${img.src}-${idx}`)}
                  onError={() => markLoaded(`${img.src}-${idx}`)}
                />
              </div>
            ))}
          </VerticalLoopSlider>
        ))}
      </div>
    </div>
  );
}
