'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Search, Anchor, BookOpen, CalendarDays, Heart, ShoppingCart, User, FileText, Settings, LogOut, HelpCircle, Phone, Mail } from 'lucide-react';

const navLinks = [
  { path: '/reisen-finden', label: 'Reise finden', icon: Search },
  { path: '/kreuzfahrten', label: 'Kreuzfahrten', icon: Anchor },
  { path: '/reise-blog', label: 'Reise Blog', icon: BookOpen },
  { path: '/termin-buchen', label: 'Termin buchen', icon: CalendarDays },
];

type Props = {
  isLoggedIn: boolean;
  user: { firstName: string; lastName: string; avatar: string };
  onClose: () => void;
  onLogout: () => void;
  onLogin: () => void;
};

export default function MobileMenu({ isLoggedIn, user, onClose, onLogout, onLogin }: Props) {
  const pathname = usePathname();
  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 z-40 lg:hidden bg-white pt-20 overflow-y-auto"
    >
      <div className="px-6 py-6">
        <nav className="flex flex-col gap-2 mb-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${pathname === link.path ? 'bg-[var(--champagne)]/10 text-[var(--champagne)]' : 'text-[var(--navy)] hover:bg-[var(--sand-light)]'}`}>
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>
        {isLoggedIn && (
          <>
            <div className="mb-8 pb-8 border-b border-[var(--sand)]">
              <h3 className="text-xs font-semibold text-[var(--navy)]/60 uppercase tracking-wider mb-3 px-4">Schnellzugriff</h3>
              <div className="flex flex-col gap-2">
                <Link href="/meine-reisen" onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-[var(--navy)] hover:bg-[var(--sand-light)] rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-[var(--champagne)]" /><span className="text-sm font-medium">Meine Reisen</span>
                </Link>
                <Link href="/warenkorb" onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-[var(--navy)] hover:bg-[var(--sand-light)] rounded-lg transition-colors">
                  <ShoppingCart className="w-5 h-5 text-[var(--champagne)]" /><span className="text-sm font-medium">Warenkorb</span>
                </Link>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-center gap-4 px-4 py-4 bg-gradient-to-r from-[var(--champagne)]/10 to-transparent rounded-lg mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--champagne)] overflow-hidden flex-shrink-0">
                  <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs text-[var(--navy)]/60">Angemeldet als</p>
                  <p className="font-semibold text-[var(--navy)]">{user.firstName} {user.lastName}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {[{ href: '/profil', icon: User, label: 'Mein Profil' }, { href: '/dokumente', icon: FileText, label: 'Dokumente' }, { href: '/profil', icon: Settings, label: 'Einstellungen' }].map(({ href, icon: Icon, label }) => (
                  <Link key={label} href={href} onClick={onClose} className="flex items-center gap-3 px-4 py-3 text-[var(--navy)] hover:bg-[var(--sand-light)] rounded-lg transition-colors">
                    <Icon className="w-5 h-5 text-[var(--champagne)]" /><span className="text-sm font-medium">{label}</span>
                  </Link>
                ))}
                <button onClick={() => { onLogout(); onClose(); }} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" /><span className="text-sm font-medium">Abmelden</span>
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[var(--champagne)]/5 to-transparent rounded-xl p-6 border border-[var(--sand)]">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--champagne)]/10 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-[var(--champagne)]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[var(--navy)] mb-1">Hilfe & Kontakt</h3>
                  <p className="text-sm text-[var(--navy)]/60">Täglich von 9 bis 22 Uhr für Sie da</p>
                </div>
              </div>
              <div className="space-y-3">
                <a href="tel:+497111234567" className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:bg-[var(--champagne)]/5 transition-colors border border-[var(--sand)]">
                  <Phone className="w-5 h-5 text-[var(--champagne)]" />
                  <div><p className="text-xs text-[var(--navy)]/60">Telefon</p><p className="text-sm font-semibold text-[var(--navy)]">+49 711 123 456 7</p></div>
                </a>
                <a href="mailto:info@betravel.de" className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:bg-[var(--champagne)]/5 transition-colors border border-[var(--sand)]">
                  <Mail className="w-5 h-5 text-[var(--champagne)]" />
                  <div><p className="text-xs text-[var(--navy)]/60">E-Mail</p><p className="text-sm font-semibold text-[var(--navy)]">info@betravel.de</p></div>
                </a>
              </div>
            </div>
          </>
        )}
        {!isLoggedIn && (
          <div className="flex flex-col gap-3">
            <Link href="/registrierung" onClick={onClose} className="w-full py-3 border-2 border-[var(--sand)] text-[var(--navy)] text-center rounded-lg font-medium hover:border-[var(--champagne)] transition-colors">Registrieren</Link>
            <button onClick={() => { onLogin(); onClose(); }} className="w-full py-3 bg-[var(--champagne)] text-white rounded-lg font-semibold hover:bg-[var(--champagne)]/90 transition-colors">Anmelden</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
