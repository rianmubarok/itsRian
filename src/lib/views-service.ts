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
    // Try to update existing record
    const { error: updateError } = await supabase
      .from("views")
      .update({ count: supabase.rpc("increment") })
      .eq("slug", slug);

    // If no record exists, create one
    if (updateError && updateError.code === "PGRST116") {
      const { error: insertError } = await supabase
        .from("views")
        .insert({ slug, count: 1 });

      if (insertError) {
        console.error("Error creating view count:", insertError);
      }
    } else if (updateError) {
      console.error("Error updating view count:", updateError);
    }
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
}

export function formatViewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}
