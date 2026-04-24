'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, User } from 'lucide-react';
import HeaderLogo from './HeaderLogo';
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    router.push('/');
  };

  const shouldBeTransparent = isHomePage && !scrolled;
  const textColor = shouldBeTransparent ? 'text-white' : 'text-[var(--navy)]';
  const headerBg = shouldBeTransparent ? 'bg-transparent' : 'bg-white shadow-sm';

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            {/* Left — Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${textColor} hover:text-[var(--champagne)]`}
            >
              <Menu className="w-5 h-5" />
              <span>Menü</span>
            </button>

            {/* Center — Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <HeaderLogo transparent={shouldBeTransparent} />
            </div>

            {/* Right — User */}
            {isLoggedIn ? (
              <ProfileDropdown
                user={user}
                show={showProfileDropdown}
                onToggle={() => setShowProfileDropdown(!showProfileDropdown)}
                onClose={() => setShowProfileDropdown(false)}
                dropdownRef={profileRef}
                textColor={textColor}
                onLogout={handleLogout}
              />
            ) : (
              <button
                onClick={() => setIsLoggedIn(true)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${textColor} hover:text-[var(--champagne)]`}
              >
                <User className="w-5 h-5" />
                <span>Anmelden</span>
              </button>
            )}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu
            isLoggedIn={isLoggedIn}
            user={user}
            onClose={() => setShowMobileMenu(false)}
            onLogout={handleLogout}
            onLogin={() => setIsLoggedIn(true)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
