'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Users, Heart, Ship } from 'lucide-react';
import Link from 'next/link';
import { cruises } from '../data/cruises';

export default function KreuzfahrtenPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const toggleFavorite = (id: number) => setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200" alt="Luxury Cruise" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[var(--navy)]/60" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-8">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-6xl text-white mb-6">Cruise Offers</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-xl">Discover the world on luxurious cruise ships</motion.p>
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {cruises.map((cruise, index) => (
            <motion.div key={cruise.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-all overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <img src={cruise.image} alt={cruise.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button onClick={() => toggleFavorite(cruise.id)} className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className={`w-5 h-5 ${favorites.includes(cruise.id) ? 'fill-red-500 text-red-500' : 'text-[var(--navy)]'}`} />
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-[var(--navy)] mb-4">{cruise.title}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-[var(--navy)]/70"><MapPin className="w-5 h-5 text-[var(--champagne)]" /><span>{cruise.destination}</span></div>
                  <div className="flex items-center gap-3 text-[var(--navy)]/70"><Calendar className="w-5 h-5 text-[var(--champagne)]" /><span>{cruise.duration} • {cruise.date}</span></div>
                  <div className="flex items-center gap-3 text-[var(--navy)]/70"><Users className="w-5 h-5 text-[var(--champagne)]" /><span>{cruise.passengers}</span></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {cruise.highlights.map((h, i) => <span key={i} className="px-3 py-1 bg-[var(--sand-light)] text-[var(--navy)] text-sm">{h}</span>)}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--navy)]/60">From</p>
                    <p className="font-serif text-3xl text-[var(--navy)]">€ {cruise.price.toLocaleString()}</p>
                    <p className="text-sm text-[var(--navy)]/60">per person</p>
                  </div>
                  <Link href={`/kreuzfahrten/${cruise.id}`} className="px-8 py-3 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors">View Details</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
