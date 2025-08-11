import { AlertTriangle } from "lucide-react";

interface AuthErrorPopupIconProps {
  errorCode?: string;
}

const AuthErrorPopupIcon: React.FC<AuthErrorPopupIconProps> = ({
  errorCode,
}) => {
  switch (errorCode) {
    case "auth/account-exists-with-different-credential":
      return (
        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
      );
    default:
      return (
        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
      );
  }
};

export default AuthErrorPopupIcon;
