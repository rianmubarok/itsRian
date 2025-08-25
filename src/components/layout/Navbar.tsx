"use client";

import Link from "next/link";
import Image from "next/image";
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
          ? "bg-primary-light/80 dark:bg-primary-dark/80 backdrop-blur-md border-b border-primary-gray/20 md:border-b-0"
          : "md:bg-transparent bg-primary-light/80 dark:bg-primary-dark/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-xl mx-auto px-4 pr-8 rounded-full md:border md:border-primary-gray/20 md:bg-primary-light/80 md:dark:bg-primary-dark/80 md:backdrop-blur-md">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Profile Image */}
          <Link
            href="/"
            aria-label="Home - itsRian Portfolio"
          >
            <Image
              src="/rian.png"
              alt="Rian profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
              priority
            />
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
