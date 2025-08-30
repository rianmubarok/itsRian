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
            className="inline-flex items-center text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium py-1"
          >
            @{part.value}
          </span>
        ) : (
          <span key={i} className="whitespace-pre-line text-sm py-1">
            {part.value}
          </span>
        )
      )}
    </>
  );
}
