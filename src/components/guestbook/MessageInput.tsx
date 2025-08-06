import { KeyboardEvent, useRef, useEffect } from "react";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MessageInput({
  newMessage,
  setNewMessage,
  isSubmitting,
  onSubmit,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() && !isSubmitting) {
        onSubmit(e as any);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="my-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your message..."
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-primary-dark dark:text-primary-light placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              rows={1}
              style={{
                minHeight: "48px",
                maxHeight: "120px",
                overflowY: "auto",
              }}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isSubmitting}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 h-12"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          {/* Help text */}
          <div className="mt-2 text-xs text-primary-gray">
            <span className="font-medium">💡 Tip:</span> Press Enter to send,
            Shift+Enter for new line.
          </div>
        </div>
      </div>
    </form>
  );
}
