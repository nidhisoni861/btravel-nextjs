'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart } from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HelpDropdown from './HelpDropdown';
import ProfileDropdown from './ProfileDropdown';
import MobileMenu from './MobileMenu';

const user = {
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'max.mustermann@example.com',
  avatar: '/profile-image.png',
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => isHomePage && setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfileDropdown(false);
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) setShowHelpDropdown(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => { setIsLoggedIn(false); setShowProfileDropdown(false); router.push('/'); };
  const textColor = isHomePage && !scrolled ? 'text-white' : 'text-[var(--navy)]';
  const headerBg = isHomePage ? (scrolled ? 'bg-white shadow-md' : 'bg-transparent') : 'bg-white shadow-md';

  return (
    <>
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            <HeaderLogo />
            <HeaderNav textColor={textColor} />
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn && (
                <>
                  <HelpDropdown show={showHelpDropdown} onToggle={() => { setShowHelpDropdown(!showHelpDropdown); setShowProfileDropdown(false); }} dropdownRef={helpRef} textColor={textColor} />
                  <Link href="/meine-reisen" className={`relative flex items-center gap-2 px-3 py-2 transition-all ui-control ${pathname === '/meine-reisen' ? 'text-[var(--champagne)] bg-[var(--champagne)]/10' : `${textColor} hover:text-[var(--champagne)] hover:bg-[var(--champagne)]/5`}`} title="Favorites">
                    <Heart className={`w-5 h-5 ${pathname === '/meine-reisen' ? 'fill-[var(--champagne)]' : ''}`} />
                  </Link>
                  <ProfileDropdown user={user} show={showProfileDropdown} onToggle={() => { setShowProfileDropdown(!showProfileDropdown); setShowHelpDropdown(false); }} onClose={() => setShowProfileDropdown(false)} dropdownRef={profileRef} textColor={textColor} onLogout={handleLogout} />
                </>
              )}
              {!isLoggedIn && (
                <div className="flex items-center gap-3">
                  <Link href="/registrierung" className={`text-sm font-medium transition-colors ${textColor} hover:text-[var(--champagne)]`}>Registrieren</Link>
                  <button onClick={() => setIsLoggedIn(true)} className="px-5 py-2 bg-[var(--champagne)] text-white text-sm font-semibold hover:bg-[var(--champagne)]/90 transition-all hover:shadow-lg ui-control">Anmelden</button>
                </div>
              )}
            </div>
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className={`lg:hidden w-10 h-10 flex items-center justify-center ${textColor} hover:bg-[var(--champagne)]/5 transition-colors ui-control`}>
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu isLoggedIn={isLoggedIn} user={user} onClose={() => setShowMobileMenu(false)} onLogout={handleLogout} onLogin={() => setIsLoggedIn(true)} />
        )}
      </AnimatePresence>
    </>
  );
}
