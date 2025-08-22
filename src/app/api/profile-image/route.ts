import { NextRequest, NextResponse } from "next/server";
import {
  saveProfileImageToStorage,
  updateGuestbookProfilePic,
  getExistingProfileImage,
} from "@/lib/profile-image-service";

export async function POST(request: NextRequest) {
  try {
    const { userId, imageUrl, email } = await request.json();

    if (!userId || !imageUrl || !email) {
      return NextResponse.json(
        { error: "Missing required fields: userId, imageUrl, email" },
        { status: 400 }
      );
    }

    const existingImage = await getExistingProfileImage(userId);

    if (existingImage) {
      const updateSuccess = await updateGuestbookProfilePic(
        email,
        existingImage
      );

      if (updateSuccess) {
        return NextResponse.json({
          success: true,
          url: existingImage,
          message: "Using existing profile image",
        });
      }
    }

    const result = await saveProfileImageToStorage(userId, imageUrl);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to save profile image" },
        { status: 500 }
      );
    }

    const updateSuccess = await updateGuestbookProfilePic(email, result.url!);

    if (!updateSuccess) {
      return NextResponse.json(
        { error: "Failed to update database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      message: "Profile image saved successfully",
    });
  } catch (error) {
    console.error("Profile image API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
