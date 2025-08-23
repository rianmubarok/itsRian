type NotionProperty = { type: string; [key: string]: unknown };
type MultiSelectTag = { name: string };

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

        const anns = text.annotations || {};
        if (anns.code) content = "`" + content + "`";
        if (anns.bold) content = "**" + content + "**";
        if (anns.italic) content = "*" + content + "*";
        if (anns.strikethrough) content = "~~" + content + "~~";

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

import notion from "./notion";
import { Project } from "../types";
import { getPageContentBlocks, blocksToMarkdown } from "./notion-service";

const projectsDatabaseId = process.env.NOTION_PROJECTS_DATABASE_ID;

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await notion.databases.query({
      database_id: projectsDatabaseId!,
      sorts: [
        {
          property: "createdAt",
          direction: "descending",
        },
      ],
    });

    return response.results.map(
      (page: Record<string, unknown>, index: number) => {
        const properties = page.properties as Record<string, NotionProperty>;
        return {
          id: index + 1, // Generate ID based on index
          title: getPlainTextFromTitle(properties.title) || "Untitled",
          slug:
            getPlainTextFromRichText(properties.slug) ||
            (page as { id: string }).id,
          description: getMarkdownFromRichText(properties.description) || "",
          content: getMarkdownFromRichText(properties.content) || "",
          thumbnail:
            getPlainTextFromUrl(properties.thumbnail) ||
            "https://placehold.co/600x400?text=No+Image",
          tags: getPlainTextFromMultiSelect(properties.tags),
          createdAt:
            getPlainTextFromDate(properties.createdAt) ||
            (page as { created_time?: string }).created_time ||
            "",
          sourceCode: getPlainTextFromUrl(properties.sourceCode) || undefined,
          liveProject: getPlainTextFromUrl(properties.liveProject) || undefined,
        };
      }
    );
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await notion.databases.query({
      database_id: projectsDatabaseId!,
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

    const page = response.results[0] as Record<string, unknown>;
    const properties = page.properties as Record<string, NotionProperty>;

    // Get blocks for detailed content
    const blocks = await getPageContentBlocks((page as { id: string }).id);
    const blockContent = blocksToMarkdown(blocks);

    return {
      id: 1, // You might want to store this as a number property in Notion
      title: getPlainTextFromTitle(properties.title) || "",
      slug: getPlainTextFromRichText(properties.slug) || "",
      description: getMarkdownFromRichText(properties.description) || "",
      content:
        blockContent || getMarkdownFromRichText(properties.content) || "",
      thumbnail: getPlainTextFromUrl(properties.thumbnail) || "",
      tags: getPlainTextFromMultiSelect(properties.tags),
      createdAt: getPlainTextFromDate(properties.createdAt) || "",
      sourceCode: getPlainTextFromUrl(properties.sourceCode) || undefined,
      liveProject: getPlainTextFromUrl(properties.liveProject) || undefined,
    };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}
