import React, { useRef, useState, useEffect } from "react";
import { useTextareaResize } from "../../components/guestbook/MessageInput/useTextareaResize";
import ContactFormField from "./ContactFormField";
import ContactStatusMessage from "./ContactStatusMessage";

type ContactFormProps = {
  formRef: React.RefObject<HTMLDivElement | null>;
  intersecting: boolean;
};

const initialForm = { name: "", email: "", message: "" };

type Status = null | "success" | "error" | "loading";

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ formRef, intersecting }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { adjustHeight } = useTextareaResize(textareaRef);

  useEffect(() => {
    adjustHeight();
  }, [form.message, adjustHeight]);

  function validate() {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/meozvddb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      ref={formRef}
      className={`md:col-span-3 transition-all duration-700 ease-out delay-300 ${
        intersecting ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <form
        className="space-y-8 sm:space-y-12"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <ContactFormField
          label="Name"
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={errors.name}
          placeholder="Your name"
          ariaDescribedBy="name-error"
        />
        <ContactFormField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          error={errors.email}
          placeholder="your@email.com"
          ariaDescribedBy="email-error"
        />
        <ContactFormField
          label="Message"
          id="message"
          name="message"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          error={errors.message}
          placeholder="Tell me about your project or just say hello!"
          textarea
          textareaRef={textareaRef}
          ariaDescribedBy="message-error"
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 sm:py-3 hover:px-6 sm:hover:px-8 transition-all duration-300 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark rounded-full text-sm sm:text-base font-medium cursor-pointer transition-all duration-300 disabled:opacity-60"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
        <ContactStatusMessage status={status} />
      </form>
    </div>
  );
};

export default ContactForm;
