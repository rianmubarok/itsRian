import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  hasMounted: boolean;
  href?: string;
  label?: string;
}

export default function BackButton({
  hasMounted,
  href = "/blog",
  label = "Back to blog",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`group text-base sm:text-lg font-noto-serif-display italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 mb-6 sm:mb-8 ${
        hasMounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
      }`}
    >
      <ArrowLeft className="w-6 h-6 stroke-1" />
      {label}
    </Link>
  );
}
