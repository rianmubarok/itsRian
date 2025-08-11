import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  signInWithGoogle,
  signInWithGithub,
  signOut,
} from "@/lib/firebase";
import {
  getGuestbookMessages,
  addGuestbookMessage,
  deleteGuestbookMessage,
} from "@/lib/guestbook";
import { GuestbookMessage } from "@/lib/guestbook";

export function useGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [newMessage, setNewMessage] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);

  // Error handling state
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
  }, []);

  // Function untuk handle profile image processing
  const handleProfileImage = async (user: any) => {
    if (!user.photoURL) {
      // Jika tidak ada photo URL, gunakan UI Avatars dengan resolusi tinggi
      const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.displayName || user.email || "User"
      )}&background=random&color=fff&size=200&bold=true&format=webp`;
      setUserPhoto(fallbackUrl);
      return fallbackUrl;
    }

    // Cek apakah ini Google atau GitHub profile image
    const isGoogleImage = user.photoURL.includes("googleusercontent.com");
    const isGitHubImage = user.photoURL.includes(
      "avatars.githubusercontent.com"
    );

    if (isGoogleImage || isGitHubImage) {
      // Untuk Google dan GitHub images, simpan ke Supabase untuk konsistensi
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
          // Fallback ke UI Avatars dengan resolusi tinggi jika gagal
          console.error("Profile image processing failed:", result.error);
          const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.displayName || user.email || "User"
          )}&background=random&color=fff&size=200&bold=true&format=webp`;
          setUserPhoto(fallbackUrl);
          return fallbackUrl;
        }
      } catch (error) {
        console.error("Error processing profile image:", error);
        // Fallback ke UI Avatars dengan resolusi tinggi
        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.displayName || user.email || "User"
        )}&background=random&color=fff&size=200&bold=true&format=webp`;
        setUserPhoto(fallbackUrl);
        return fallbackUrl;
      }
    } else {
      // Untuk image lain, gunakan langsung
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
        setUserName(user.displayName ?? user.email ?? "");

        // Process profile image
        const photoUrl = await handleProfileImage(user);

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
    } catch (e: any) {
      console.error("Sign-in failed", e);

      // Handle specific authentication errors
      if (e.code === "auth/account-exists-with-different-credential") {
        setAuthError({
          isOpen: true,
          error: e.message,
          errorCode: e.code,
        });
      } else {
        setAuthError({
          isOpen: true,
          error: e.message || "Terjadi kesalahan saat login",
          errorCode: e.code,
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
    // User can try signing in with a different provider
  };

  const handleSubmitMessage = async (
    e: React.FormEvent,
    mergedParts?: any[]
  ) => {
    e.preventDefault();

    // Use mergedParts parameter if available, otherwise use newMessage
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
