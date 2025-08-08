interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 text-primary-dark dark:text-primary-light"
      onClick={onClick}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <span
        className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
} 