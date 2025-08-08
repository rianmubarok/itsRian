import { FooterContent } from "./footer-components/index";

export default function Footer() {
  return (
    <footer className="border-t border-primary-gray/20 py-6 sm:py-8 mt-16 sm:mt-20 md:mt-24">
      <div className="max-w-6xl mx-auto ">
        <FooterContent />
      </div>
    </footer>
  );
}
