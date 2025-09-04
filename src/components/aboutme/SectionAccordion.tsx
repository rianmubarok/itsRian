"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectionAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function SectionAccordion({
  title,
  children,
  defaultOpen = false,
}: SectionAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-primary-gray/20 rounded-[18px] md:rounded-[20px] bg-gray-100 dark:bg-primary-light/5 overflow-hidden">
      {/* Section Header */}
      <button
        onClick={toggleSection}
        className="w-full px-6 py-4 text-left transition-colors duration-200 flex items-center justify-between group cursor-pointer"
      >
        <h2 className="text-2xl sm:text-3xl leading-tight font-regular tracking-tight text-primary-dark dark:text-primary-light">
          {title}
        </h2>

        {/* Chevron Icon */}
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-primary-gray group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors duration-200" />
          ) : (
            <ChevronDown className="w-6 h-6 text-primary-gray group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors duration-200" />
          )}
        </div>
      </button>

      {/* Section Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-primary-gray/10">{children}</div>
        </div>
      </div>
    </div>
  );
}
