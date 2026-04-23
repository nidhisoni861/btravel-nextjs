'use client';
import { motion } from 'motion/react';

type Stop = { day: number; port: string; description: string };
type Props = {
  description: string;
  highlights: string[];
  route: Stop[];
  included: string[];
  notIncluded: string[];
};

export default function CruiseDetailContent({ description, highlights, route, included, notIncluded }: Props) {
  return (
    <div className="lg:col-span-2 space-y-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h2 className="font-serif text-3xl text-[var(--navy)] mb-4">Description</h2>
        <p className="text-[var(--navy)]/70 text-lg leading-relaxed">{description}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <h2 className="font-serif text-3xl text-[var(--navy)] mb-6">Highlights</h2>
        <div className="flex flex-wrap gap-3">
          {highlights.map((h, i) => <span key={i} className="px-4 py-2 bg-[var(--champagne)]/10 border-2 border-[var(--champagne)] text-[var(--navy)] font-medium ui-control">{h}</span>)}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <h2 className="font-serif text-3xl text-[var(--navy)] mb-6">Itinerary</h2>
        <div className="space-y-4">
          {route.map((stop, i) => (
            <div key={i} className="flex gap-4 p-6 bg-[var(--sand-light)] border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-colors ui-card">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[var(--champagne)] text-white flex items-center justify-center font-serif text-xl ui-control">{stop.day}</div>
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--navy)] mb-1">{stop.port}</h3>
                <p className="text-[var(--navy)]/70">{stop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-serif text-2xl text-[var(--navy)] mb-4">Included</h3>
          <ul className="space-y-2">
            {included.map((item, i) => <li key={i} className="flex items-start gap-3"><span className="text-green-600 mt-1">✓</span><span className="text-[var(--navy)]/70">{item}</span></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-2xl text-[var(--navy)] mb-4">Not Included</h3>
          <ul className="space-y-2">
            {notIncluded.map((item, i) => <li key={i} className="flex items-start gap-3"><span className="text-red-600 mt-1">✗</span><span className="text-[var(--navy)]/70">{item}</span></li>)}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
