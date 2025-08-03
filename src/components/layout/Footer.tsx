import ThemeToggle from "../common/ThemeToggle";

export default function Footer() {
  return (
    <footer className="border-t border-primary-gray/20 py-8 mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-gray">
            © 2024 Rian. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-gray">
            <a
              href="https://github.com/itsrian"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/itsrian"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:rian@example.com"
              className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            >
              Email
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
