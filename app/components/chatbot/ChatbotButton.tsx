'use client';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatbotButton({ isOpen, onClick }: ChatbotButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isOpen ? 'Chat schließen' : 'Chat öffnen'}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-[#10B981] to-[#14B8A6] shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
    >
      {!isOpen && (
        <span className="absolute inset-0 rounded-full border-2 border-white/30" />
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isOpen ? 'close' : 'open'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
