interface AuthErrorPopupMessageProps {
  errorCode?: string;
  error: string;
}

const AuthErrorPopupMessage: React.FC<AuthErrorPopupMessageProps> = ({
  errorCode,
  error,
}) => {
  switch (errorCode) {
    case "auth/account-exists-with-different-credential":
      return (
        <>
          An account with this email is already registered using a different
          provider.
        </>
      );
    default:
      return <>{error || "Terjadi kesalahan saat login. Silakan coba lagi."}</>;
  }
};

export default AuthErrorPopupMessage;
