import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface ProfileImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function saveProfileImageToStorage(
  userId: string,
  imageUrl: string
): Promise<ProfileImageResult> {
  try {
    const optimizedUrl = optimizeImageUrl(imageUrl);

    const response = await fetch(optimizedUrl);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const blob = await response.blob();

    const fileExtension = getFileExtension(imageUrl) || "jpg";
    const fileName = `profiles/${userId}.${fileExtension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("profile-images")
      .upload(fileName, blob, {
        upsert: true,
        contentType: blob.type || "image/jpeg",
        cacheControl: "3600",
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

function optimizeImageUrl(url: string): string {
  if (url.includes("googleusercontent.com")) {
    return optimizeGoogleImageUrl(url);
  } else if (url.includes("avatars.githubusercontent.com")) {
    return optimizeGitHubImageUrl(url);
  }
  return url;
}

function optimizeGoogleImageUrl(url: string): string {
  if (!url.includes("googleusercontent.com")) {
    return url;
  }

  let optimizedUrl = url.replace(/=s\d+-c/, "");

  optimizedUrl = optimizedUrl.replace(/=s\d+/, "=s400");

  if (!optimizedUrl.includes("=s400")) {
    optimizedUrl += "=s400-c";
  }

  return optimizedUrl;
}

function optimizeGitHubImageUrl(url: string): string {
  if (!url.includes("avatars.githubusercontent.com")) {
    return url;
  }

  if (url.includes("?v=")) {
    return url.replace("?v=", "?size=400&v=");
  } else {
    return `${url}?size=400`;
  }
}

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

function getFileExtension(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = pathname.split(".").pop();

    const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    if (extension && validExtensions.includes(extension.toLowerCase())) {
      return extension.toLowerCase();
    }

    return null;
  } catch {
    return null;
  }
}
