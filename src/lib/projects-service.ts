import notion, { databaseId } from "./notion";
import { Project } from "../types";

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

    return response.results.map((page: any, index: number) => {
      const properties = page.properties;

      return {
        id: index + 1, // Generate ID based on index
        title: properties.title?.title?.[0]?.plain_text || "Untitled",
        slug: properties.slug?.rich_text?.[0]?.plain_text || page.id,
        description: properties.description?.rich_text?.[0]?.plain_text || "",
        detail: properties.detail?.rich_text?.[0]?.plain_text || "",
        image:
          properties.image?.url || "https://placehold.co/600x400?text=No+Image",
        tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
        createdAt: properties.createdAt?.date?.start || page.created_time || "",
        sourceCode: properties.sourceCode?.url || undefined,
        liveProject: properties.liveProject?.url || undefined,
      };
    });
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

    const page = response.results[0] as any;
    const properties = page.properties;

    return {
      id: 1, // You might want to store this as a number property in Notion
      title: properties.title?.title?.[0]?.plain_text || "",
      slug: properties.slug?.rich_text?.[0]?.plain_text || "",
      description: properties.description?.rich_text?.[0]?.plain_text || "",
      detail: properties.detail?.rich_text?.[0]?.plain_text || "",
      image: properties.image?.url || "",
      tags: properties.tags?.multi_select?.map((tag: any) => tag.name) || [],
      createdAt: properties.createdAt?.date?.start || "",
      sourceCode: properties.sourceCode?.url || undefined,
      liveProject: properties.liveProject?.url || undefined,
    };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}
