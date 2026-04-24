'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import FooterBrand from './FooterBrand';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Logo, tagline & social icons */}
          <div className="lg:col-span-3">
            <FooterBrand />
          </div>

          {/* Schnellzugriff */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 text-[13px] uppercase tracking-wide">
              Schnellzugriff
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/reisen-finden', label: 'Reise finden' },
                { href: '/kreuzfahrten', label: 'Kreuzfahrten' },
                { href: '/reise-blog', label: 'Reise Blog' },
                { href: '/termin-buchen', label: 'Termin buchen' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-700 hover:text-[var(--champagne)] transition-colors text-[13px]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 text-[13px] uppercase tracking-wide">
              Service
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/profil', label: 'Mein Profil' },
                { href: '/meine-reisen', label: 'Meine Reisen' },
                { href: '/warenkorb', label: 'Wunschliste' },
                { href: '/dokumente', label: 'Dokumente' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-700 hover:text-[var(--champagne)] transition-colors text-[13px]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 text-[13px] uppercase tracking-wide">
              Kontakt
            </h3>
            <div className="text-gray-700 text-[13px] space-y-1">
              <p>Wangener Weg 25</p>
              <p>73760 Ostfildern</p>
              <p className="pt-2">
                <a href="tel:+491607968635" className="hover:text-[var(--champagne)] transition-colors">
                  Telefon: +49 160 796 86 35
                </a>
              </p>
              <p>
                <a href="mailto:info@betravel.de" className="hover:text-[var(--champagne)] transition-colors">
                  E-Mail: info@betravel.de
                </a>
              </p>
            </div>
          </div>

          {/* Zur Community card + payment icons */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--champagne)] rounded-lg p-5 max-w-[280px]">
              <h4 className="font-semibold text-white mb-1 text-sm">Zur Community</h4>
              <p className="text-white/90 text-xs mb-3.5">
                Bleib immer up to date und erhalte exklusive Einblicke
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Deine E-Mail-Adresse"
                  className="w-full px-3 py-2.5 rounded-md bg-white/95 border-0 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-[13px]"
                  required
                />
              </form>
            </div>

            {/* Payment Icons */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-[#1434CB]">
                VISA
              </div>
              <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#EB001B]" />
                  <div className="w-2 h-2 rounded-full bg-[#F79E1B]" />
                </div>
              </div>
              <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-[9px] font-bold text-[#016FD0]">
                AMEX
              </div>
              <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-[#003087]">
                PayPal
              </div>
              <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-semibold text-gray-700">
                SEPA
              </div>
              <div className="w-10 h-7 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-semibold text-[#FFB900]">
                Klarna
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue bottom bar */}
      <div className="bg-[var(--champagne)] py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-white">
            <div className="flex gap-4 text-[12px] flex-wrap justify-center md:justify-start">
              {['Mediadaten', 'Datenschutzerklärung', 'Impressum', 'AGB'].map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span>|</span>}
                  <a href="#" className="hover:underline">{label}</a>
                </React.Fragment>
              ))}
            </div>
            <p className="text-[12px]">
              Copyright © powered by beejees.communication GmbH
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
