"use client";

import { useIntersectionObserver } from "../../hooks";
import ContactHeader from "../../components/contact/ContactHeader";
import ContactForm from "../../components/contact/ContactForm";

export default function ContactPageClient() {
  const { ref: headerRef, isIntersecting: headerIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  const { ref: formRef, isIntersecting: formIntersecting } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

  // pastikan headerRef dan formRef bertipe React.RefObject<HTMLDivElement | null>
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-24 sm:mt-32 md:mt-40 lg:mt-48"
      role="main"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <ContactHeader
          headerRef={headerRef as React.RefObject<HTMLDivElement | null>}
          intersecting={headerIntersecting}
        />
        <ContactForm
          formRef={formRef as React.RefObject<HTMLDivElement | null>}
          intersecting={formIntersecting}
        />
      </div>
    </main>
  );
}
