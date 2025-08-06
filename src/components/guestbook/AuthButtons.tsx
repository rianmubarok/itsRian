interface AuthButtonsProps {
  isSignedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function AuthButtons({
  isSignedIn,
  onSignIn,
  onSignOut,
}: AuthButtonsProps) {
  return (
    <div className="flex gap-3">
      {isSignedIn ? (
        <button
          onClick={onSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-all duration-300"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={onSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium text-sm hover:bg-blue-600 transition-all duration-300"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
