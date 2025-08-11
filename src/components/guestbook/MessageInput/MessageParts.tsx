import { GuestbookMessagePart } from "@/lib/guestbook";

interface MessagePartsProps {
  parts: GuestbookMessagePart[];
}

export function MessageParts({ parts }: MessagePartsProps) {
  return (
    <>
      {parts.map((part, i) =>
        part.type === "user" ? (
          <span
            key={i}
            className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900/60 text-yellow-600 dark:text-yellow-400 px-2 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-medium"
          >
            @{part.value}
          </span>
        ) : (
          <span key={i} className="whitespace-pre-line">
            {part.value}
          </span>
        )
      )}
    </>
  );
}
