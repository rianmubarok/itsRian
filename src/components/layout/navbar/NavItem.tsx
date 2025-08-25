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
          className="block text-lg sm:text-xl text-primary-dark dark:text-primary-light transition-colors duration-200 font-regular py-2"
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
          onClick={onClose}
        >
          <span
            className={`relative ${
              isActive
                ? "text-gray-800 dark:text-primary-light font-medium"
                : ""
            }`}
          >
            {item.name}
            {isActive && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-current" />
            )}
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li role="none">
      <Link
        href={item.href}
        className="group relative inline-block text-lg text-primary-dark dark:text-primary-light transition-colors duration-200 font-regular"
        role="menuitem"
        aria-current={isActive ? "page" : undefined}
      >
        <span
          className={`after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:bg-current ${
            isActive
              ? "after:scale-x-100"
              : "after:scale-x-0 group-hover:after:scale-x-100"
          }`}
        >
          {item.name}
        </span>
      </Link>
    </li>
  );
}
