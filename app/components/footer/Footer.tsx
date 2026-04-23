'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import FooterBrand from './FooterBrand';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-white border-t border-[var(--sand)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-8 sm:mb-12">
          <FooterBrand />
          <div>
            <h3 className="font-semibold text-[var(--navy)] text-xs uppercase tracking-widest mb-5">Schnellzugriff</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Reise finden' },
                { href: '/kreuzfahrten', label: 'Kreuzfahrten' },
                { href: '/reise-blog', label: 'Reise Blog' },
                { href: '/termin-buchen', label: 'Termin buchen' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--navy)]/60 hover:text-[var(--champagne)] transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--navy)] text-xs uppercase tracking-widest mb-5">Service</h3>
            <ul className="space-y-3">
              {[
                { href: '/meine-reisen', label: 'Meine Reisen' },
                { href: '/warenkorb', label: 'Warenkorb' },
                { href: '/dokumente', label: 'Dokumente' },
                { href: '/profil', label: 'Mein Profil' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--navy)]/60 hover:text-[var(--champagne)] transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--navy)] text-xs uppercase tracking-widest mb-5">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--champagne)] flex-shrink-0 mt-0.5" />
                <div className="text-[var(--navy)]/60 text-sm">
                  <p>BeTravel GmbH</p>
                  <p>Königstraße 10A</p>
                  <p>70173 Stuttgart</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--champagne)]" />
                <a href="tel:+497111234567" className="text-[var(--navy)]/60 hover:text-[var(--champagne)] transition-colors text-sm">+49 711 123 456 7</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--champagne)]" />
                <a href="mailto:info@betravel.de" className="text-[var(--navy)]/60 hover:text-[var(--champagne)] transition-colors text-sm">info@betravel.de</a>
              </li>
            </ul>
          </div>
          <div className="bg-[var(--champagne)] p-6 text-white ui-panel">
            <h3 className="font-semibold text-base mb-2">Newsletter abonnieren</h3>
            <p className="text-white/80 text-sm mb-5">Erhalten Sie exklusive Angebote und Reiseinspirationen direkt in Ihr Postfach.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ihre E-Mail-Adresse"
              className="w-full px-4 py-3 bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:border-white mb-3 text-sm ui-control"
            />
            <button className="w-full px-4 py-3 bg-white text-[var(--champagne)] font-semibold text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2 ui-control">
              <Send className="w-4 h-4" />
              Abonnieren
            </button>
          </div>
        </div>
        <div className="border-t border-[var(--sand)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--navy)]/50 text-sm">© {new Date().getFullYear()} BeTravel GmbH. Alle Rechte vorbehalten.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
              {['Impressum', 'Datenschutz', 'AGB', 'Cookie-Einstellungen'].map((label) => (
                <a key={label} href="#" className="text-[var(--navy)]/50 hover:text-[var(--champagne)] transition-colors">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
