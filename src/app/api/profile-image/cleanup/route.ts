import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST() {
  try {
    // Ambil semua data guestbook yang menggunakan Google profile images
    const { data: guestbookData, error: fetchError } = await supabaseAdmin
      .from("guestbook")
      .select("id, name, email, profile_pic")
      .like("profile_pic", "%googleusercontent.com%");

    if (fetchError) {
      return NextResponse.json(
        { error: "Failed to fetch guestbook data" },
        { status: 500 }
      );
    }

    const results = [];

    for (const item of guestbookData || []) {
      try {
        // Generate user ID dari email (atau gunakan ID yang ada)
        const userId =
          item.email?.replace(/[^a-zA-Z0-9]/g, "_") || `user_${item.id}`;

        // Optimize Google image URL
        const optimizedUrl = item.profile_pic.replace(/=s\d+-c/, "=s400-c");

        // Download dan simpan image baru
        const response = await fetch(optimizedUrl);
        if (!response.ok) {
          results.push({
            id: item.id,
            success: false,
            error: `Failed to download image: ${response.status}`,
          });
          continue;
        }

        const blob = await response.blob();
        const fileName = `profiles/${userId}.jpg`;

        // Upload ke Supabase Storage
        const { error: uploadError } = await supabaseAdmin.storage
          .from("profile-images")
          .upload(fileName, blob, {
            upsert: true,
            contentType: "image/jpeg",
            cacheControl: "3600",
          });

        if (uploadError) {
          results.push({
            id: item.id,
            success: false,
            error: `Upload failed: ${uploadError.message}`,
          });
          continue;
        }

        // Ambil public URL
        const { data: urlData } = supabaseAdmin.storage
          .from("profile-images")
          .getPublicUrl(fileName);

        // Update database
        const { error: updateError } = await supabaseAdmin
          .from("guestbook")
          .update({ profile_pic: urlData.publicUrl })
          .eq("id", item.id);

        if (updateError) {
          results.push({
            id: item.id,
            success: false,
            error: `Database update failed: ${updateError.message}`,
          });
        } else {
          results.push({
            id: item.id,
            success: true,
            newUrl: urlData.publicUrl,
          });
        }
      } catch (error) {
        results.push({
          id: item.id,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    return NextResponse.json({
      message: `Cleanup completed. ${successCount} successful, ${failureCount} failed.`,
      results,
    });
  } catch (error) {
    console.error("Cleanup API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
