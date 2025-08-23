"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@/hooks";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const { copied, copy, reset } = useCopyToClipboard();
  const [language, setLanguage] = useState<string>("");
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (className) {
      const langMatch = className.match(/language-(\w+)/);
      if (langMatch) {
        setLanguage(langMatch[1]);
      }
    }
  }, [className]);

  useEffect(() => {
    let cancelled = false;
    const highlight = async () => {
      try {
        const Prism = (await import("prismjs")).default;
        await import("prismjs/components/prism-markup");
        await import("prismjs/components/prism-clike");
        await import("prismjs/components/prism-javascript");
        await import("prismjs/components/prism-typescript");
        await import("prismjs/components/prism-jsx");
        await import("prismjs/components/prism-tsx");
        await import("prismjs/components/prism-bash");
        await import("prismjs/components/prism-json");
        await import("prismjs/components/prism-css");
        await import("prismjs/components/prism-scss");
        await import("prismjs/components/prism-yaml");
        await import("prismjs/components/prism-markdown");
        await import("prismjs/components/prism-sql");
        await import("prismjs/components/prism-docker");
        await import("prismjs/components/prism-git");
        if (!cancelled && codeRef.current) {
          Prism.highlightElement(codeRef.current);
        }
      } catch {}
    };
    highlight();
    return () => {
      cancelled = true;
    };
  }, [children, className]);

  const handleCopy = async () => {
    const success = await copy(children);
    if (success) {
      setTimeout(() => reset(), 2000);
    }
  };

  const getLanguageLabel = (lang: string) => {
    const languageMap: Record<string, string> = {
      js: "JavaScript",
      jsx: "JSX",
      ts: "TypeScript",
      tsx: "TSX",
      bash: "Bash",
      sh: "Shell",
      zsh: "Zsh",
      json: "JSON",
      css: "CSS",
      scss: "SCSS",
      sass: "Sass",
      html: "HTML",
      md: "Markdown",
      yaml: "YAML",
      yml: "YAML",
      docker: "Docker",
      git: "Git",
      sql: "SQL",
    };
    return languageMap[lang] || lang.toUpperCase();
  };

  return (
    <div className="relative group my-6 w-full max-w-full bg-[#1f29370f] dark:bg-[#9ca3af1f] p-4 rounded-xl border border-[#7379841f] dark:border-primary-gray">
      <div className="flex items-center justify-between rounded-t-lg">
        <span className="text-[11px] font-medium tracking-wide uppercase">
          {getLanguageLabel(language)}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px]
                     rounded-md bg-black/5 hover:bg-black/10 text-gray-700
                     dark:bg-white/10 dark:hover:bg-white/15 dark:text-gray-200
                     transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre
        className="m-0 p-4 bg-gray-50 text-gray-800 rounded-b-lg max-w-full overflow-hidden
                      dark:bg-gray-900 dark:text-gray-100"
      >
        <code
          ref={codeRef}
          className={`text-sm leading-relaxed font-mono ${className ?? ""}`}
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
