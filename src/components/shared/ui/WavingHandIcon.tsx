import Image from "next/image";

interface WavingHandIconProps {
  className?: string;
  size?: number;
}

export default function WavingHandIcon({
  className = "",
  size = 24,
}: WavingHandIconProps) {
  return (
    <Image
      src="/icons/waving_hand_color_default.svg"
      alt="waving hand"
      width={size}
      height={size}
      className={`inline-block ${className}`}
    />
  );
}
