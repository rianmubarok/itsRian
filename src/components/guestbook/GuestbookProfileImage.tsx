import React from "react";

type GuestbookProfileImageProps = {
  name: string;
  profilePic?: string;
};

const getProfileImageUrl = (name: string, profilePic?: string) => {
  if (profilePic && profilePic.startsWith("http")) {
    if (
      profilePic.includes("supabase.co") &&
      !profilePic.includes("transform")
    ) {
      return `${profilePic}?transform=w_200,h_200,q_90`;
    }
    return profilePic;
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&color=fff&size=200&bold=true&format=webp`;
};

const GuestbookProfileImage: React.FC<GuestbookProfileImageProps> = ({
  name,
  profilePic,
}) => {
  const [src, setSrc] = React.useState(getProfileImageUrl(name, profilePic));
  return (
    <img
      src={src}
      alt={`${name}'s profile`}
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0 bg-gray-100 dark:bg-white/50"
      style={{ imageRendering: "crisp-edges" as const }}
      onError={() =>
        setSrc(
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random&color=fff&size=200&bold=true&format=webp`
        )
      }
    />
  );
};

export default GuestbookProfileImage;
