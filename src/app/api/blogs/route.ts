import { NextResponse } from "next/server";
import { getBlogs } from "../../../lib/notion-service";
import { getViewCount, formatViewCount } from "../../../lib/views-service";

export async function GET() {
  try {
    const blogs = await getBlogs();

    // Get view counts for all blogs
    const blogsWithViews = await Promise.all(
      blogs.map(async (blog) => {
        const viewCount = await getViewCount(blog.slug);
        return {
          ...blog,
          viewCount: formatViewCount(viewCount),
        };
      })
    );

    return NextResponse.json(blogsWithViews);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
