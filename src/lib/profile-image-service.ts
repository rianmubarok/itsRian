import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client dengan service role untuk upload file
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface ProfileImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Download dan simpan Google profile image ke Supabase Storage
 */
export async function saveProfileImageToStorage(
  userId: string,
  imageUrl: string
): Promise<ProfileImageResult> {
  try {
    // Optimize image URL berdasarkan provider
    const optimizedUrl = optimizeImageUrl(imageUrl);

    // Download image dengan resolusi tinggi
    const response = await fetch(optimizedUrl);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const blob = await response.blob();

    // Generate nama file yang unik
    const fileExtension = getFileExtension(imageUrl) || "jpg";
    const fileName = `profiles/${userId}.${fileExtension}`;

    // Upload ke Supabase Storage dengan metadata yang lebih baik
    const { error: uploadError } = await supabaseAdmin.storage
      .from("profile-images")
      .upload(fileName, blob, {
        upsert: true, // Overwrite jika sudah ada
        contentType: blob.type || "image/jpeg",
        cacheControl: "3600", // Cache selama 1 jam
        metadata: {
          userId: userId,
          originalUrl: imageUrl,
          uploadedAt: new Date().toISOString(),
        },
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Ambil public URL dengan parameter untuk kualitas tinggi
    const { data: urlData } = supabaseAdmin.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error("Error saving profile image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Optimize image URL untuk resolusi tinggi berdasarkan provider
 */
function optimizeImageUrl(url: string): string {
  if (url.includes("googleusercontent.com")) {
    return optimizeGoogleImageUrl(url);
  } else if (url.includes("avatars.githubusercontent.com")) {
    return optimizeGitHubImageUrl(url);
  }
  return url;
}

/**
 * Optimize Google image URL untuk resolusi tinggi
 */
function optimizeGoogleImageUrl(url: string): string {
  if (!url.includes("googleusercontent.com")) {
    return url;
  }

  // Hapus parameter size yang ada
  let optimizedUrl = url.replace(/=s\d+-c/, "");

  // Tambahkan parameter untuk resolusi tinggi (400x400)
  optimizedUrl = optimizedUrl.replace(/=s\d+/, "=s400");

  // Tambahkan parameter untuk kualitas tinggi
  if (!optimizedUrl.includes("=s400")) {
    optimizedUrl += "=s400-c";
  }

  return optimizedUrl;
}

/**
 * Optimize GitHub image URL untuk resolusi tinggi
 */
function optimizeGitHubImageUrl(url: string): string {
  if (!url.includes("avatars.githubusercontent.com")) {
    return url;
  }

  // GitHub avatar URLs bisa dioptimize dengan menambahkan parameter size
  // Default GitHub avatar size adalah 40px, kita ubah ke 400px untuk kualitas lebih baik
  if (url.includes("?v=")) {
    // Jika sudah ada parameter, tambahkan size
    return url.replace("?v=", "?size=400&v=");
  } else {
    // Jika belum ada parameter, tambahkan size
    return `${url}?size=400`;
  }
}

/**
 * Update profile_pic di database guestbook
 */
export async function updateGuestbookProfilePic(
  email: string,
  profilePicUrl: string
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from("guestbook")
      .update({ profile_pic: profilePicUrl })
      .eq("email", email);

    if (error) {
      console.error("Database update error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating database:", error);
    return false;
  }
}

/**
 * Cek apakah user sudah punya profile image di storage
 */
export async function getExistingProfileImage(
  userId: string
): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from("profile-images")
      .list("profiles", {
        search: `${userId}.`,
      });

    if (error || !data || data.length === 0) {
      return null;
    }

    // Ambil file pertama yang ditemukan
    const fileName = data[0].name;
    const { data: urlData } = supabaseAdmin.storage
      .from("profile-images")
      .getPublicUrl(`profiles/${fileName}`);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error checking existing image:", error);
    return null;
  }
}

/**
 * Helper function untuk mendapatkan extension file
 */
function getFileExtension(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = pathname.split(".").pop();

    // Validasi extension
    const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    if (extension && validExtensions.includes(extension.toLowerCase())) {
      return extension.toLowerCase();
    }

    return null;
  } catch {
    return null;
  }
}
