'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Ship, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

type Props = { price: number; date: string; duration: string };

export default function CruiseDetailSidebar({ price, date, duration }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1">
      <div className="sticky top-32 bg-white border-2 border-[var(--sand)] p-5 sm:p-8">
        <div className="mb-6">
          <p className="text-sm text-[var(--navy)]/60 mb-2">From</p>
          <p className="font-serif text-4xl text-[var(--navy)] mb-1">€ {price.toLocaleString()}</p>
          <p className="text-sm text-[var(--navy)]/60">per person</p>
        </div>
        <div className="space-y-4 mb-6 pb-6 border-b-2 border-[var(--sand)]">
          <div className="flex items-center gap-3 text-[var(--navy)]/70"><Calendar className="w-5 h-5 text-[var(--champagne)]" /><span>{date}</span></div>
          <div className="flex items-center gap-3 text-[var(--navy)]/70"><Ship className="w-5 h-5 text-[var(--champagne)]" /><span>{duration}</span></div>
        </div>
        <div className="space-y-3">
          <button onClick={() => alert('Cruise added to cart!')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors">
            <ShoppingCart className="w-5 h-5" /><span>Add to Cart</span>
          </button>
          <button onClick={() => setIsFavorite(!isFavorite)}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 border-2 transition-colors ${isFavorite ? 'border-red-500 text-red-500 bg-red-50' : 'border-[var(--sand)] text-[var(--navy)] hover:border-[var(--champagne)]'}`}>
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
            <span>{isFavorite ? 'Remove Favorite' : 'Add to Favorites'}</span>
          </button>
          <Link href="/termin-buchen" className="block w-full px-6 py-4 border-2 border-[var(--sand)] text-center text-[var(--navy)] hover:border-[var(--champagne)] transition-colors">
            Book Consultation
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
