export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-primary-gray">
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
  );
}
