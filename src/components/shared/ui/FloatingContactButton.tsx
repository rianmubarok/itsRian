"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const isScrollingUp = scrollY < prevScrollY;
      const shouldShow = isScrollingUp;
      setIsVisible(shouldShow);
      setPrevScrollY(scrollY);
    };
    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-16 opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-6 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-primary-dark dark:text-primary-light hover:bg-white/90 dark:hover:bg-white/20 hover:border-white/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
      >
        <span className="font-regular text-lg">Let&apos;s talk</span>

        <ArrowUpRight className="w-4 h-4 duration-300" />
      </Link>
    </div>
  );
}
