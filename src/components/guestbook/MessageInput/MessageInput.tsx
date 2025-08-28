import { useRef, useEffect } from "react";
import { MessageInputProps } from "./types";
import { useMessageInput } from "./useMessageInput";
import { MessageParts } from "./MessageParts";
import { AutocompleteDropdown } from "./AutocompleteDropdown";

export function MessageInput({
  newMessage,
  setNewMessage,
  isSubmitting,
  onSubmit,
  existingMessages = [],
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    input,
    localSubmitting,
    showAutocomplete,
    autocompleteUsers,
    cursor,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    selectUser,
    resetInput,
  } = useMessageInput({
    newMessage,
    setNewMessage,
    isSubmitting,
    onSubmit,
    existingMessages,
    textareaRef,
  });

  useEffect(() => {
    resetInput();
  }, [isSubmitting, resetInput]);

  const handleWrapperClick = () => {
    textareaRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || localSubmitting) {
      return;
    }
    handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="my-4 sm:my-6 relative">
      <div
        className="flex gap-2 items-start flex-wrap min-h-[32px] p-2 sm:p-3 border border-gray-300 dark:border-primary-gray rounded-xl bg-white dark:bg-white/10 text-primary-dark dark:text-primary-light placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-text relative tracking-normal"
        onClick={handleWrapperClick}
        ref={wrapperRef}
        tabIndex={-1}
      >
        <MessageParts parts={newMessage} />

        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            newMessage.length === 0
              ? "Type @ to mention user or write your message..."
              : ""
          }
          disabled={isSubmitting}
          className="flex-1 min-w-[80px] px-0 py-1 border-none outline-none bg-transparent text-primary-dark dark:text-primary-light placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm resize-none overflow-hidden"
          style={{ minWidth: 60, minHeight: 20 }}
          rows={1}
        />

        <button
          type="submit"
          disabled={
            (!input.trim() && newMessage.length === 0) ||
            isSubmitting ||
            localSubmitting
          }
          className="ml-2 px-3 sm:px-4 bg-blue-500 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 h-7 sm:h-8 flex-shrink-0 cursor-pointer"
        >
          {isSubmitting || localSubmitting ? "Sending..." : "Send"}
        </button>

        <AutocompleteDropdown
          show={showAutocomplete}
          users={autocompleteUsers}
          cursor={cursor}
          onSelectUser={selectUser}
        />
      </div>
    </form>
  );
}
