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
          return {
            ...blog,
            viewCount: "0",
          };
        }
      })
    );

    const response = NextResponse.json(blogsWithViews);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
