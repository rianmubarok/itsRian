interface AuthErrorPopupTitleProps {
  errorCode?: string;
}

const AuthErrorPopupTitle: React.FC<AuthErrorPopupTitleProps> = ({
  errorCode,
}) => {
  switch (errorCode) {
    case "auth/account-exists-with-different-credential":
      return <>Account Already Exists</>;
    default:
      return <>An Error Occurred</>;
  }
};

export default AuthErrorPopupTitle;
