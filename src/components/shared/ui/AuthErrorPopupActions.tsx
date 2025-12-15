import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface AuthErrorPopupActionsProps {
  onRetry?: () => void;
  onClose: () => void;
  getGradientClass: () => string;
}

const AuthErrorPopupActions: React.FC<AuthErrorPopupActionsProps> = ({
  onRetry,
  onClose,
  getGradientClass,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.4 }}
    className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full"
  >
    {onRetry && (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        className="w-full sm:w-auto px-6 py-3 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer h-auto whitespace-normal text-center shadow-lg hover:shadow-xl"
      >
        <RefreshCw className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline break-words">Try Another Provider</span>
        <span className="sm:hidden">Try Again</span>
      </motion.button>
    )}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClose}
      className="w-full sm:w-auto px-6 py-3 border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-primary-light/5 rounded-full font-medium transition-all duration-300 flex items-center justify-center text-sm sm:text-base cursor-pointer h-auto whitespace-normal text-center"
    >
      Close
    </motion.button>
  </motion.div>
);

export default AuthErrorPopupActions;
