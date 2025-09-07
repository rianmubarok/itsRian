import notion, { databaseId } from "./notion";
import { Blog } from "../types";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Notion property type (minimal, for type guards)
type NotionProperty = { type: string; [key: string]: unknown };
type MultiSelectTag = { name: string };

type BlockWithChildren = Record<string, unknown> & { children?: unknown[] };

function getPlainTextFromRichText(
  property: NotionProperty | undefined
): string {
  if (
    property &&
    property.type === "rich_text" &&
    Array.isArray(property.rich_text) &&
    property.rich_text.length > 0
  ) {
    const text = property.rich_text[0] as { plain_text?: string };
    return text.plain_text || "";
  }
  return "";
}

function getPlainTextFromTitle(property: NotionProperty | undefined): string {
  if (
    property &&
    property.type === "title" &&
    Array.isArray(property.title) &&
    property.title.length > 0
  ) {
    const title = property.title[0] as { plain_text?: string };
    return title.plain_text || "";
  }
  return "";
}

function getMarkdownFromRichText(property: NotionProperty | undefined): string {
  if (
    property &&
    property.type === "rich_text" &&
    Array.isArray(property.rich_text)
  ) {
    // Convert Notion rich_text array to Markdown, preserving basic annotations
    return (property.rich_text as Array<Record<string, unknown>>)
      .map((rt) => {
        const text = rt as {
          plain_text?: string;
          text?: { content?: string; link?: { url?: string } };
          annotations?: {
            bold?: boolean;
            italic?: boolean;
            strikethrough?: boolean;
            underline?: boolean;
            code?: boolean;
          };
        };

        let content = text.text?.content || text.plain_text || "";
        if (!content) return "";

        // Apply annotations
        const anns = text.annotations || {};
        if (anns.code) content = "`" + content + "`";
        if (anns.bold) content = "**" + content + "**";
        if (anns.italic) content = "*" + content + "*";
        if (anns.strikethrough) content = "~~" + content + "~~";
        // Underline has no standard Markdown; keep as-is

        // Apply link if present (wrap formatted content)
        const url = text.text?.link?.url;
        if (url) {
          content = "[" + content + "](" + url + ")";
        }

        return content;
      })
      .join("");
  }
  return "";
}

function getPlainTextFromDate(property: NotionProperty | undefined): string {
  if (
    property &&
    property.type === "date" &&
    property.date &&
    typeof property.date === "object"
  ) {
    return (property.date as { start?: string }).start || "";
  }
  return "";
}

function getPlainTextFromUrl(property: NotionProperty | undefined): string {
  if (property && property.type === "url" && typeof property.url === "string") {
    return property.url;
  }
  return "";
}

function getPlainTextFromMultiSelect(
  property: NotionProperty | undefined
): string[] {
  if (
    property &&
    property.type === "multi_select" &&
    Array.isArray(property.multi_select) &&
    property.multi_select.length > 0
  ) {
    return (property.multi_select as MultiSelectTag[]).map((tag) => tag.name);
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
      const properties = (page as PageObjectResponse).properties as Record<
        string,
        NotionProperty
      >;
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
          en: getMarkdownFromRichText(properties.contentEn),
          id: getMarkdownFromRichText(properties.contentId),
        },
        thumbnail:
          getPlainTextFromUrl(properties.thumbnail) ||
          "https://placehold.co/600x400?text=No+Image",
        ogImage:
          getPlainTextFromUrl(
            (properties as Record<string, NotionProperty>)["ogImage"]
          ) || undefined,
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

export async function getPageContentBlocks(pageId: string) {
  try {
    const blocks: BlockWithChildren[] = [];
    let cursor: string | undefined;
    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });
      for (const block of response.results) {
        if (
          "has_children" in block &&
          (block as { has_children: boolean }).has_children
        ) {
          (block as BlockWithChildren).children = await getPageContentBlocks(
            (block as { id: string }).id
          );
        }
        blocks.push(block as BlockWithChildren);
      }
      cursor = response.has_more ? (response.next_cursor as string) : undefined;
    } while (cursor);
    return blocks;
  } catch (error) {
    console.error("Error fetching page blocks from Notion:", error);
    return [];
  }
}

// Convert Notion blocks to markdown with proper code block support
export function blocksToMarkdown(blocks: BlockWithChildren[]): string {
  return blocks
    .map((block) => {
      const blockType = (block as Record<string, unknown>).type;
      const blockData = (block as Record<string, unknown>)[blockType as string];

      switch (blockType) {
        case "paragraph":
          return richTextToMarkdown(
            ((blockData as Record<string, unknown>)?.rich_text as Record<
              string,
              unknown
            >[]) || []
          );

        case "heading_1":
          return `# ${richTextToMarkdown(
            ((blockData as Record<string, unknown>)?.rich_text as Record<
              string,
              unknown
            >[]) || []
          )}`;

        case "heading_2":
          return `## ${richTextToMarkdown(
            ((blockData as Record<string, unknown>)?.rich_text as Record<
              string,
              unknown
            >[]) || []
          )}`;

        case "heading_3":
          return `### ${richTextToMarkdown(
            ((blockData as Record<string, unknown>)?.rich_text as Record<
              string,
              unknown
            >[]) || []
          )}`;

        case "bulleted_list_item":
          return `- ${richTextToMarkdown(
            ((blockData as Record<string, unknown>)?.rich_text as Record<
              string,
              unknown
            >[]) || []
          )}`;

        case "numbered_list_item":
          return `1. ${richTextToMarkdown(
            ((blockData as Record<string, unknown>)?.rich_text as Record<
              string,
              unknown
            >[]) || []
          )}`;

        case "code":
          const blockDataTyped = blockData as Record<string, unknown>;
          const language = blockDataTyped?.language || "text";
          const code = richTextToMarkdown(
            (blockDataTyped?.rich_text as Record<string, unknown>[]) || []
          );
          return `\`\`\`${language}\n${code}\n\`\`\``;

        case "quote":
          return `> ${richTextToMarkdown(
            ((blockData as Record<string, unknown>)?.rich_text as Record<
              string,
              unknown
            >[]) || []
          )}`;

        case "divider":
          return "---";

        case "image":
          const blockDataImage = blockData as Record<string, unknown>;
          const imageUrl =
            (blockDataImage?.file as Record<string, unknown>)?.url ||
            (blockDataImage?.external as Record<string, unknown>)?.url;
          const caption = richTextToMarkdown(
            (blockDataImage?.caption as Record<string, unknown>[]) || []
          );
          return `![${caption}](${imageUrl})`;

        default:
          // Try to handle any block with rich_text
          const blockDataDefault = blockData as Record<string, unknown>;
          if (blockDataDefault?.rich_text) {
            return richTextToMarkdown(
              blockDataDefault.rich_text as Record<string, unknown>[]
            );
          }
          return "";
      }
    })
    .filter((content) => content.trim() !== "")
    .join("\n\n");
}

// Helper function to convert rich text to markdown
function richTextToMarkdown(richText: Record<string, unknown>[]): string {
  return richText
    .map((rt) => {
      let content = (rt.plain_text as string) || "";
      if (!content) return "";

      // Apply annotations
      const anns = (rt.annotations as Record<string, boolean>) || {};
      if (anns.code) content = `\`${content}\``;
      if (anns.bold) content = `**${content}**`;
      if (anns.italic) content = `*${content}*`;
      if (anns.strikethrough) content = `~~${content}~~`;

      // Apply link if present
      const url = rt.href as string;
      if (url) {
        content = `[${content}](${url})`;
      }

      return content;
    })
    .join("");
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
    const properties = page.properties as Record<string, NotionProperty>;

    const blocks = await getPageContentBlocks(page.id);

    // Use blocks for main content, fallback to properties if blocks are empty
    const blockContent = blocksToMarkdown(blocks);
    const fallbackContent = {
      en: getMarkdownFromRichText(properties.contentEn),
      id: getMarkdownFromRichText(properties.contentId),
    };

    return {
      id: getPlainTextFromRichText(properties.slug) || page.id,
      title: getPlainTextFromTitle(properties.title) || "",
      slug: getPlainTextFromRichText(properties.slug) || "",
      description: getPlainTextFromRichText(properties.description) || "",
      tags: getPlainTextFromMultiSelect(properties.tags),
      content: {
        en: blockContent || fallbackContent.en,
        id: blockContent || fallbackContent.id,
      },
      thumbnail: getPlainTextFromUrl(properties.thumbnail) || "",
      ogImage:
        getPlainTextFromUrl(
          (properties as Record<string, NotionProperty>)["ogImage"]
        ) || undefined,
      createdAt: getPlainTextFromDate(properties.date) || "",
      viewCount: "0", // Will be updated from Supabase
      readingTime: getPlainTextFromRichText(properties.readingTime) || "5 min",
      blocks,
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}
