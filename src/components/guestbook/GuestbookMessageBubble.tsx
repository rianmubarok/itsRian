import React from "react";
import { GuestbookMessagePart } from "@/lib/guestbook";

type GuestbookMessageBubbleProps = {
  message: GuestbookMessagePart[];
};

const renderParts = (arr: GuestbookMessagePart[]) =>
  arr.map((part: GuestbookMessagePart, i: number) =>
    part.type === "user" ? (
      <span
        key={i}
        className="inline-flex items-center text-yellow-600 dark:text-yellow-400 text-sm font-medium"
      >
        @{part.value}
      </span>
    ) : (
      <span key={i} className="text-sm">
        {part.value}
      </span>
    )
  );

const GuestbookMessageBubble: React.FC<GuestbookMessageBubbleProps> = ({
  message,
}) => (
  <p className="inline-block mt-1 p-2 px-3 bg-neutral-200 dark:bg-neutral-800 rounded-xl rounded-tl-none font-regular text-sm tracking-normal">
    {renderParts(message)}
  </p>
);

export default GuestbookMessageBubble;
