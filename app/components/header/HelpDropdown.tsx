'use client';
import { HelpCircle, ChevronDown, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  show: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  textColor: string;
};

export default function HelpDropdown({ show, onToggle, dropdownRef, textColor }: Props) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${textColor} hover:text-[var(--champagne)] hover:bg-[var(--champagne)]/5`}
      >
        <HelpCircle className="w-5 h-5" />
        <ChevronDown className={`w-4 h-4 transition-transform ${show ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-[var(--sand)] overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[var(--champagne)]/10 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-[var(--champagne)]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[var(--navy)] mb-1">Fragen zu Ihrer Reise?</h3>
                  <p className="text-sm text-[var(--navy)]/60">Unser Service-Team ist täglich von 9 bis 22 Uhr für Sie da.</p>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <a href="tel:+497111234567" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--champagne)]/5 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-[var(--champagne)]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--champagne)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[var(--navy)]/60 mb-0.5">Telefon</p>
                    <p className="text-sm font-semibold text-[var(--navy)] group-hover:text-[var(--champagne)] transition-colors">+49 711 123 456 7</p>
                  </div>
                </a>
                <a href="mailto:info@betravel.de" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--champagne)]/5 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-[var(--champagne)]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--champagne)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[var(--navy)]/60 mb-0.5">E-Mail</p>
                    <p className="text-sm font-semibold text-[var(--navy)] group-hover:text-[var(--champagne)] transition-colors">info@betravel.de</p>
                  </div>
                </a>
              </div>
              <div className="pt-4 border-t border-[var(--sand)]">
                <p className="text-xs text-[var(--navy)]/60 mb-3">Buchen Sie Ihren Urlaub schnell und einfach per Telefon</p>
                <a href="tel:+497111234567" className="block w-full px-4 py-2.5 bg-[var(--champagne)] text-white text-center text-sm font-semibold rounded-lg hover:bg-[var(--champagne)]/90 transition-colors">
                  Jetzt anrufen
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
