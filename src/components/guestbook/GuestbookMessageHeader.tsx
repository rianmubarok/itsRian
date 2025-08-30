import React from "react";

type GuestbookMessageHeaderProps = {
  name: string;
  isAuthor: boolean;
  date: string;
  time: string;
  isAdmin: boolean;
  onDeleteClick: () => void;
  showDeleteConfirm: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
};

const GuestbookMessageHeader: React.FC<GuestbookMessageHeaderProps> = ({
  name,
  isAuthor,
  date,
  time,
  isAdmin,
  onDeleteClick,
  showDeleteConfirm,
  onConfirmDelete,
  onCancelDelete,
}) => (
  <div className="flex items-center mb-1 text-primary-dark dark:text-primary-light space-x-1 sm:space-x-2">
    <div className="flex items-center space-x-1 sm:space-x-2">
      <div className="flex items-center space-x-1 sm:space-x-2">
        <h3 className="font-medium text-xs sm:text-sm">{name}</h3>
        {isAuthor && (
          <span className="inline-flex items-center px-[5px] pr-[7px] py-[2px] text-[8px] sm:text-[10px] font-regular text-white bg-[#6B21A8] rounded-full gap-0.5 sm:gap-1">
            <svg
              className="w-2 h-2 sm:w-3 sm:h-3"
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
        <span className="text-xs text-primary-gray font-regular">{date}</span>
      </div>
      <span className="text-xs text-primary-gray font-regular">{time}</span>
    </div>
    {isAdmin && (
      <div className="relative inline-block">
        <button
          onClick={onDeleteClick}
          className="text-xs text-red-500 hover:text-red-700 transition-colors cursor-pointer flex items-center gap-1 px-1 sm:px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
          title="Delete message"
          type="button"
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
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
          <span className="hidden sm:inline">Delete</span>
        </button>
        {showDeleteConfirm && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 flex gap-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 animate-popup z-10">
            <button
              onClick={onConfirmDelete}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
            >
              Delete
            </button>
            <button
              onClick={onCancelDelete}
              className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors text-xs font-semibold"
            >
              Cancel
            </button>
            <style jsx>{`
              .animate-popup {
                animation: popup 0.18s cubic-bezier(0.4, 0, 0.2, 1);
              }
              @keyframes popup {
                from {
                  transform: scale(0.85);
                  opacity: 0;
                }
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        )}
      </div>
    )}
  </div>
);

export default GuestbookMessageHeader;
