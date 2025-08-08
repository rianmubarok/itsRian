import { NextResponse } from "next/server";
import { getBlogBySlug } from "../../../../lib/notion-service";
import {
  getViewCount,
  incrementViewCount,
  formatViewCount,
} from "../../../../lib/views-service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get blog data
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment view count
    await incrementViewCount(slug);

    // Get updated view count
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
