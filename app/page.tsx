'use client';
import { motion } from 'motion/react';
import InquiryForm from './components/InquiryForm';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1762961881563-66852e1e4527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjB0cmF2ZWwlMjBleG90aWMlMjBkZXN0aW5hdGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzU3MzcwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Luxury travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/60 via-[var(--navy)]/40 to-[var(--navy)]/80" />
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-32">
        <div className="max-w-[900px] w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center mb-16">
            <h1 className="font-serif text-6xl md:text-7xl text-white mb-6 leading-tight">
              Extraordinary Journeys<br /><span className="text-[var(--champagne)]">Tailored to You</span>
            </h1>
            <p className="text-white/80 text-lg max-w-[600px] mx-auto">Discover the world with our exclusive travel service</p>
          </motion.div>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
