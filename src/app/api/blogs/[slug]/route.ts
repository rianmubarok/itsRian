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

    const userAgent = request.headers.get("user-agent") || "";
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    const url = new URL(request.url);
    const shouldIncrement = url.searchParams.get("inc") !== "0";

    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!isBot && shouldIncrement) {
      await incrementViewCount(slug);
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
