'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, MapPin, Calendar, Users, Trash2 } from 'lucide-react';
import Link from 'next/link';

const savedTrips = [
  { id: 1, title: 'Mediterranean Cruise: 7 Days Luxury', destination: 'Barcelona → Venice', duration: '7 Days / 6 Nights', date: 'May - September 2027', price: 3299, image: 'https://images.unsplash.com/photo-1722914873924-cf64eafb6175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', passengers: 'Max. 2000', highlights: ['Michelin-Restaurants', 'Spa & Wellness', 'Private Suites'] },
  { id: 2, title: 'Alaska Cruise: Glaciers & Wilderness', destination: 'Vancouver → Seward', duration: '7 Days / 6 Nights', date: 'July - August 2027', price: 5385, image: 'https://images.unsplash.com/photo-1605978221138-0be1cae9204b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', passengers: 'Max. 1500', highlights: ['Hubbard Glacier', 'Whale Watching', 'Ocean Terrace Suites'] },
  { id: 4, title: 'Norway: Fjords & Northern Lights', destination: 'Hamburg → Tromsø', duration: '12 Days / 11 Nights', date: 'September - March 2027', price: 6499, image: 'https://images.unsplash.com/photo-1679129429152-cdc310daac38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', passengers: 'Max. 1200', highlights: ['Northern Lights', 'Fjord Tours', 'Winter Landscape'] },
];

export default function MeineReisenPage() {
  const [favorites, setFavorites] = useState(savedTrips);
  const removeFavorite = (id: number) => setFavorites((prev) => prev.filter((t) => t.id !== id));

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
          <Heart className="w-24 h-24 mx-auto mb-6 text-[var(--sand)]" />
          <h2 className="font-serif text-3xl text-[var(--navy)] mb-4">No favorites saved yet</h2>
          <p className="text-[var(--navy)]/70 mb-8">Discover our cruises and save your favorites</p>
          <Link href="/kreuzfahrten" className="inline-block px-8 py-4 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors">Discover Cruises</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8 sm:mb-16">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--champagne)] fill-[var(--champagne)]" />
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[var(--navy)]">My Trips</h1>
          </div>
          <p className="text-[var(--navy)]/70 text-base sm:text-lg">Your saved favorites and dream trips</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favorites.map((trip, index) => (
            <motion.div key={trip.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-all overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button onClick={() => removeFavorite(trip.id)} className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-[var(--navy)] mb-4">{trip.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[var(--navy)]/70 text-sm"><MapPin className="w-4 h-4 text-[var(--champagne)]" /><span>{trip.destination}</span></div>
                  <div className="flex items-center gap-2 text-[var(--navy)]/70 text-sm"><Calendar className="w-4 h-4 text-[var(--champagne)]" /><span>{trip.duration} • {trip.date}</span></div>
                  <div className="flex items-center gap-2 text-[var(--navy)]/70 text-sm"><Users className="w-4 h-4 text-[var(--champagne)]" /><span>{trip.passengers}</span></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {trip.highlights.slice(0, 2).map((h, i) => <span key={i} className="px-2 py-1 bg-[var(--sand-light)] text-[var(--navy)] text-xs">{h}</span>)}
                </div>
                <div className="border-t-2 border-[var(--sand)] pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div><p className="text-xs text-[var(--navy)]/60">From</p><p className="font-serif text-2xl text-[var(--navy)]">€ {trip.price.toLocaleString()}</p></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => alert('Trip added to cart!')} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--champagne)] text-white hover:bg-[var(--champagne)]/90 transition-colors">
                      <ShoppingCart className="w-4 h-4" /><span className="text-sm">Add to Cart</span>
                    </button>
                    <button onClick={() => removeFavorite(trip.id)} className="px-4 py-3 border-2 border-[var(--sand)] text-[var(--navy)] hover:border-red-500 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 text-center">
          <Link href="/kreuzfahrten" className="inline-block px-8 py-4 border-2 border-[var(--sand)] text-[var(--navy)] hover:border-[var(--champagne)] transition-colors">Discover More Cruises</Link>
        </motion.div>
      </div>
    </div>
  );
}
