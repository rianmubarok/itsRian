import { NextResponse } from "next/server";
import { getBlogs } from "../../../lib/notion-service";
import { getViewCount, formatViewCount } from "../../../lib/views-service";

export async function GET() {
  try {
    const blogs = await getBlogs();

    const blogsWithViews = await Promise.all(
      blogs.map(async (blog) => {
        try {
          const viewCount = await getViewCount(blog.slug);
          return {
            ...blog,
            viewCount: formatViewCount(viewCount),
          };
        } catch (error) {
          console.error(`Error getting view count for ${blog.slug}:`, error);
          // Return a more user-friendly fallback instead of "0"
          return {
            ...blog,
            viewCount: "—", // Use dash instead of 0 to indicate no data
          };
        }
      })
    );

    const response = NextResponse.json(blogsWithViews);
    // No cache to ensure fresh data
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
