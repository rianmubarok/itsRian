"use client";

import ReactMarkdown from "react-markdown";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

interface CodeProps {
  node?: unknown;
  className?: string;
  children?: React.ReactNode;
}

interface PProps {
  node?: unknown;
  children?: React.ReactNode;
}

interface PreProps {
  children?: React.ReactNode;
}

type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export default function MarkdownRenderer({
  children,
  className,
}: MarkdownRendererProps) {
  // Helper: detect inline code like "bash command..." => upgrade to block
  const inlineToBlock = (text: string | React.ReactNode) => {
    if (typeof text !== "string") return null;
    const match =
      /^(bash|sh|zsh|js|jsx|ts|tsx|css|scss|sass|html|json|yaml|yml|sql)\s+([\s\S]+)$/i.exec(
        text.trim()
      );
    if (!match) return null;
    const lang = match[1].toLowerCase();
    const code = match[2];
    return { lang, code };
  };

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Upgrade a paragraph that only contains one inline code node like "bash npm i" to a proper CodeBlock
          p: ({ node, children }: PProps) => {
            const nodeData = node as {
              children?: Array<{ type?: string; value?: string }>;
            };
            const onlyChild =
              nodeData?.children && nodeData.children.length === 1
                ? nodeData.children[0]
                : null;
            if (onlyChild && onlyChild.type === "inlineCode") {
              const upgraded = inlineToBlock(onlyChild.value as string);
              if (upgraded) {
                return (
                  <CodeBlock className={`language-${upgraded.lang}`}>
                    {upgraded.code}
                  </CodeBlock>
                );
              }
            }
            return <p>{children}</p>;
          },
          // Fenced code blocks
          code: ({ className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;

            if (!isInline) {
              return (
                <CodeBlock className={className} {...props}>
                  {String(children).replace(/\n$/, "")}
                </CodeBlock>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }: PreProps) => {
            return <>{children}</>;
          },
          img: (props: ImgProps) => {
            const { src, className, ...rest } = props;
            const srcString = typeof src === "string" ? src : undefined;
            const isExternal = !!srcString && /^https?:\/\//i.test(srcString);
            const looksSvg =
              !!srcString &&
              (srcString.endsWith(".svg") || srcString.includes("/svg/"));

            const mergedClassName = [
              className,
              isExternal && looksSvg ? "md-inline-icon" : undefined,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <img
                src={src as any}
                className={mergedClassName || undefined}
                {...rest}
              />
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
