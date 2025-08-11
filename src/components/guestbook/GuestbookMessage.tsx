import { useState } from "react";
import {
  formatDateTime,
  GuestbookMessage as GuestbookMessageType,
  GuestbookMessagePart,
} from "@/lib/guestbook";
import GuestbookProfileImage from "./GuestbookProfileImage";
import GuestbookMessageHeader from "./GuestbookMessageHeader";
import GuestbookMessageBubble from "./GuestbookMessageBubble";

interface GuestbookMessageProps {
  message: GuestbookMessageType;
  isAdmin: boolean;
  onDelete: (messageId: string) => void;
}

export default function GuestbookMessage({
  message,
  isAdmin,
  onDelete,
}: GuestbookMessageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { date, time } = formatDateTime(message.date);

  const handleDeleteClick = () => setShowDeleteConfirm(true);
  const handleConfirmDelete = () => {
    onDelete(message.id);
    setShowDeleteConfirm(false);
  };
  const handleCancelDelete = () => setShowDeleteConfirm(false);

  return (
    <div className="flex gap-2 sm:gap-3">
      <GuestbookProfileImage
        name={message.name}
        profilePic={message.profilePic}
      />
      <div className="flex-1">
        <GuestbookMessageHeader
          name={message.name}
          isAuthor={!!message.isAuthor}
          date={date}
          time={time}
          isAdmin={isAdmin}
          onDeleteClick={handleDeleteClick}
          showDeleteConfirm={showDeleteConfirm}
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={handleCancelDelete}
        />
        <GuestbookMessageBubble
          message={message.message as GuestbookMessagePart[]}
        />
      </div>
    </div>
  );
}
