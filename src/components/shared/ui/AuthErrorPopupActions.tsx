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
    className="flex flex-col sm:flex-row gap-2 sm:gap-3"
  >
    {onRetry && (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        className={`flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r ${getGradientClass()} text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer`}
      >
        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Coba Provider Lain</span>
        <span className="sm:hidden">Coba Lagi</span>
      </motion.button>
    )}
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClose}
      className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-100 dark:bg-white/50 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm sm:text-base cursor-pointer"
    >
      Tutup
    </motion.button>
  </motion.div>
);

export default AuthErrorPopupActions;
