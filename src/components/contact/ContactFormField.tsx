import React from "react";

type ContactFormFieldProps = {
  label: string;
  type?: string;
  id: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  ariaDescribedBy?: string;
};

const ContactFormField: React.FC<ContactFormFieldProps> = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  textarea = false,
  textareaRef,
  ariaDescribedBy,
}) => (
  <div className="transition-all duration-700 ease-out">
    <label
      htmlFor={id}
      className="block text-lg sm:text-xl md:text-2xl font-regular text-primary-dark dark:text-primary-light mb-2"
    >
      {label}
    </label>
    {textarea ? (
      <textarea
        id={id}
        name={name}
        rows={1}
        className="w-full text-xl sm:text-2xl font-regular text-primary-dark dark:text-primary-light bg-transparent border-b-1 border-primary-gray focus:border-primary-dark dark:focus:border-primary-light transition-colors duration-300 placeholder-primary-gray"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
        ref={textareaRef}
        style={{ resize: "none", overflow: "hidden" }}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        className="w-full text-xl sm:text-2xl font-regular text-primary-dark dark:text-primary-light bg-transparent border-b-1 border-primary-gray focus:border-primary-dark dark:focus:border-primary-light transition-colors duration-300 placeholder-primary-gray"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
      />
    )}
    {error && (
      <div id={ariaDescribedBy} className="text-red-500 text-xs mt-1">
        {error}
      </div>
    )}
  </div>
);

export default ContactFormField;
