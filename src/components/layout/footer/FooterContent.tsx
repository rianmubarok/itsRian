import ThemeToggle from "../../shared/common/ThemeToggle";
import SocialLinks from "./SocialLinks";

export default function FooterContent() {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <p className="text-xs sm:text-sm font-medium text-primary-dark dark:text-primary-light">
        Muhammad Fitrian Mubarok ⏤ 2025
      </p>
      <div className="flex items-center gap-4 sm:gap-6">
        <SocialLinks />

        {/* Theme Toggle - Desktop Only */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
