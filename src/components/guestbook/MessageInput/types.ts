import { GuestbookMessagePart, GuestbookMessage } from "@/lib/guestbook";

export interface MessageInputProps {
  newMessage: GuestbookMessagePart[];
  setNewMessage: (message: GuestbookMessagePart[]) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent, mergedParts?: GuestbookMessagePart[]) => void;
  existingMessages?: GuestbookMessage[];
}

export interface AutocompleteUser {
  id: string;
  name: string;
}

export interface MessageInputState {
  input: string;
  showAutocomplete: boolean;
  autocompleteUsers: AutocompleteUser[];
  cursor: number;
  localSubmitting: boolean;
}
