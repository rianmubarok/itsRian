"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "../lib/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="py-5 text-primary-dark dark:text-primary-light">
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

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8" role="menubar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name} role="none">
                  <Link
                    href={item.href}
                    className="group relative inline-block text-xl text-primary-dark dark:text-primary-light transition-colors duration-200 font-regular"
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

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <ul className="flex flex-col space-y-4 py-4 border-primary-dark dark:border-primary-light mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name} role="none">
                  <Link
                    href={item.href}
                    className="block text-xl text-primary-dark dark:text-primary-light  transition-colors duration-200 font-regular py-2"
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
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
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
