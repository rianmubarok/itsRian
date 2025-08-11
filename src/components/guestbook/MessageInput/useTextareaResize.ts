import { useCallback, RefObject } from "react";

export function useTextareaResize(textareaRef: RefObject<HTMLTextAreaElement | null>) {
  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef]);

  const resetHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [textareaRef]);

  return { adjustHeight, resetHeight };
} 