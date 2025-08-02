import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  return (
    <footer
      className="px-6 py-4 bg-primary-light dark:bg-primary-dark text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2024 itsRian. All rights reserved.
        </p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
