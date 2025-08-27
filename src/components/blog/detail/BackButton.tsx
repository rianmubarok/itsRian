import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  hasMounted: boolean;
}

export default function BackButton({ hasMounted }: BackButtonProps) {
  return (
    <Link
      href="/blog"
      className={`group text-base sm:text-lg font-noto-serif-display italic inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 mb-6 sm:mb-8 ${
        hasMounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
      }`}
    >
      <ArrowLeft className="w-6 h-6 stroke-1" />
      Back to blog
    </Link>
  );
}
