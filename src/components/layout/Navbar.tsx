"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "../shared/common/ThemeToggle";
import {
  DesktopNavigation,
  MobileNavigation,
  HamburgerButton,
} from "./navbar/index";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-0 sm:pt-5 translate-y-0`}
    >
      <div className="mx-auto px-6 sm:px-4 sm:max-w-xl bg-primary-light/80 dark:bg-primary-dark/80 backdrop-blur-md border-b border-primary-gray/20 md:rounded-full md:border md:border-primary-gray/20">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Profile Image */}
          <Link href="/" aria-label="Home - itsRian Portfolio">
            <div
              className="relative w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-gpu ${
                  isHovered ? "rotate-y-180" : "rotate-y-0"
                }`}
              >
                {/* Front side - profile.png */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <Image
                    src="/img/profile.png"
                    alt="Rian profile"
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full object-cover"
                    priority
                  />
                </div>
                {/* Back side - profile-switch.png */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <Image
                    src="/img/profile-switch.png"
                    alt="Rian profile switch"
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - Mobile Only */}
            <div className="sm:hidden">
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
