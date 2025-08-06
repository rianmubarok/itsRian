import ThemeToggle from "../shared/common/ThemeToggle";

export default function Footer() {
  return (
    <footer className="border-t border-primary-gray/20 py-8 mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-primary-dark dark:text-primary-light">
            Muhammad Fitrian Mubarok ⏤ 2025
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-gray">
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

            {/* Theme Toggle - Desktop Only */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
