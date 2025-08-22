import { supabase } from "./supabase";

export async function getViewCount(slug: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("views")
      .select("count")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching view count:", error);
      return 0;
    }

    return data?.count || 0;
  } catch (error) {
    console.error("Error fetching view count:", error);
    return 0;
  }
}

export async function incrementViewCount(slug: string): Promise<void> {
  try {
    const { error } = await supabase.rpc("increment_view_count", {
      slug_param: slug
    });

    if (error) {
      console.error("Error incrementing view count:", error);
      
      const { error: fallbackError } = await supabase
        .from("views")
        .upsert(
          { slug, count: 1 },
          { 
            onConflict: "slug",
            ignoreDuplicates: false 
          }
        );
      
      if (fallbackError) {
        console.error("Fallback error:", fallbackError);
      }
    }
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
}

export function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}
