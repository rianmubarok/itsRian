"use client";

import { useGuestbook } from "@/hooks/useGuestbook";
import { AuthButtons, MessageList, MessageInput } from "@/components";
import { AuthErrorPopup } from "@/components/shared/ui";
import { GuestbookSkeleton } from "@/components/shared/ui/SkeletonLoader";

export default function GuestbookPageClient() {
  const {
    messages,
    isLoading,
    isSignedIn,
    newMessage,
    setNewMessage,
    isSubmitting,
    isAdmin,
    userEmail,
    userName,
    messageListRef,
    authError,
    handleSignIn,
    handleSignOut,
    handleSubmitMessage,
    handleDeleteMessage,
    closeAuthError,
    retryWithDifferentProvider,
  } = useGuestbook();

  if (isLoading) {
    return <GuestbookSkeleton />;
  }

  return (
    <>
      <main
        className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48"
        role="main"
      >
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6 mb-4 sm:mb-6 transition-all duration-700 ease-out opacity-0 animate-fadein">
          <div className="lg:col-span-3 space-y-6 sm:space-y-8 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-[32px] leading-tight font-regular text-primary-dark dark:text-primary-light ">
              Leave whatever you like to say, suggestions, questions or
              anything!
            </h2>

            <div className="text-primary-gray text-xs sm:text-sm font-light space-y-2 sm:space-y-3">
              <p>
                Please sign in to start. Don&apos;t worry, your data is safe.
              </p>
            </div>

            <AuthButtons
              isSignedIn={isSignedIn}
              userEmail={userEmail}
              userName={userName}
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
                existingMessages={messages}
              />
            )}
          </div>
        </div>
      </main>

      {/* Auth Error Popup */}
      <AuthErrorPopup
        isOpen={authError.isOpen}
        onClose={closeAuthError}
        error={authError.error}
        errorCode={authError.errorCode}
        onRetry={retryWithDifferentProvider}
      />
    </>
  );
}
