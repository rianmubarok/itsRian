"use client";

import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  signInWithGoogle,
  signInWithGithub,
  signInWithGoogleRedirect,
  signInWithGithubRedirect,
  handleRedirectResult,
  signOut,
} from "@/lib/firebase";
import {
  getGuestbookMessages,
  addGuestbookMessage,
  deleteGuestbookMessage,
} from "@/lib/guestbook";
import { GuestbookMessage, GuestbookMessagePart } from "@/lib/guestbook";
import { User } from "firebase/auth";

export function useGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [newMessage, setNewMessage] = useState<GuestbookMessagePart[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);

  const [authError, setAuthError] = useState<{
    isOpen: boolean;
    error: string;
    errorCode?: string;
  }>({
    isOpen: false,
    error: "",
    errorCode: undefined,
  });

  const load = async () => {
    try {
      const data = await getGuestbookMessages();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // Check for redirect result on mount (for mobile auth flow)
    handleRedirectResult().catch((e) =>
      console.error("Error handling redirect result:", e)
    );
  }, []);

  function deriveDisplayName(user: User): string {
    const isLikelyEmail = (value: string | null | undefined) =>
      !!value && /@/.test(value);

    if (user.displayName && !isLikelyEmail(user.displayName)) {
      return user.displayName;
    }

    const providerName = user.providerData.find(
      (p) => p.displayName && !isLikelyEmail(p.displayName)
    )?.displayName;
    if (providerName) return providerName;

    const email = user.email || "";
    if (email) {
      const base = email.split("@")[0];
      const pretty = base
        .split(/[._-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      return pretty || base;
    }
    return "User";
  }

  const handleProfileImage = async (user: User) => {
    if (!user.photoURL) {
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.displayName || user.email || "User"
      )}&background=random&color=fff&size=200&bold=true&format=webp`;
      setUserPhoto(fallbackUrl);
      return fallbackUrl;
    }

    const isGoogleImage = user.photoURL.includes("googleusercontent.com");
    const isGitHubImage = user.photoURL.includes(
      "avatars.githubusercontent.com"
    );

    if (isGoogleImage || isGitHubImage) {
      try {
        const response = await fetch("/api/profile-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.uid,
            imageUrl: user.photoURL,
            email: user.email,
            provider: isGoogleImage ? "google" : "github",
          }),
        });

        const result = await response.json();

        if (result.success) {
          setUserPhoto(result.url);
          return result.url;
        } else {
          console.error("Profile image processing failed:", result.error);
          const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.displayName || user.email || "User"
          )}&background=random&color=fff&size=200&bold=true&format=webp`;
          setUserPhoto(fallbackUrl);
          return fallbackUrl;
        }
      } catch (error) {
        console.error("Error processing profile image:", error);
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.displayName || user.email || "User"
        )}&background=random&color=fff&size=200&bold=true&format=webp`;
        setUserPhoto(fallbackUrl);
        return fallbackUrl;
      }
    } else {
      setUserPhoto(user.photoURL);
      return user.photoURL;
    }
  };

  // Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsSignedIn(true);
        setUserEmail(user.email ?? "");
        const name = deriveDisplayName(user);
        setUserName(name);

        await handleProfileImage(user);

        setIsAdmin(
          (user.email ?? "").toLowerCase() === "fitriyan606@gmail.com"
        );
      } else {
        setIsSignedIn(false);
        setUserEmail("");
        setUserName("");
        setUserPhoto("");
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSignIn = async (provider?: "google" | "github") => {
    try {
      if (provider === "github") await signInWithGithub();
      else await signInWithGoogle();
    } catch (e: unknown) {
      if (typeof e === "object" && e && "code" in e && "message" in e) {
        const err = e as { code: string; message: string };

        // Fallback to redirect if popup is closed or blocked (common on mobile)
        if (
          err.code === "auth/popup-closed-by-user" ||
          err.code === "auth/popup-blocked" ||
          err.code === "auth/cancelled-popup-request"
        ) {
          try {
            if (provider === "github") await signInWithGithubRedirect();
            else await signInWithGoogleRedirect();
            return;
          } catch (redirectErr) {
            console.error("Redirect login failed:", redirectErr);
          }
        }

        if (err.code === "auth/account-exists-with-different-credential") {
          setAuthError({
            isOpen: true,
            error: err.message,
            errorCode: err.code,
          });
        } else {
          setAuthError({
            isOpen: true,
            error: err.message || "An error occurred during sign in",
            errorCode: err.code,
          });
        }
      } else {
        setAuthError({
          isOpen: true,
          error: "An error occurred during sign in",
        });
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setNewMessage([]);
  };

  const closeAuthError = () => {
    setAuthError({
      isOpen: false,
      error: "",
      errorCode: undefined,
    });
  };

  const retryWithDifferentProvider = () => {
    closeAuthError();
  };

  const handleSubmitMessage = async (
    e: React.FormEvent,
    mergedParts?: GuestbookMessagePart[]
  ) => {
    e.preventDefault();

    const messageToSubmit = mergedParts || newMessage;

    if (messageToSubmit.length === 0) return;

    setIsSubmitting(true);

    try {
      const newGuestbookMessage: Omit<GuestbookMessage, "id"> = {
        name: userName,
        message: messageToSubmit,
        date: new Date().toISOString(),
        profilePic: userPhoto,
        email: userEmail,
        isAuthor: isAdmin,
      };

      const created = await addGuestbookMessage(newGuestbookMessage);
      setMessages((prev) => [...prev, created]);
      setNewMessage([]);
    } catch (error) {
      console.error("Failed to submit message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
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
    userEmail,
    userName,
    userPhoto,
    messageListRef,
    authError,
    handleSignIn,
    handleSignOut,
    handleSubmitMessage,
    handleDeleteMessage,
    closeAuthError,
    retryWithDifferentProvider,
  };
}
