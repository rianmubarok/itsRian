import notion, { databaseId } from "./notion";
import { Blog } from "../types";

export async function getBlogs(): Promise<Blog[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId!,
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: properties.slug?.rich_text?.[0]?.plain_text || page.id,
        title: properties.title?.title?.[0]?.plain_text || "Untitled",
        slug: properties.slug?.rich_text?.[0]?.plain_text || page.id,
        description: properties.description?.rich_text?.[0]?.plain_text || "",
        tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
        content: {
          en: properties.contentEn?.rich_text?.[0]?.plain_text || "",
          id: properties.contentId?.rich_text?.[0]?.plain_text || "",
        },
        thumbnail:
          properties.thumbnail?.url ||
          "https://placehold.co/600x400?text=No+Image",
        createdAt: properties.date?.date?.start || page.created_time || "",
        viewCount: "0", // Will be updated from Supabase
        readingTime:
          properties.readingTime?.rich_text?.[0]?.plain_text || "5 min",
      };
    });
  } catch (error) {
    console.error("Error fetching blogs from Notion:", error);
    return [];
  }
}

// Fungsi untuk mengambil seluruh block children dari Notion page, termasuk children-nya secara rekursif
export async function getPageContentBlocks(pageId: string) {
  try {
    const blocks = [];
    let cursor;
    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });
      for (const block of response.results) {
        if ("has_children" in block && block.has_children) {
          // Ambil children secara rekursif
          (block as any).children = await getPageContentBlocks(block.id);
        }
        blocks.push(block);
      }
      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);
    return blocks;
  } catch (error) {
    console.error("Error fetching page blocks from Notion:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId!,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0] as any;
    const properties = page.properties;

    // Ambil seluruh block children (konten penuh)
    const blocks = await getPageContentBlocks(page.id);

    return {
      id: properties.slug?.rich_text?.[0]?.plain_text || page.id,
      title: properties.title?.title?.[0]?.plain_text || "",
      slug: properties.slug?.rich_text?.[0]?.plain_text || "",
      description: properties.description?.rich_text?.[0]?.plain_text || "",
      tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
      content: {
        en: properties.contentEn?.rich_text?.[0]?.plain_text || "",
        id: properties.contentId?.rich_text?.[0]?.plain_text || "",
      },
      thumbnail: properties.thumbnail?.url || "",
      createdAt: properties.date?.date?.start || "",
      viewCount: "0", // Will be updated from Supabase
      readingTime:
        properties.readingTime?.rich_text?.[0]?.plain_text || "5 min",
      blocks, // tambahkan blocks di sini
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}
