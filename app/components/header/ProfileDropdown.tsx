'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, User, Heart, ShoppingCart, FileText, Settings, LogOut } from 'lucide-react';
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
    { href: '/profil', icon: User, label: 'My Profile' },
    { href: '/meine-reisen', icon: Heart, label: 'My Trips' },
    { href: '/warenkorb', icon: ShoppingCart, label: 'Cart' },
    { href: '/dokumente', icon: FileText, label: 'Documents' },
    { href: '/profil', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={onToggle} className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[var(--champagne)]/5 transition-all">
        <div className="w-9 h-9 rounded-full border-2 border-[var(--champagne)] overflow-hidden flex-shrink-0">
          <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
        </div>
        <span className={`text-sm font-medium ${textColor} hidden xl:block`}>{user.firstName}</span>
        <ChevronDown className={`w-4 h-4 ${textColor} hidden xl:block transition-transform ${show ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-[var(--sand)] overflow-hidden"
          >
            <div className="px-6 py-4 bg-gradient-to-r from-[var(--champagne)]/10 to-transparent border-b border-[var(--sand)]">
              <p className="text-xs text-[var(--navy)]/60 mb-1">Hello</p>
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
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
