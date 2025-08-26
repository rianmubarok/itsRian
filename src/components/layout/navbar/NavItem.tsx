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
      <li role="none">
        <Link
          href={item.href}
          className={`block text-lg sm:text-xl transition-colors duration-200 font-regular py-2 text-primary-dark dark:text-primary-light hover:text-gray-800 dark:hover:text-gray-200`}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
          onClick={onClose}
        >
          <span className={`${isActive ? "font-medium" : ""}`}>
            {item.name}
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li role="none">
      <Link
        href={item.href}
        className={`relative inline-flex items-center text-lg transition-colors duration-200 font-medium text-primary-dark dark:text-primary-light hover:text-gray-900 dark:hover:text-gray-100`}
        role="menuitem"
        aria-current={isActive ? "page" : undefined}
      >
        <span
          className={`${
            item.name === "Contact"
              ? "inline-block py-1.5 px-4 bg-primary-dark text-primary-light rounded-full dark:bg-primary-light dark:text-primary-dark"
              : "inline-block py-1.5 px-0"
          }`}
        >
          {item.name}
        </span>
      </Link>
    </li>
  );
}
