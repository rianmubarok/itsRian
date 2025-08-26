import { navItems } from "../../../lib/config";
import NavItem from "./NavItem";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  return (
    <div
      id="mobile-menu"
      className={`sm:hidden ${
        isOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
      } transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <ul className="flex flex-col space-y-4 pb-4">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isMobile={true}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
}
