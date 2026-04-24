'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Heart, ShoppingCart, FileText, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  user: { firstName: string; lastName: string; avatar: string };
  show: boolean;
  onToggle: () => void;
  onClose: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  textColor: string;
  onLogout: () => void;
};

export default function ProfileDropdown({ user, show, onToggle, onClose, dropdownRef, textColor, onLogout }: Props) {
  const menuItems = [
    { href: '/profil', icon: User, label: 'Mein Profil' },
    { href: '/meine-reisen', icon: Heart, label: 'Meine Reisen' },
    { href: '/warenkorb', icon: ShoppingCart, label: 'Warenkorb' },
    { href: '/dokumente', icon: FileText, label: 'Dokumente' },
    { href: '/profil', icon: Settings, label: 'Einstellungen' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${textColor} hover:text-[var(--champagne)]`}
      >
        <User className="w-5 h-5" />
        <span>Anmelden</span>
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-[var(--sand)] overflow-hidden ui-card"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-[var(--champagne)]/10 to-transparent border-b border-[var(--sand)]">
              <p className="text-xs text-[var(--navy)]/60 mb-1">Hallo</p>
              <p className="font-serif text-lg text-[var(--navy)] font-semibold">{user.firstName} {user.lastName}</p>
            </div>
            <div className="py-2">
              {menuItems.map(({ href, icon: Icon, label }) => (
                <Link key={label} href={href} onClick={onClose} className="flex items-center gap-3 px-6 py-3 text-[var(--navy)] hover:bg-[var(--champagne)]/5 transition-colors">
                  <Icon className="w-5 h-5 text-[var(--champagne)]" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
              <div className="border-t border-[var(--sand)] my-2" />
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Abmelden</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
