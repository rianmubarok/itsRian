import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get featured projects (first n projects)
 */
export function getFeaturedProjects() {
  // This will be imported from projects data
  return [];
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Parse month name (English or Indonesian) to 0-based month index
 */
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
    mei: 4, // Indonesian
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    agu: 7, // Indonesian
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    okt: 9, // Indonesian
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    des: 11, // Indonesian
    december: 11,
  };
  return map[m] ?? null;
}

/**
 * Calculate human readable duration between two dates as "X Year(s), Y Month(s)"
 */
export function calculateDuration(start: Date, end: Date = new Date()): string {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  // If end day is before start day, subtract one month for a closer approximation
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

/**
 * Given a period string like "Okt 2023 - Present" or "Jan 2020 - Mar 2021",
 * returns a dynamic duration string using current date when end is Present.
 */
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
