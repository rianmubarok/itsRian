import { useState, useEffect } from 'react';
import { fetchMarkdownFromUrl, shouldFetchFromUrl } from '@/utils/helpers';

interface UseMarkdownContentProps {
  content: string;
  language: 'en' | 'id';
}

interface UseMarkdownContentReturn {
  markdownContent: string;
  isLoading: boolean;
  error: string | null;
  isFromUrl: boolean;
}

export function useMarkdownContent({
  content,
  language,
}: UseMarkdownContentProps): UseMarkdownContentReturn {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFromUrl, setIsFromUrl] = useState<boolean>(false);

  useEffect(() => {
    const fetchContent = async () => {
      // Reset state
      setError(null);
      setIsLoading(false);
      setIsFromUrl(false);

      if (!content) {
        setMarkdownContent('');
        return;
      }

      // Check if content should be fetched from URL
      if (shouldFetchFromUrl(content)) {
        setIsLoading(true);
        setIsFromUrl(true);
        
        try {
          const fetchedContent = await fetchMarkdownFromUrl(content);
          setMarkdownContent(fetchedContent);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch content';
          setError(errorMessage);
          // Fallback to original content if fetch fails
          setMarkdownContent(content);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Use content as-is (not a URL)
        setMarkdownContent(content);
      }
    };

    fetchContent();
  }, [content, language]);

  return {
    markdownContent,
    isLoading,
    error,
    isFromUrl,
  };
} 