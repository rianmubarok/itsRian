import { supabase } from "./supabase";

function normalizeSlug(raw: string): string {
  return (raw || "").trim().toLowerCase();
}

export async function getViewCount(slug: string): Promise<number> {
  try {
    const normalized = normalizeSlug(slug);

    // Check if Supabase is configured
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.warn("Supabase environment variables not configured");
      return 0;
    }

    const { data, error } = await supabase
      .from("views")
      .select("count")
      .eq("slug", normalized)
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
    const normalized = normalizeSlug(slug);
    const { error } = await supabase.rpc("increment_view_count", {
      slug_param: normalized,
    });

    if (error) {
      console.error("Error incrementing view count:", error);
      // Fallback: read current, then upsert with incremented count
      const { data: current, error: readErr } = await supabase
        .from("views")
        .select("count")
        .eq("slug", normalized)
        .single();

      if (readErr && readErr.code !== "PGRST116") {
        console.error("Fallback read error:", readErr);
        return;
      }

      const newCount = (current?.count ?? 0) + 1;

      const { error: fallbackError } = await supabase.from("views").upsert(
        { slug: normalized, count: newCount },
        {
          onConflict: "slug",
          ignoreDuplicates: false,
        }
      );

      if (fallbackError) {
        console.error("Fallback upsert error:", fallbackError);
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
