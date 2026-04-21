'use client';
import { motion } from 'motion/react';
import { Calendar, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const upcomingTrips = [
  { id: 1, destination: 'Malediven - Privatinsel Retreat', dates: '15. Juni - 22. Juni 2026', status: 'Confirmed', image: 'https://images.unsplash.com/photo-1762961881563-66852e1e4527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjB0cmF2ZWwlMjBleG90aWMlMjBkZXN0aW5hdGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzU3MzcwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080', travelers: 2 },
  { id: 2, destination: 'Japan - Kulinarische Entdeckungsreise', dates: '10. August - 24. August 2026', status: 'Planning', image: 'https://images.unsplash.com/photo-1753898464732-85e0f3df8a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjB0cmF2ZWwlMjBleG90aWMlMjBkZXN0aW5hdGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzU3MzcwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080', travelers: 2 },
];

const recentActivity = [
  { action: 'Travel proposal received', trip: 'Maldives', time: '2 days ago' },
  { action: 'Booking confirmed', trip: 'Maldives', time: '5 days ago' },
  { action: 'Request submitted', trip: 'Japan', time: '1 week ago' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--sand-light)]">
      <div className="bg-[var(--navy)] text-white px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-5xl mb-3">Welcome back, Maria</h1>
            <p className="text-white/70 text-lg">Your personal travel overview</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h2 className="font-serif text-3xl text-[var(--navy)] mb-6">Your Trips</h2>
              <div className="space-y-6">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 flex-shrink-0 overflow-hidden">
                        <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-serif text-xl text-[var(--navy)] group-hover:text-[var(--champagne)] transition-colors">{trip.destination}</h3>
                          <span className={`px-3 py-1 text-xs ${trip.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{trip.status}</span>
                        </div>
                        <div className="space-y-2 text-sm text-[var(--navy)]/70">
                          <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{trip.dates}</div>
                          <div className="flex items-center gap-2"><Users className="w-4 h-4" />{trip.travelers} travelers</div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[var(--champagne)] group-hover:translate-x-2 transition-transform">
                          View details <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/booking">
                <motion.button className="mt-6 w-full py-4 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>Plan New Trip</motion.button>
              </Link>
            </motion.div>
          </div>
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white p-6 shadow-lg">
              <h3 className="font-serif text-xl text-[var(--navy)] mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="pb-4 border-b border-[var(--sand)] last:border-0">
                    <div className="text-[var(--navy)] text-sm mb-1">{activity.action}</div>
                    <div className="text-[var(--navy)]/60 text-xs">{activity.trip}</div>
                    <div className="flex items-center gap-1 text-[var(--navy)]/40 text-xs mt-2"><Clock className="w-3 h-3" />{activity.time}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-white p-6 shadow-lg">
              <h3 className="font-serif text-xl text-[var(--navy)] mb-6">Quick Access</h3>
              <div className="space-y-3">
                {['Download documents', 'Contact travel advisor', 'Payment history'].map((label) => (
                  <button key={label} className="w-full p-3 border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-colors text-left text-sm text-[var(--navy)]">{label}</button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
