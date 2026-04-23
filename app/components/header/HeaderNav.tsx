'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Anchor, BookOpen, CalendarDays } from 'lucide-react';

const navLinks = [
  { path: '/reisen-finden', label: 'Reise finden', icon: Search },
  { path: '/kreuzfahrten', label: 'Kreuzfahrten', icon: Anchor },
  { path: '/reise-blog', label: 'Reise Blog', icon: BookOpen },
  { path: '/termin-buchen', label: 'Termin buchen', icon: CalendarDays },
];

type Props = { textColor: string };

export default function HeaderNav({ textColor }: Props) {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all relative group ${
            pathname === link.path
              ? 'text-[var(--champagne)]'
              : `${textColor} hover:text-[var(--champagne)]`
          }`}
        >
          <link.icon className="w-4 h-4" />
          {link.label}
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-[var(--champagne)] transition-all ${
              pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
