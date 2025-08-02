"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../lib/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="py-5 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-white">
      <nav
        className="max-w-6xl mx-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] font-playfair-medium-italic">
            <Link href="/" aria-label="Home - itsRian Portfolio">
              itsRian
            </Link>
          </h1>

          <ul className="flex space-x-8" role="menubar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name} role="none">
                  <Link
                    href={item.href}
                    className="group relative inline-block text-xl text-primary-dark dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200 font-regular"
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
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
