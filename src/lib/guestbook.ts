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

export const guestbookMessages: GuestbookMessage[] = [
  {
    id: "1",
    name: "Sarah Chen",
    message: [
      {
        type: "text",
        value:
          "Love your portfolio! The design is so clean and modern. Really inspiring work. Keep it up! 👏",
      },
    ],
    date: "2024-12-05T10:00:00Z",
    profilePic:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    message: [
      {
        type: "text",
        value:
          "Great projects! I especially liked the blog section. Would love to collaborate on something sometime.",
      },
    ],
    date: "2024-12-06T14:30:00Z",
    profilePic:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Emma Wilson",
    message: [
      {
        type: "text",
        value:
          "Your tech stack choices are spot on! Really enjoyed reading your blog posts about Next.js and React.",
      },
    ],
    date: "2024-12-07T09:15:00Z",
    profilePic:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Mike Johnson",
    message: [
      {
        type: "text",
        value:
          "Awesome portfolio! The dark mode toggle is a nice touch. Clean and professional design.",
      },
    ],
    date: "2024-12-08T11:20:00Z",
    profilePic:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "David Kim",
    message: [
      {
        type: "text",
        value:
          "Really impressed with your work! The guestbook feature is amazing.",
      },
    ],
    date: "2024-12-09T16:45:00Z",
    profilePic:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "6",
    name: "Rian Mubarok",
    message: [
      {
        type: "text",
        value:
          "Hello! This is a great portfolio. What do you think about the design?",
      },
    ],
    date: "2024-12-10T13:00:00Z",
    profilePic:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];

// Get all guestbook messages sorted by date
export const getGuestbookMessages = (): GuestbookMessage[] => {
  return guestbookMessages.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
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
  const newMessage: GuestbookMessage = {
    id: Date.now().toString(),
    ...message,
  };

  // For now, just return the new message
  // In the future, this will save to database and return the saved message
  return newMessage;
};

// Delete a guestbook message
export const deleteGuestbookMessage = async (
  messageId: string
): Promise<boolean> => {
  // This will be replaced with actual database call in the future
  // For now, just return true to simulate successful deletion
  return true;
};
