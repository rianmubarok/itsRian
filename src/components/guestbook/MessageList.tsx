import { forwardRef } from "react";
import { GuestbookMessage as GuestbookMessageType } from "@/lib/guestbook";
import GuestbookMessage from "./GuestbookMessage";

interface MessageListProps {
  messages: GuestbookMessageType[];
  isAdmin: boolean;
  onDeleteMessage: (messageId: string) => void;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isAdmin, onDeleteMessage }, ref) => {
    return (
      <div 
        ref={ref}
        className="h-[30rem] overflow-y-auto space-y-4 scrollbar-thin pr-5 tracking-normal"
      >
        {messages.slice().map((message) => (
          <GuestbookMessage
            key={message.id}
            message={message}
            isAdmin={isAdmin}
            onDelete={onDeleteMessage}
          />
        ))}
      </div>
    );
  }
);

MessageList.displayName = "MessageList";

export default MessageList;
