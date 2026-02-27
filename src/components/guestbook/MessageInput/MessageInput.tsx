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
    <form
      onSubmit={handleFormSubmit}
      className="relative flex flex-col gap-6"
    >
      <div className="transition-all duration-700 ease-out">
        <div
          className="flex gap-2 items-start flex-wrap min-h-[32px] py-1 w-full text-xl sm:text-2xl font-regular text-primary-dark dark:text-primary-light bg-transparent border-b-1 border-primary-gray focus-within:border-primary-dark dark:focus-within:border-primary-light transition-colors duration-300 cursor-text relative tracking-normal"
          onClick={handleWrapperClick}
          ref={wrapperRef}
          tabIndex={-1}
        >
          <MessageParts parts={newMessage} />

          <textarea
            id="guestbook-message"
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              newMessage.length === 0
                ? "Type your message..."
                : ""
            }
            disabled={isSubmitting}
            className="flex-1 min-w-[80px] px-0 py-0 border-none outline-none bg-transparent text-xl sm:text-2xl font-regular text-primary-dark dark:text-primary-light placeholder-primary-gray resize-none overflow-hidden"
            style={{ minWidth: 60, minHeight: 28 }}
            rows={1}
          />
        </div>

        <AutocompleteDropdown
          show={showAutocomplete}
          users={autocompleteUsers}
          cursor={cursor}
          onSelectUser={selectUser}
        />
      </div>

      <div className="flex justify-start">
        <button
          type="submit"
          disabled={
            (!input.trim() && newMessage.length === 0) ||
            isSubmitting ||
            localSubmitting
          }
          className="px-4 sm:px-6 py-2 sm:py-3 hover:px-5 sm:hover:px-7 transition-all duration-300 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark rounded-full text-sm sm:text-base font-medium cursor-pointer disabled:opacity-60"
        >
          {isSubmitting || localSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
