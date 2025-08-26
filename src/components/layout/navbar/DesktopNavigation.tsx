import { navItems } from "../../../lib/config";
import NavItem from "./NavItem";

export default function DesktopNavigation() {
  return (
    <ul
      className="hidden sm:flex space-x-6 lg:space-x-8 ml-auto"
      role="menubar"
    >
      {navItems.map((item) => (
        <NavItem key={item.name} item={item} />
      ))}
    </ul>
  );
}
