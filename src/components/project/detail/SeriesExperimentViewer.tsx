"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MarkdownRenderer } from "@/components/shared/ui";
import { Project } from "@/types";
import MarkdownContentLoader from "@/components/shared/ui/MarkdownContentLoader";

interface PartItem {
  part: number;
  title: string;
  description: string;
  fileName: string;
}

interface Manifest {
  title: string;
  description: string;
  totalParts: number;
  parts: PartItem[];
}

interface SeriesExperimentViewerProps {
  project: Project;
  hasMounted: boolean;
}

export default function SeriesExperimentViewer({
  project,
  hasMounted,
}: SeriesExperimentViewerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [currentPart, setCurrentPart] = useState<number | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Sync current part from searchParams query e.g. ?part=3
  useEffect(() => {
    const partQuery = searchParams.get("part");
    if (partQuery) {
      const parsed = parseInt(partQuery, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setCurrentPart(parsed);
        return;
      }
    }
    setCurrentPart(null);
  }, [searchParams]);

  // Fetch Manifest
  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const manifestUrl =
          project.seriesManifestUrl || `/content/${project.slug}/manifest.json`;
        const res = await fetch(manifestUrl);
        if (!res.ok) throw new Error("Failed to load series manifest");
        const data: Manifest = await res.json();
        setManifest(data);
      } catch (err) {
        console.error("Error fetching manifest:", err);
      }
    };

    fetchManifest();
  }, [project]);

  // Fetch Markdown for Current Part
  useEffect(() => {
    if (currentPart === null) {
      setMarkdownContent("");
      setIsLoading(false);
      return;
    }

    const fetchPartContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const filePath = `/content/${project.slug}/${currentPart}.md`;
        const res = await fetch(filePath);
        if (!res.ok) {
          throw new Error(`Failed to load Chapter ${currentPart}`);
        }
        const text = await res.text();
        setMarkdownContent(text);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load chapter content"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartContent();
  }, [project.slug, currentPart]);

  const handleSelectPart = (partNumber: number) => {
    setCurrentPart(partNumber);
    setIsDropdownOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.set("part", partNumber.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleBackToOverview = () => {
    setCurrentPart(null);
    setIsDropdownOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("part");
    const newQuery = params.toString();
    const newPath = newQuery ? `?${newQuery}` : window.location.pathname;
    router.push(newPath, { scroll: false });
  };

  const activePartInfo = manifest?.parts.find((p) => p.part === currentPart);

  return (
    <div
      className={`transition-all duration-700 ease-out delay-500 ${
        hasMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* ─── TABLE OF CONTENTS SIMPLE LIST VIEW ─── */}
      {currentPart === null ? (
        <div className="divide-y divide-primary-gray/20 border-y border-primary-gray/20 mb-16">
          {manifest?.parts.map((p) => {
            const formattedNum = String(p.part).padStart(2, "0");
            return (
              <div
                key={p.part}
                onClick={() => handleSelectPart(p.part)}
                className="group cursor-pointer py-4 sm:py-5 px-2 hover:bg-gray-100/50 dark:hover:bg-white/5 transition-colors duration-200 flex items-baseline gap-4 sm:gap-6"
              >
                {/* Angka */}
                <span className="text-base sm:text-lg font-mono font-medium text-primary-gray shrink-0 w-8">
                  {formattedNum}
                </span>

                {/* Judul & Sub Judul */}
                <div className="space-y-1">
                  <h3 className="tracking-tight text-lg sm:text-xl font-semibold text-primary-dark dark:text-primary-light group-hover:text-primary-gray transition-colors">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="text-sm text-primary-gray dark:text-gray-400 line-clamp-1">
                      {p.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─── CHAPTER READER VIEW ─── */
        <>
          {/* Main Content Area */}
          <article className="prose text-base tracking-normal text-primary-dark dark:text-primary-light max-w-none mb-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownContentLoader
                isLoading={isLoading}
                error={error}
                isFromUrl={true}
              />
              {!isLoading && markdownContent && (
                <div className="animate-fadein">
                  <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
                </div>
              )}
            </div>
          </article>

          {/* Chapter Pagination Footer */}
          {manifest && (
            <div className="mt-12 pt-8 border-t border-primary-gray/20 flex items-center justify-between gap-4">
              <button
                onClick={() => handleSelectPart(currentPart - 1)}
                disabled={currentPart <= 1}
                className={`group font-fraunces italic inline-flex items-center gap-2 text-base transition-all ${
                  currentPart <= 1
                    ? "opacity-30 cursor-not-allowed text-primary-gray"
                    : "cursor-pointer text-primary-dark dark:text-primary-light hover:gap-3"
                }`}
              >
                <ArrowLeft className="w-5 h-5 stroke-1" />
                <span>Previous Chapter</span>
              </button>

              <button
                onClick={() => handleSelectPart(currentPart + 1)}
                disabled={currentPart >= manifest.totalParts}
                className={`group font-fraunces italic inline-flex items-center gap-2 text-base transition-all ${
                  currentPart >= manifest.totalParts
                    ? "opacity-30 cursor-not-allowed text-primary-gray"
                    : "cursor-pointer text-primary-dark dark:text-primary-light hover:gap-3"
                }`}
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-5 h-5 stroke-1" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
