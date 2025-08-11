import { useState, useCallback } from "react";
import { AutocompleteUser } from "./types";
import { GuestbookMessagePart } from "@/lib/guestbook";

export function useAutocomplete(
  existingMessages: { id: string; name: string }[]
) {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteUsers, setAutocompleteUsers] = useState<
    AutocompleteUser[]
  >([]);
  const [cursor, setCursor] = useState(0);
  const [currentMention, setCurrentMention] = useState("");

  const users = existingMessages
    .map((msg) => ({ id: msg.id, name: msg.name }))
    .filter(
      (user, index, self) =>
        index === self.findIndex((u) => u.name === user.name)
    );

  const getLastAt = useCallback((str: string) => {
    // Updated regex to capture everything after @ until the end, including empty string
    const match = /(?:^|\s)@(.*)$/.exec(str);
    if (match) {
      return match[1];
    }
    return null;
  }, []);

  const showAutocompleteForInput = useCallback(
    (input: string, newMessage: GuestbookMessagePart[] = []) => {
      // First check if there's an @ in the current input
      const at = getLastAt(input);

      // If no @ in current input, check if we're continuing after a mention
      if (at === null && newMessage.length > 0) {
        // Check if the last part is a user mention and we're typing after it
        const lastPart = newMessage[newMessage.length - 1];
        if (lastPart.type === "user") {
          // If we're typing after a user mention, don't show autocomplete
          setShowAutocomplete(false);
          setCurrentMention("");
          return;
        }

        // Also check if the second-to-last part is a user mention and the last part is just a space
        if (newMessage.length >= 2) {
          const secondLastPart = newMessage[newMessage.length - 2];
          const lastPart = newMessage[newMessage.length - 1];
          if (
            secondLastPart.type === "user" &&
            lastPart.type === "text" &&
            lastPart.value.trim() === ""
          ) {
            setShowAutocomplete(false);
            setCurrentMention("");
            return;
          }
        }
      }

      if (at !== null) {
        setShowAutocomplete(true);
        setCurrentMention(at);
        const filteredUsers = users.filter((u) =>
          u.name.toLowerCase().includes(at.toLowerCase())
        );
        setAutocompleteUsers(filteredUsers);
        setCursor(0);
      } else {
        setShowAutocomplete(false);
        setCurrentMention("");
      }
    },
    [getLastAt, users]
  );

  const hideAutocomplete = useCallback(() => {
    setShowAutocomplete(false);
    setCurrentMention("");
  }, []);

  const moveCursor = useCallback(
    (direction: "up" | "down") => {
      if (autocompleteUsers.length === 0) return;

      if (direction === "down") {
        setCursor((c) => (c + 1) % autocompleteUsers.length);
      } else {
        setCursor(
          (c) => (c - 1 + autocompleteUsers.length) % autocompleteUsers.length
        );
      }
    },
    [autocompleteUsers.length]
  );

  const getCurrentUser = useCallback(() => {
    return autocompleteUsers[cursor] || null;
  }, [autocompleteUsers, cursor]);

  return {
    showAutocomplete,
    autocompleteUsers,
    cursor,
    users,
    currentMention,
    showAutocompleteForInput,
    hideAutocomplete,
    moveCursor,
    getCurrentUser,
  };
}
