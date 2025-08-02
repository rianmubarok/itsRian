import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="px-6 py-3 bg-primary-light dark:bg-primary-dark text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">itsRian</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
}
