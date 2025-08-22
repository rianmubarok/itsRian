"use client";

import { useState, useEffect, useRef } from "react";
import { Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface LanguageSwitcherProps {
  currentLanguage: "en" | "id";
  onLanguageChange: (language: "en" | "id") => void;
}

export default function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "id", name: "Indonesia", flag: "🇮🇩" },
  ];

  const currentLang = languages.find((lang) => lang.code === currentLanguage);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-primary-dark dark:border-primary-light rounded-lg hover:bg-primary-dark/10 dark:hover:bg-primary-light/10 hover:border-primary-dark/50 dark:hover:border-primary-light/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-dark/20 dark:focus:ring-primary-light/20 cursor-pointer"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLang?.flag} {currentLang?.name}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
    absolute bottom-full mb-2 right-0 
    bg-primary-light dark:bg-primary-dark border border-primary-gray 
    rounded-lg z-50 min-w-[160px] animate-dropdown transition-all duration-200

    /* Mobile full-width, left aligned */
    sm:right-0 sm:w-auto w-full left-0 sm:left-auto
  "
            role="menu"
            aria-label="Language options"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onLanguageChange(language.code as "en" | "id");
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  currentLanguage === language.code
                    ? "bg-primary-dark/10 dark:bg-primary-light/10 text-primary-dark dark:text-primary-light font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                }`}
                role="menuitem"
                aria-current={
                  currentLanguage === language.code ? "true" : "false"
                }
              >
                <span className="flex items-center gap-3">
                  <span className="text-base">{language.flag}</span>
                  <span>{language.name}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
