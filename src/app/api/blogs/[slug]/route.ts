import { NextResponse } from "next/server";
import { getBlogBySlug } from "../../../../lib/notion-service";
import {
  getViewCount,
  incrementViewCount,
  formatViewCount,
} from "../../../../lib/views-service";

// Simple in-memory cache to prevent rapid successive increments
const incrementCache = new Map<string, number>();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const userAgent = request.headers.get("user-agent") || "";
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    const url = new URL(request.url);
    const shouldIncrement = url.searchParams.get("inc");

    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!isBot && shouldIncrement !== "0") {
      // Check if we've recently incremented this slug
      const now = Date.now();
      const lastIncrement = incrementCache.get(slug) || 0;
      const timeSinceLastIncrement = now - lastIncrement;

      // Only increment if it's been more than 5 seconds since last increment
      if (timeSinceLastIncrement > 5000) {
        await incrementViewCount(slug);
        incrementCache.set(slug, now);

        // Clean up old entries (older than 1 hour)
        for (const [key, timestamp] of incrementCache.entries()) {
          if (now - timestamp > 3600000) {
            incrementCache.delete(key);
          }
        }
      }
    }

    const viewCount = await getViewCount(slug);

    const blogWithViews = {
      ...blog,
      viewCount: formatViewCount(viewCount),
    };

    return NextResponse.json(blogWithViews);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
