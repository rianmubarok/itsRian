"use client";

import { Mail } from "lucide-react";
import { useIntersectionObserver } from "../../hooks";

const LetConnectSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const handleConnect = () => {
    window.location.href = "mailto:muhammadfitrianmubarok@gmail.com";
  };

  return (
    <section ref={ref} className="mb-16">
      <div className="sm:text-center mb-10 text-primary-dark dark:text-primary-light">
        <div
          className={`inline-flex items-center justify-center gap-3 transition-all duration-700 ease-out ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-5xl font-semibold leading-tight tracking-tighter">
            Let&apos;s Connect
          </h2>
          <img
            src="/icons/sparkles_color.svg"
            alt="Sparkles"
            className="w-7 h-7"
          />
        </div>
      </div>

      <div
        className={`border border-primary-gray/20 rounded-[18px] md:rounded-[20px] p-6 bg-gray-100 dark:bg-primary-light/5 transition-all duration-700 ease-out delay-300 max-w-3xl mx-auto`}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 ${
            isIntersecting
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Text */}
          <p className="text-base sm:text-lg text-primary-gray dark:text-gray-300 leading-relaxed">
            Ready to collaborate on your next project? <br />
            Let&apos;s discuss how we can bring your ideas to life.
          </p>

          {/* Button */}
          <div className="flex items-center gap-4 justify-start sm:justify-end">
            <button
              onClick={handleConnect}
              className="cursor-pointer connect-button relative"
            >
              <span className="relative z-[1] inline-flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetConnectSection;
