import React from "react";
import { GuestbookMessagePart } from "@/lib/guestbook";

type GuestbookMessageBubbleProps = {
  message: GuestbookMessagePart[];
};

const renderParts = (arr: GuestbookMessagePart[]) =>
  arr.map((part: GuestbookMessagePart, i: number) =>
    part.type === "user" ? (
      <span key={i} className="text-yellow-600 dark:text-yellow-400">
        @{part.value}
      </span>
    ) : (
      <span key={i}>{part.value}</span>
    )
  );

const GuestbookMessageBubble: React.FC<GuestbookMessageBubbleProps> = ({
  message,
}) => (
  <p className="inline-block mt-1 p-2 px-3 bg-neutral-200 dark:bg-neutral-800 rounded-xl rounded-tl-none font-regular text-sm sm:text-base tracking-normal">
    {renderParts(message)}
  </p>
);

export default GuestbookMessageBubble;
