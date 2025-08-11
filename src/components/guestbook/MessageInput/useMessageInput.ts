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
  const [savedInput, setSavedInput] = useState(""); // Save input when autocomplete is shown
  const [lastFullInput, setLastFullInput] = useState(""); // Store the last full input before autocomplete

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
      // Use lastFullInput if available, otherwise use current input
      const inputToProcess = lastFullInput || savedInput || input;

      // Find the @ symbol in the input
      const atIndex = inputToProcess.lastIndexOf("@");
      if (atIndex === -1) {
        return;
      }

      // Split the input into parts
      const beforeAt = inputToProcess.slice(0, atIndex);
      const afterAt = inputToProcess.slice(atIndex + 1);

      // Find where the mention ends in the afterAt part
      let mentionEndIndex = 0;
      if (currentMention && currentMention.trim() !== "") {
        // Find the mention in the afterAt part
        const mentionIndex = afterAt
          .toLowerCase()
          .indexOf(currentMention.toLowerCase());
        if (mentionIndex !== -1) {
          mentionEndIndex = mentionIndex + currentMention.length;
        }
      } else {
        // If there's no currentMention or it's empty, the mention ends at the beginning of afterAt
        mentionEndIndex = 0;
      }

      // Get the text after the mention
      const afterMention = afterAt.slice(mentionEndIndex);

      const parts = [...newMessage];

      // Add text before @ if there is any
      if (beforeAt) {
        parts.push({ type: "text", value: beforeAt });
      }

      // Add the user mention
      parts.push({ type: "user", value: user.name });

      // Add a space after the user mention
      parts.push({ type: "text", value: " " });

      // Add text after the mention if there is any
      if (afterMention) {
        parts.push({ type: "text", value: afterMention });
      }

      setNewMessage(parts);
      setInput("");
      setSavedInput(""); // Clear saved input
      setLastFullInput(""); // Clear last full input
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

        // Set the new message immediately
        setNewMessage(parts);

        // Clear input and hide autocomplete
        setInput("");
        hideAutocomplete();
        resetHeight();

        // Pass the merged parts directly to onSubmit
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

      // Always save the full input
      setLastFullInput(val);

      // Save input when autocomplete is shown
      if (val.includes("@")) {
        setSavedInput(val);
      }

      // Also save input when autocomplete is active
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
        handleSubmit(e as any);
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
