"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="cursor-pointer p-2 text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200">
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer p-2 text-primary-dark dark:text-primary-light transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <AnimatedSunMoon isDarkMode={isDark} />
    </button>
  );
}

interface AnimatedSunMoonProps {
  isDarkMode: boolean;
}

function AnimatedSunMoon({ isDarkMode }: AnimatedSunMoonProps) {
  const maskId = useId().replace(":", "");

  const properties = useMemo(
    () => ({
      dark: {
        r: 9,
        rotate: 40,
        cx: 12,
        cy: 4,
        raysOpacity: 0,
      },
      light: {
        r: 5,
        rotate: 90,
        cx: 30,
        cy: 0,
        raysOpacity: 1,
      },
      transition: {
        type: "spring" as const,
        mass: 0.8,
        stiffness: 250,
        damping: 22,
      },
    }),
    []
  );

  const target = isDarkMode ? properties.dark : properties.light;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: target.rotate }}
      transition={properties.transition}
      style={{ display: "block" }}
    >
      <mask id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <motion.circle
          r="9"
          fill="black"
          animate={{ cx: target.cx as number, cy: target.cy as number }}
          transition={properties.transition}
        />
      </mask>

      <motion.circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask={`url(#${maskId})`}
        animate={{ r: target.r as number }}
        transition={properties.transition}
      />

      <motion.g
        stroke="currentColor"
        animate={{ opacity: target.raysOpacity as number }}
        transition={properties.transition}
      >
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </motion.g>
    </motion.svg>
  );
}
