"use client";
import { useGuestbook } from "@/hooks/useGuestbook";
import { AuthButtons, MessageList, MessageInput } from "@/components";

export default function GuestbookPage() {
  const {
    messages,
    isSignedIn,
    newMessage,
    setNewMessage,
    isSubmitting,
    isAdmin,
    messageListRef,
    handleSignIn,
    handleSignOut,
    handleSubmitMessage,
    handleDeleteMessage,
  } = useGuestbook();

  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6">
        {/* Header */}
        <div className="lg:col-span-3 space-y-8 mb-12">
          <h2 className="text-[32px] leading-tight font-regular text-primary-dark dark:text-primary-light ">
            Leave whatever you like to say, suggestions, questions or anything!
          </h2>

          <div className="text-primary-gray text-sm font-light space-y-3">
            <p>Please sign in to start. Don't worry, your data is safe.</p>
          </div>

          <AuthButtons
            isSignedIn={isSignedIn}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
          />
        </div>

        <div className="lg:col-span-3 max-w">
          <MessageList
            messages={messages}
            isAdmin={isAdmin}
            onDeleteMessage={handleDeleteMessage}
            ref={messageListRef}
          />

          {isSignedIn && (
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmitMessage}
            />
          )}
        </div>
      </div>
    </main>
  );
}
