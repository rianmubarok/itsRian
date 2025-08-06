import { useRef, useEffect, useState, KeyboardEvent } from "react";
import { GuestbookMessagePart } from "@/lib/guestbook";

interface MessageInputProps {
  newMessage: GuestbookMessagePart[];
  setNewMessage: (message: GuestbookMessagePart[]) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

// Simulasi user yang pernah login
const users = [
  { id: 1, name: "Alex Rodriguez" },
  { id: 2, name: "Rian Pratama" },
  { id: 3, name: "Siti Aminah" },
  { id: 4, name: "Budi Santoso" },
  { id: 5, name: "Dewi Lestari" },
];

export default function MessageInput({
  newMessage,
  setNewMessage,
  isSubmitting,
  onSubmit,
}: MessageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteUsers, setAutocompleteUsers] = useState(users);
  const [cursor, setCursor] = useState(0);

  // Helper: parse input untuk mendeteksi @
  const getLastAt = (str: string) => {
    const match = /@([\w\s]*)$/.exec(str);
    if (match) {
      return match[1];
    }
    return null;
  };

  // Saat input berubah
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    const at = getLastAt(val);
    if (at !== null) {
      setShowAutocomplete(true);
      setAutocompleteUsers(
        users.filter((u) => u.name.toLowerCase().includes(at.toLowerCase()))
      );
      setCursor(0);
    } else {
      setShowAutocomplete(false);
    }
  };

  // Saat pilih user dari autocomplete
  const selectUser = (user: { id: number; name: string }) => {
    // Pisahkan sebelum @ dan setelahnya
    const idx = input.lastIndexOf("@");
    const before = input.slice(0, idx);
    const parts = [...newMessage];
    if (before) {
      parts.push({ type: "text", value: before });
    }
    parts.push({ type: "user", value: user.name });
    // Tambahkan part text kosong berisi 1 spasi agar setelah tag ada spasi
    parts.push({ type: "text", value: " " });
    setNewMessage(parts);
    setInput("");
    setShowAutocomplete(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Gabungkan part text berurutan sebelum submit
  const mergeTextParts = (arr: GuestbookMessagePart[]) => {
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
  };

  // Saat tekan tombol di input
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (showAutocomplete) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c + 1) % autocompleteUsers.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor(
          (c) => (c - 1 + autocompleteUsers.length) % autocompleteUsers.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (autocompleteUsers[cursor]) {
          selectUser(autocompleteUsers[cursor]);
        }
      } else if (e.key === "Escape") {
        setShowAutocomplete(false);
      }
      return;
    }
    if (e.key === "Enter" && (input.trim() || newMessage.length > 0)) {
      e.preventDefault();
      // Simpan entri baru
      let parts = [...newMessage];
      if (input.trim()) {
        // Jika part terakhir adalah text, tambahkan ke situ
        if (parts.length > 0 && parts[parts.length - 1].type === "text") {
          parts[parts.length - 1].value += input;
        } else {
          parts.push({ type: "text", value: input });
        }
      }
      // Gabungkan part text berurutan dan buang part kosong
      parts = mergeTextParts(parts);
      setNewMessage(parts);
      setInput("");
      setShowAutocomplete(false);
      // Submit form
      setTimeout(() => onSubmit(e as any), 0);
    }
    // Tag user lagi dengan @
    if (e.key === "@") {
      setShowAutocomplete(true);
      setAutocompleteUsers(users);
      setCursor(0);
    }
    // Backspace: hapus part terakhir jika input kosong
    if (e.key === "Backspace" && !input && newMessage.length > 0) {
      setNewMessage(newMessage.slice(0, -1));
    }
  };

  // Render parts (text dan tag user) di dalam input
  const renderParts = (arr: GuestbookMessagePart[]) =>
    arr.map((part, i) =>
      part.type === "user" ? (
        <span
          key={i}
          className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900/60 text-yellow-600 dark:text-yellow-400 px-3 py-0.5 rounded-full text-sm font-medium "
        >
          @{part.value}
        </span>
      ) : (
        <span key={i} className="whitespace-pre-line">
          {part.value}
        </span>
      )
    );

  // Reset input jika pesan sudah terkirim
  useEffect(() => {
    if (!isSubmitting) {
      setInput("");
    }
  }, [isSubmitting]);

  // Fokus input saat klik wrapper
  const handleWrapperClick = () => {
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit} className="my-6 relative">
      <div
        className="flex gap-2 items-center flex-wrap min-h-[32px] p-3 border border-gray-300 dark:border-primary-gray rounded-xl bg-white dark:bg-white/10 text-primary-dark dark:text-primary-light placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-text relative"
        onClick={handleWrapperClick}
        ref={wrapperRef}
        tabIndex={-1}
      >
        {renderParts(newMessage)}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={newMessage.length === 0 ? "Type @ to tag a user" : ""}
          disabled={isSubmitting}
          className="flex-1 min-w-[80px] px-0 py-1 border-none outline-none bg-transparent text-primary-dark dark:text-primary-light placeholder-gray-500 dark:placeholder-gray-400 text-sm"
          style={{ minWidth: 60 }}
        />
        <button
          type="submit"
          disabled={(!input.trim() && newMessage.length === 0) || isSubmitting}
          className="ml-2 px-4 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 h-8"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        {/* Dropdown autocomplete di atas input */}
        {showAutocomplete && autocompleteUsers.length > 0 && (
          <ul className="absolute z-10 bg-primary-light dark:bg-primary-dark border border-gray-100 dark:border-gray-700 rounded shadow w-72 max-w-full bottom-full mb-2 left-0">
            {autocompleteUsers.map((user, i) => (
              <li
                key={user.id}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  i === cursor ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
                onMouseDown={() => selectUser(user)}
              >
                @{user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
