interface AuthErrorPopupTitleProps {
  errorCode?: string;
}

const AuthErrorPopupTitle: React.FC<AuthErrorPopupTitleProps> = ({
  errorCode,
}) => {
  switch (errorCode) {
    case "auth/account-exists-with-different-credential":
      return <>Akun Sudah Ada</>;
    default:
      return <>Terjadi Kesalahan</>;
  }
};

export default AuthErrorPopupTitle;
