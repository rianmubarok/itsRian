import { useState } from "react";
import { formatDateTime } from "@/lib/guestbook";
import { GuestbookMessage as GuestbookMessageType } from "@/lib/guestbook";

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

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(message.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex gap-3">
      <img
        src={message.profilePic}
        alt={`${message.name}'s profile`}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        {/* Name + Date + Time */}
        <div className="flex items-center mb-1 text-primary-dark dark:text-primary-light space-x-2">
          <div className="flex items-center space-x-2">
            {/* Name + Date */}
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-sm">{message.name}</h3>
              {message.isAuthor && (
                <span className="inline-flex items-center px-[6px] py-[2px] text-[10px] font-regular text-white bg-[#6B21A8] rounded-full gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Author
                </span>
              )}
              <span className="text-xs text-primary-gray font-regular">
                {date}
              </span>
            </div>

            {/* Time */}
            <span className="text-xs text-primary-gray font-regular">
              {time}
            </span>
          </div>

          {/* Delete Button for Admin */}
          {isAdmin && (
            <button
              onClick={handleDeleteClick}
              className="text-xs text-red-500 hover:text-red-700 transition-colors"
              title="Delete message"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Message Bubble */}
        <p className="inline-block mt-1 p-2 px-3 bg-neutral-200 dark:bg-neutral-800 rounded-xl rounded-tl-none font-regular text-base tracking-normal">
          {message.message}
        </p>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-primary-dark dark:text-primary-light mb-4">
              Konfirmasi Hapus
            </h3>
            <p className="text-primary-gray mb-6">
              Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-primary-gray hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
