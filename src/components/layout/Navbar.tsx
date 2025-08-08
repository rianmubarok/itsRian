"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../shared/common/ThemeToggle";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import {
  DesktopNavigation,
  MobileNavigation,
  HamburgerButton,
} from "./navbar/index";

export default function Navbar() {
  const { isVisible, lastScrollY } = useScrollDirection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-4 md:pt-5 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        lastScrollY > 100
          ? "bg-primary-light/80 dark:bg-primary-dark/80 backdrop-blur-md border-b border-primary-gray/20"
          : "md:bg-transparent bg-primary-light/80 dark:bg-primary-dark/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl sm:text-3xl md:text-[32px] font-playfair-medium-italic text-primary-dark dark:text-primary-light transition-opacity duration-200"
            aria-label="Home - itsRian Portfolio"
          >
            itsRian
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - Mobile Only */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>

            {/* Hamburger Menu Button */}
            <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileNavigation isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </nav>
  );
}
