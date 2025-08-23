import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getFeaturedProjects() {
  return [];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function parseMonthName(monthLike: string): number | null {
  const m = monthLike.trim().toLowerCase();
  const map: Record<string, number> = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    mei: 4, // May in Indonesian
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    agu: 7, // August in Indonesian
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    okt: 9, // October in Indonesian
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    des: 11, // December in Indonesian
    december: 11,
  };
  return map[m] ?? null;
}

export function calculateDuration(start: Date, end: Date = new Date()): string {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) {
    months -= 1;
  }
  if (months < 0) months = 0;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} Year${years > 1 ? "s" : ""}`);
  if (remainingMonths > 0 || parts.length === 0) {
    parts.push(`${remainingMonths} Month${remainingMonths !== 1 ? "s" : ""}`);
  }
  return parts.join(", ");
}

export function calculateDurationFromPeriod(period: string): string {
  // Expected formats:
  //  - "Okt 2023 - Present"
  //  - "Oct 2023 - Present"
  //  - "Jan 2020 - Mar 2021"
  const [rawStart, rawEnd] = period.split("-").map((s) => s.trim());
  if (!rawStart) return "";

  const [startMonthStr, startYearStr] = rawStart.split(/\s+/);
  const startMonth = startMonthStr ? parseMonthName(startMonthStr) : null;
  const startYear = startYearStr ? parseInt(startYearStr, 10) : NaN;
  if (startMonth === null || Number.isNaN(startYear)) return "";

  const startDate = new Date(startYear, startMonth, 1);

  let endDate: Date | undefined;
  if (!rawEnd || /present/i.test(rawEnd)) {
    endDate = new Date();
  } else {
    const [endMonthStr, endYearStr] = rawEnd.split(/\s+/);
    const endMonth = endMonthStr ? parseMonthName(endMonthStr) : null;
    const endYear = endYearStr ? parseInt(endYearStr, 10) : NaN;
    if (endMonth !== null && !Number.isNaN(endYear)) {
      endDate = new Date(endYear, endMonth, 1);
    }
  }

  return calculateDuration(startDate, endDate);
}

/**
 * Fetches markdown content from a URL (e.g., Supabase storage)
 * @param url - The URL to fetch markdown content from
 * @returns Promise<string> - The markdown content
 */
export async function fetchMarkdownFromUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch markdown: ${response.status} ${response.statusText}`
      );
    }
    return await response.text();
  } catch (error) {
    // Error fetching markdown from URL - re-throwing for caller to handle
    throw error;
  }
}

/**
 * Checks if a string is a valid URL
 * @param str - The string to check
 * @returns boolean - True if it's a valid URL
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the filename from a URL
 * @param url - The URL to extract filename from
 * @returns string - The filename or empty string if not found
 */
export function getFilenameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split("/").pop();
    return filename || "";
  } catch {
    return "";
  }
}

/**
 * Determines if content should be fetched from URL or used as-is
 * @param content - The content string
 * @returns boolean - True if content should be fetched from URL
 */
export function shouldFetchFromUrl(content: string): boolean {
  if (!content || typeof content !== "string") return false;

  try {
    const url = new URL(content);
    // Check if it's a valid URL and contains markdown file or is from Supabase
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      (content.includes("supabase.co") ||
        content.includes(".md") ||
        content.includes("markdown-content"))
    );
  } catch {
    return false;
  }
}
