import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { LogOut, User } from "lucide-react";

interface AuthButtonsProps {
  isSignedIn: boolean;
  userEmail?: string;
  userName?: string;
  onSignIn: (provider: "google" | "github") => void;
  onSignOut: () => void;
}

export default function AuthButtons({
  isSignedIn,
  userEmail,
  userName,
  onSignIn,
  onSignOut,
}: AuthButtonsProps) {
  return (
    <div className="space-y-3">
      {isSignedIn ? (
        <div className="flex flex-row gap-2 sm:gap-3">
          {/* Sign out button */}
          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark rounded-full hover:px-6 sm:hover:px-7 transition-all duration-300 cursor-pointer"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Sign Out</span>
          </button>

          {/* User info */}
          <div className="flex items-center gap-2 px-3 py-2t">
            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 dark:text-gray-300 tracking-normal">
                You are signed in as
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {userName || userEmail || "User"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 sm:gap-3">
          {/* Google Sign-In */}
          <button
            onClick={() => onSignIn("google")}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border-1 border-primary-dark text-primary-dark dark:border-primary-light dark:text-primary-light rounded-full shadow-sm hover:px-6 sm:hover:px-7 transition-all duration-300 cursor-pointer"
          >
            <FcGoogle size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-medium">
              Sign In with Google
            </span>
          </button>

          {/* GitHub Sign-In */}
          <button
            onClick={() => onSignIn("github")}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark rounded-full hover:px-6 sm:hover:px-7 transition-all duration-300 cursor-pointer"
          >
            <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="text-xs sm:text-sm font-medium">
              Sign In with GitHub
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
