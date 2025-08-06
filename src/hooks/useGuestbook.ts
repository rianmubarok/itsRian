import { useState, useRef, useEffect } from "react";
import {
  getGuestbookMessages,
  addGuestbookMessage,
  deleteGuestbookMessage,
  GuestbookMessagePart,
} from "@/lib/guestbook";
import { GuestbookMessage } from "@/lib/guestbook";

export function useGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [newMessage, setNewMessage] = useState<GuestbookMessagePart[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);

  // Simulate async fetch for guestbook messages
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setMessages(getGuestbookMessages());
      setIsLoading(false);
    }, 1200); // 1.2s loading for skeleton
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSignIn = () => {
    setIsSignedIn(true);
    // Simulate admin check for fitriyan606@gmail.com
    const email = "fitriyan606@gmail.com";
    setUserEmail(email);
    setIsAdmin(true); // For demo purposes, always set as admin
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setNewMessage([]);
    setIsAdmin(false);
    setUserEmail("");
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.length === 0) return;

    setIsSubmitting(true);

    try {
      const newGuestbookMessage = await addGuestbookMessage({
        name: "You",
        message: newMessage,
        date: new Date().toISOString(),
        profilePic:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        email: userEmail,
        isAuthor: userEmail === "fitriyan606@gmail.com",
      });

      setMessages((prev) => [...prev, newGuestbookMessage]);
      setNewMessage([]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!isAdmin) return;

    try {
      const success = await deleteGuestbookMessage(messageId);
      if (success) {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return {
    messages,
    isLoading,
    isSignedIn,
    newMessage,
    setNewMessage,
    isSubmitting,
    isAdmin,
    messageListRef,
    handleSignIn,
    handleSignOut,
    handleSubmitMessage,
    handleDeleteMessage,
  };
}
