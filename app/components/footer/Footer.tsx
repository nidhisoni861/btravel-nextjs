'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import FooterBrand from './FooterBrand';

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <FooterBrand />
          <div>
            <h3 className="font-serif text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[{ href: '/', label: 'Find Trips' }, { href: '/kreuzfahrten', label: 'Cruises' }, { href: '/reise-blog', label: 'Travel Blog' }, { href: '/termin-buchen', label: 'Book Appointment' }, { href: '/meine-reisen', label: 'My Trips' }].map(({ href, label }) => (
                <li key={href}><Link href={href} className="text-white/70 hover:text-[var(--champagne)] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-6">Customer Service</h3>
            <ul className="space-y-3">
              {[{ href: '/login', label: 'Customer Portal' }, { href: '/warenkorb', label: 'Cart' }, { href: '/dokumente', label: 'My Documents' }, { href: '/profil', label: 'Profile Settings' }].map(({ href, label }) => (
                <li key={href}><Link href={href} className="text-white/70 hover:text-[var(--champagne)] transition-colors">{label}</Link></li>
              ))}
              <li><a href="#" className="text-white/70 hover:text-[var(--champagne)] transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--champagne)] flex-shrink-0 mt-0.5" />
                <div className="text-white/70"><p>BeTravel GmbH</p><p>Königstraße 10A</p><p>70173 Stuttgart</p></div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--champagne)]" />
                <a href="tel:+497111234567" className="text-white/70 hover:text-[var(--champagne)] transition-colors">+49 711 123 456 7</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--champagne)]" />
                <a href="mailto:info@betravel.de" className="text-white/70 hover:text-[var(--champagne)] transition-colors">info@betravel.de</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© {new Date().getFullYear()} BeTravel. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              {['Imprint', 'Privacy', 'Terms'].map((label) => (
                <a key={label} href="#" className="text-white/60 hover:text-[var(--champagne)] transition-colors">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
