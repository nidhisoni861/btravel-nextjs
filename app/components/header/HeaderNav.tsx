'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { path: '/', label: 'Find Trips' },
  { path: '/kreuzfahrten', label: 'Cruises' },
  { path: '/reise-blog', label: 'Travel Blog' },
  { path: '/termin-buchen', label: 'Book Appointment' },
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
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative group ${
            pathname === link.path
              ? 'text-[var(--champagne)]'
              : `${textColor} hover:text-[var(--champagne)]`
          }`}
        >
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
