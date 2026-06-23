"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
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
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          // Upgrade a paragraph that only contains one inline code node like "bash npm i" to a proper CodeBlock
          p: ({ node, children }: PProps) => {
            const nodeData = node as {
              children?: Array<{ type?: string; value?: string; tagName?: string }>;
            };
            const childrenNodes = nodeData?.children || [];
            
            const onlyChild = childrenNodes.length === 1 ? childrenNodes[0] : null;

            // Upgrade a paragraph that only contains one inline code node like "bash npm i" to a proper CodeBlock
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

            // Single image paragraph
            if (onlyChild && onlyChild.tagName === "img") {
              return <>{children}</>;
            }

            // Explicit Gallery Detection
            const firstChild = childrenNodes[0];
            const firstChildText = firstChild && firstChild.type === 'text' ? firstChild.value || '' : '';
            
            const match = /\[GALLERY(?:_(APP|WEB|\d+))?\]/i.exec(firstChildText);

            if (match) {
              const typeOrNum = match[1]?.toUpperCase();
              let columns = 3; // Default
              
              if (typeOrNum === 'APP') columns = 3;
              else if (typeOrNum === 'WEB') columns = 2;
              else if (typeOrNum) {
                columns = parseInt(typeOrNum, 10);
              }

              const validCols = Math.min(Math.max(columns, 1), 6);
              const marker = match[0];
              
              const colMap: Record<number, string> = {
                1: 'grid-cols-1',
                2: 'grid-cols-1 sm:grid-cols-2',
                3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
                4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
                5: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-5',
                6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6',
              };
              const gridClass = colMap[validCols] || colMap[3];
              
              return (
                <div className={`gallery-grid grid ${gridClass} gap-4 my-10 items-start`}>
                  {React.Children.map(children, (child) => {
                    if (typeof child === 'string') {
                      return child.replace(marker, '');
                    }
                    return child;
                  })}
                </div>
              );
            }

            return <p>{children}</p>;
          },
          // Bento Grid Interceptor
          ul: ({ node, children, className, ...props }: any) => {
            const childrenArray = React.Children.toArray(children);
            
            const extractText = (element: any): string => {
              if (typeof element === 'string' || typeof element === 'number') return String(element);
              if (Array.isArray(element)) return element.map(extractText).join('');
              if (element?.props?.children) return extractText(element.props.children);
              return '';
            };

            const listElements = childrenArray.filter((child: any) => typeof child === 'object' && child !== null);
            const firstChildStr = listElements.length > 0 ? extractText(listElements[0]) : '';
            const isStack = firstChildStr.includes('[STACK]');
            const cardsMatch = /\[CARDS(?:_(\d+))?\]/.exec(firstChildStr);
            const isCards = !!cardsMatch;

            if (isStack || isCards) {
              const marker = isStack ? '[STACK]' : (cardsMatch?.[0] || '');
              const groupTitle = firstChildStr.replace(marker, '').trim();
              const groupItems = listElements.slice(1); // Remove the marker item

              let gridClass = "grid-cols-1";
              if (isCards) {
                const cols = cardsMatch?.[1] ? parseInt(cardsMatch[1], 10) : 1;
                if (cols === 2) gridClass = "grid-cols-1 md:grid-cols-2";
                else if (cols === 3) gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
                else if (cols >= 4) gridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
              }

              const containerClass = isStack
                ? "flex flex-col w-full relative gap-8 md:gap-10"
                : `grid ${gridClass} gap-4 w-full relative`;

              return (
                <div className="flex flex-col gap-8 my-16 clear-both relative">
                  {groupTitle && (
                    <div className={`w-full py-4 md:py-6 border-b border-transparent ${isStack ? 'sticky top-[70px] md:top-[90px] z-0' : ''}`}>
                      <h2 className="text-4xl md:text-5xl font-semibold m-0 text-primary-dark dark:text-primary-light tracking-tight">{groupTitle}</h2>
                    </div>
                  )}
                  <div className={containerClass}>
                    {groupItems.map((item: any, idx: number) => {
                      const baseClass = isStack
                        ? "stack-card sticky bg-white dark:bg-[#161616] rounded-[24px] p-6 sm:p-8 border border-primary-gray/20 flex flex-col gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] transition-all duration-300"
                        : "regular-card bg-white dark:bg-[#161616] rounded-[24px] p-6 sm:p-8 border border-primary-gray/20 flex flex-col gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]";

                      const styleProps = isStack ? {
                        '--sticky-offset-mobile': `${160 + idx * 20}px`,
                        '--sticky-offset-desktop': `${220 + idx * 24}px`,
                        zIndex: idx + 10
                      } : {};

                      return (
                        <div key={idx} className={baseClass} style={styleProps as React.CSSProperties}>
                          {item.props.children}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return <ul className={className} {...props}>{children}</ul>;
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
            const { src, className, alt, ...rest } = props;
            const srcString = typeof src === "string" ? src : undefined;
            const isExternal = !!srcString && /^https?:\/\//i.test(srcString);
            const looksSvg =
              !!srcString &&
              (srcString.endsWith(".svg") || srcString.includes("/svg/"));

            let cleanAlt = alt || "";
            let align = "center";
            if (cleanAlt.toLowerCase().includes("| left")) {
              align = "left";
              cleanAlt = cleanAlt.replace(/\|\s*left/i, "").trim();
            } else if (cleanAlt.toLowerCase().includes("| right")) {
              align = "right";
              cleanAlt = cleanAlt.replace(/\|\s*right/i, "").trim();
            }

            const mergedClassName = [
              className,
              isExternal && looksSvg ? "md-inline-icon" : undefined,
            ]
              .filter(Boolean)
              .join(" ");

            if (!looksSvg) {
              const wrapperClass = align === "left"
                ? "image-wrapper block m-0 sm:float-left sm:w-5/12 sm:mr-8 mb-4 mt-2 relative group overflow-hidden rounded-xl border border-primary-gray/10 isolate"
                : align === "right"
                ? "image-wrapper block m-0 sm:float-right sm:w-5/12 sm:ml-8 mb-4 mt-2 relative group overflow-hidden rounded-xl border border-primary-gray/10 isolate"
                : "image-wrapper block m-0 w-full mx-auto my-4 relative group overflow-hidden rounded-xl border border-primary-gray/10 isolate";

              return (
                <span className={wrapperClass}>
                  <img
                    {...rest}
                    src={src}
                    alt={cleanAlt}
                    className="w-full h-auto block object-cover"
                  />
                  {cleanAlt && (
                    <span className="block absolute bottom-0 left-0 w-full px-4 py-3 pt-12 bg-gradient-to-t from-black/80 to-transparent text-white/90 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-wide">
                      {cleanAlt}
                    </span>
                  )}
                </span>
              );
            }

            return (
              <img
                {...rest}
                src={src}
                alt={cleanAlt}
                className={mergedClassName || undefined}
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
