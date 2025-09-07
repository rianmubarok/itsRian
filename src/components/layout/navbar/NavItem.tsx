import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  item: {
    name: string;
    href: string;
  };
  isMobile?: boolean;
  onClose?: () => void;
}

export default function NavItem({
  item,
  isMobile = false,
  onClose,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  if (isMobile) {
    return (
      <Link
        href={item.href}
        className={`block text-lg sm:text-xl transition-colors duration-200 font-regular py-2 text-primary-dark dark:text-primary-light hover:text-gray-800 dark:hover:text-gray-200`}
        role="menuitem"
        aria-current={isActive ? "page" : undefined}
        onClick={onClose}
      >
        <span className={`${isActive ? "font-medium" : ""}`}>{item.name}</span>
      </Link>
    );
  }

  return (
    <li role="none">
      <Link
        href={item.href}
        className={`relative inline-flex items-center text-lg transition-colors duration-200 font-medium text-primary-dark dark:text-primary-light hover:text-gray-900 dark:hover:text-gray-100 group`}
        role="menuitem"
        aria-current={isActive ? "page" : undefined}
      >
        {item.name === "Contact" ? (
          <span className="relative inline-block py-1.5 px-4 bg-primary-dark text-primary-light rounded-full dark:bg-primary-light dark:text-primary-dark overflow-hidden">
            <span className="block transition-all duration-200 ease-out group-hover:opacity-0 group-hover:translate-x-2">
              {item.name}
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 -translate-x-2 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M13.23 5.21a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06L17.94 13H4.5a.75.75 0 0 1 0-1.5h13.44l-4.71-4.71a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </span>
          </span>
        ) : (
          <span className="inline-block py-1.5 px-0">{item.name}</span>
        )}
      </Link>
    </li>
  );
}
