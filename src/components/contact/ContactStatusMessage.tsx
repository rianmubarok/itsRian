import React from "react";

type ContactStatusMessageProps = {
  status: "success" | "error" | "loading" | null;
};

const ContactStatusMessage: React.FC<ContactStatusMessageProps> = ({
  status,
}) => {
  if (status === "success") {
    return (
      <div className="text-green-600 text-sm">
        Thank you! Your message has been sent.
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="text-red-500 text-sm">
        Sorry, something went wrong. Please try again.
      </div>
    );
  }
  return null;
};

export default ContactStatusMessage;
