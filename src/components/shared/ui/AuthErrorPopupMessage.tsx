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
          Akun dengan email ini sudah terdaftar menggunakan provider yang
          berbeda.
        </>
      );
    default:
      return <>{error || "Terjadi kesalahan saat login. Silakan coba lagi."}</>;
  }
};

export default AuthErrorPopupMessage;
