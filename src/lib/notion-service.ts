import notion, { databaseId } from "./notion";
import { Blog } from "../types";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function getPlainTextFromTitle(property: any): string {
  if (property && property.type === "title" && property.title.length > 0) {
    return property.title[0].plain_text;
  }
  return "";
}

function getPlainTextFromRichText(property: any): string {
  if (
    property &&
    property.type === "rich_text" &&
    property.rich_text.length > 0
  ) {
    return property.rich_text[0].plain_text;
  }
  return "";
}

function getPlainTextFromDate(property: any): string {
  if (property && property.type === "date" && property.date) {
    return property.date.start;
  }
  return "";
}

function getPlainTextFromUrl(property: any): string {
  if (property && property.type === "url" && property.url) {
    return property.url;
  }
  return "";
}

function getPlainTextFromMultiSelect(property: any): string[] {
  if (
    property &&
    property.type === "multi_select" &&
    property.multi_select.length > 0
  ) {
    return property.multi_select.map((tag: any) => tag.name);
  }
  return [];
}

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

    return response.results.map((page) => {
      const properties = (page as PageObjectResponse).properties;
      return {
        id:
          getPlainTextFromRichText(properties.slug) ||
          (page as PageObjectResponse).id,
        title: getPlainTextFromTitle(properties.title) || "Untitled",
        slug:
          getPlainTextFromRichText(properties.slug) ||
          (page as PageObjectResponse).id,
        description: getPlainTextFromRichText(properties.description) || "",
        tags: getPlainTextFromMultiSelect(properties.tags),
        content: {
          en: getPlainTextFromRichText(properties.contentEn),
          id: getPlainTextFromRichText(properties.contentId),
        },
        thumbnail:
          getPlainTextFromUrl(properties.thumbnail) ||
          "https://placehold.co/600x400?text=No+Image",
        createdAt:
          getPlainTextFromDate(properties.date) ||
          (page as PageObjectResponse).created_time ||
          "",
        viewCount: "0", // Will be updated from Supabase
        readingTime:
          getPlainTextFromRichText(properties.readingTime) || "5 min",
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

    const page = response.results[0] as PageObjectResponse;
    const properties = page.properties;

    // Ambil seluruh block children (konten penuh)
    const blocks = await getPageContentBlocks(page.id);

    return {
      id: getPlainTextFromRichText(properties.slug) || page.id,
      title: getPlainTextFromTitle(properties.title) || "",
      slug: getPlainTextFromRichText(properties.slug) || "",
      description: getPlainTextFromRichText(properties.description) || "",
      tags: getPlainTextFromMultiSelect(properties.tags),
      content: {
        en: getPlainTextFromRichText(properties.contentEn),
        id: getPlainTextFromRichText(properties.contentId),
      },
      thumbnail: getPlainTextFromUrl(properties.thumbnail) || "",
      createdAt: getPlainTextFromDate(properties.date) || "",
      viewCount: "0", // Will be updated from Supabase
      readingTime: getPlainTextFromRichText(properties.readingTime) || "5 min",
      blocks, // tambahkan blocks di sini
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}
