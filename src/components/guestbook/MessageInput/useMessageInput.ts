import { useState, useCallback, RefObject } from "react";
import { GuestbookMessagePart } from "@/lib/guestbook";
import { MessageInputProps } from "./types";
import { useTextareaResize } from "./useTextareaResize";
import { useAutocomplete } from "./useAutocomplete";

export function useMessageInput({
  newMessage,
  setNewMessage,
  isSubmitting,
  onSubmit,
  existingMessages = [],
  textareaRef,
}: MessageInputProps & { textareaRef: RefObject<HTMLTextAreaElement | null> }) {
  const [input, setInput] = useState("");
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [savedInput, setSavedInput] = useState(""); 
  const [lastFullInput, setLastFullInput] = useState("");

  const { adjustHeight, resetHeight } = useTextareaResize(textareaRef);
  const {
    showAutocomplete,
    autocompleteUsers,
    cursor,
    users,
    currentMention,
    showAutocompleteForInput,
    hideAutocomplete,
    moveCursor,
    getCurrentUser,
  } = useAutocomplete(existingMessages);

  const selectUser = useCallback(
    (user: { id: string; name: string }) => {
      const inputToProcess = lastFullInput || savedInput || input;

      const atIndex = inputToProcess.lastIndexOf("@");
      if (atIndex === -1) {
        return;
      }

      const beforeAt = inputToProcess.slice(0, atIndex);
      const afterAt = inputToProcess.slice(atIndex + 1);

      let mentionEndIndex = 0;
      if (currentMention && currentMention.trim() !== "") {
        const mentionIndex = afterAt
          .toLowerCase()
          .indexOf(currentMention.toLowerCase());
        if (mentionIndex !== -1) {
          mentionEndIndex = mentionIndex + currentMention.length;
        }
      } else {
        mentionEndIndex = 0;
      }

      const afterMention = afterAt.slice(mentionEndIndex);

      const parts = [...newMessage];

      if (beforeAt) {
        parts.push({ type: "text", value: beforeAt });
      }
      parts.push({ type: "user", value: user.name });
      parts.push({ type: "text", value: " " });
      if (afterMention) {
        parts.push({ type: "text", value: afterMention });
      }

      setNewMessage(parts);
      setInput("");
      setSavedInput(""); 
      setLastFullInput(""); 
      hideAutocomplete();

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    },
    [
      input,
      savedInput,
      lastFullInput,
      newMessage,
      setNewMessage,
      hideAutocomplete,
      currentMention,
      textareaRef,
    ]
  );

  const mergeTextParts = useCallback((arr: GuestbookMessagePart[]) => {
    const merged: GuestbookMessagePart[] = [];
    for (const part of arr) {
      if (part.type === "text") {
        if (merged.length > 0 && merged[merged.length - 1].type === "text") {
          merged[merged.length - 1].value += part.value;
        } else if (part.value) {
          merged.push({ ...part });
        }
      } else {
        merged.push(part);
      }
    }
    return merged;
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting || localSubmitting) return;

      let parts = [...newMessage];
      if (input.trim()) {
        parts.push({ type: "text", value: input });
      }

      if (parts.length === 0) {
        return;
      }

      setLocalSubmitting(true);

      try {
        parts = mergeTextParts(parts);

        setNewMessage(parts);

        setInput("");
        hideAutocomplete();
        resetHeight();

        await onSubmit(e, parts);
      } finally {
        setLocalSubmitting(false);
      }
    },
    [
      isSubmitting,
      localSubmitting,
      newMessage,
      input,
      mergeTextParts,
      setNewMessage,
      hideAutocomplete,
      resetHeight,
      onSubmit,
    ]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setInput(val);
      adjustHeight();
      showAutocompleteForInput(val, newMessage);
      setLastFullInput(val);

      if (val.includes("@")) {
        setSavedInput(val);
      }

      if (showAutocomplete) {
        setSavedInput(val);
      }
    },
    [adjustHeight, showAutocompleteForInput, showAutocomplete, newMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && !showAutocomplete) {
        e.preventDefault();
        handleSubmit(e as React.FormEvent);
        return;
      }

      if (showAutocomplete) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          moveCursor("down");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          moveCursor("up");
        } else if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          const currentUser = getCurrentUser();
          if (currentUser) {
            selectUser(currentUser);
          }
        } else if (e.key === "Escape") {
          hideAutocomplete();
        }
      }

      if (e.key === "@") {
        showAutocompleteForInput(input + "@", newMessage);
      }

      if (e.key === "Backspace" && !input && newMessage.length > 0) {
        const lastPart = newMessage[newMessage.length - 1];
        if (lastPart.type === "user") {
          setNewMessage(newMessage.slice(0, -1));
        } else if (lastPart.type === "text" && lastPart.value.length > 0) {
          const newParts = [...newMessage];
          newParts[newMessage.length - 1] = {
            ...lastPart,
            value: lastPart.value.slice(0, -1),
          };
          if (newParts[newMessage.length - 1].value === "") {
            newParts.pop();
          }
          setNewMessage(newParts);
        }
      }

      if (e.key === "Backspace" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setInput("");
        setNewMessage([]);
        resetHeight();
      }
    },
    [
      showAutocomplete,
      moveCursor,
      getCurrentUser,
      selectUser,
      hideAutocomplete,
      handleSubmit,
      showAutocompleteForInput,
      input,
      newMessage,
      setNewMessage,
      resetHeight,
    ]
  );

  const resetInput = useCallback(() => {
    if (!isSubmitting) {
      setInput("");
      setSavedInput("");
      setLastFullInput("");
      resetHeight();
    }
  }, [isSubmitting, resetHeight]);

  return {
    input,
    setInput,
    localSubmitting,
    showAutocomplete,
    autocompleteUsers,
    cursor,
    users,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    selectUser,
    resetInput,
    resetHeight,
  };
}
