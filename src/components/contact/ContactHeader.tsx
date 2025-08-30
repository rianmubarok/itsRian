import React from "react";

type ContactHeaderProps = {
  headerRef: React.RefObject<HTMLDivElement | null>;
  intersecting: boolean;
};

const ContactHeader: React.FC<ContactHeaderProps> = ({
  headerRef,
  intersecting,
}) => (
  <div
    ref={headerRef}
    className={`md:col-span-2 space-y-6 sm:space-y-8 mb-8 sm:mb-12 transition-all duration-700 ease-out ${
      intersecting ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`}
  >
    <h2 className="text-2xl sm:text-3xl leading-tight font-regular text-primary-dark dark:text-primary-light ">
      Feel free to reach out — always open for creative discussions
    </h2>
    <div className="text-xs sm:text-sm font-light tracking-normal">
      <p>Avg. Response: Within 1–2 hours (Working Hours, GMT+7).</p>
      <p>For urgent matters, reach out via social media.</p>
    </div>
    <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-primary-gray">
      <a
        href="https://www.linkedin.com/in/rianmubarok/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
      >
        Linkedin
      </a>
      <a
        href="https://dribbble.com/fitrianmubarok"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
      >
        Dribbble
      </a>
      <a
        href="https://www.instagram.com/m.fitrianm_/"
        className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
      >
        Instagram
      </a>
    </div>
  </div>
);

export default ContactHeader;
