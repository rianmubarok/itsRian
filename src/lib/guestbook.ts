export interface GuestbookMessagePart {
  type: "text" | "user";
  value: string;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: GuestbookMessagePart[];
  date: string;
  profilePic: string;
  email?: string;
  isAuthor?: boolean;
}

// Get all guestbook messages sorted by date
export const getGuestbookMessages = async (): Promise<GuestbookMessage[]> => {
  try {
    const res = await fetch("/api/guestbook", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    const items = (await res.json()) as GuestbookMessage[];
    return items;
  } catch (error) {
    console.error("Error fetching guestbook messages:", error);
    return [];
  }
};

// Format date and time for display
export const formatDateTime = (
  dateString: string
): { date: string; time: string } => {
  const date = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return {
    date: date.toLocaleDateString("en-US", dateOptions),
    time: date.toLocaleTimeString("en-US", timeOptions),
  };
};

// Add a new guestbook message
export const addGuestbookMessage = async (
  message: Omit<GuestbookMessage, "id">
): Promise<GuestbookMessage> => {
  try {
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) throw new Error("Failed to insert");
    const created = (await res.json()) as GuestbookMessage;
    return created;
  } catch (error) {
    console.error("Error adding guestbook message:", error);
    throw error;
  }
};

// Delete a guestbook message
export const deleteGuestbookMessage = async (
  messageId: string
): Promise<boolean> => {
  try {
    const res = await fetch(`/api/guestbook/${messageId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Error deleting guestbook message:", error);
    return false;
  }
};
