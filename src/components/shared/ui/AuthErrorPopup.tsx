"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AuthErrorPopupIcon from "./AuthErrorPopupIcon";
import AuthErrorPopupTitle from "./AuthErrorPopupTitle";
import AuthErrorPopupMessage from "./AuthErrorPopupMessage";
import AuthErrorPopupActions from "./AuthErrorPopupActions";

interface AuthErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  errorCode?: string;
  onRetry?: () => void;
}

export default function AuthErrorPopup({
  isOpen,
  onClose,
  error,
  errorCode,
  onRetry,
}: AuthErrorPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getGradientClass = () => {
    switch (errorCode) {
      case "auth/account-exists-with-different-credential":
        return "from-gray-400 to-gray-600";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Popup with enhanced animations */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              rotateX: -10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              rotateX: -10,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 250,
              duration: 0.4,
            }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-1rem)] max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4 perspective-1000 popup-container"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl  border border-gray-200 dark:border-gray-700 overflow-hidden relative popup-scroll">
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${getGradientClass()} opacity-5 rounded-xl sm:rounded-2xl`}
              />

              <div className="relative p-4 sm:p-5 md:p-6">
                {/* Close button with hover effect */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors bg-white dark:bg-gray-800 rounded-full z-10 cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                {/* Icon with bounce animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                  }}
                  className="flex justify-center mb-3 sm:mb-4"
                >
                  <div
                    className={`p-3 sm:p-4 bg-gradient-to-r ${getGradientClass()} rounded-full `}
                  >
                    <AuthErrorPopupIcon errorCode={errorCode} />
                  </div>
                </motion.div>

                {/* Title with slide animation */}
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-base sm:text-lg md:text-xl font-bold text-center text-gray-900 dark:text-white mb-2 sm:mb-3"
                >
                  <AuthErrorPopupTitle errorCode={errorCode} />
                </motion.h3>

                {/* Message with fade animation */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-4 sm:mb-5 md:mb-6 px-1"
                >
                  <AuthErrorPopupMessage errorCode={errorCode} error={error} />
                </motion.p>

                {/* Action buttons with stagger animation */}
                <AuthErrorPopupActions
                  onRetry={onRetry}
                  onClose={handleClose}
                  getGradientClass={getGradientClass}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
