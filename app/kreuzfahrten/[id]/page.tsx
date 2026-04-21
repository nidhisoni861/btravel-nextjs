'use client';
import { motion } from 'motion/react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react';
import { cruises } from '../../data/cruises';
import CruiseDetailContent from '../../components/cruise/CruiseDetailContent';
import CruiseDetailSidebar from '../../components/cruise/CruiseDetailSidebar';
import Link from 'next/link';

export default function KreuzfahrtDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const cruise = cruises.find((c) => c.id === Number(id));

  if (!cruise) {
    return (
      <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[var(--navy)] mb-4">Cruise not found</h1>
          <Link href="/kreuzfahrten" className="text-[var(--champagne)] hover:underline">Back to Overview</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="relative h-[70vh]">
        <img src={cruise.image} alt={cruise.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button onClick={() => router.push('/kreuzfahrten')}
          className="absolute top-32 left-8 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-[var(--navy)] hover:bg-white transition-colors">
          <ArrowLeft className="w-5 h-5" /><span>Back</span>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <div className="max-w-[1400px] mx-auto">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl md:text-6xl mb-4">{cruise.title}</motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-lg">
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{cruise.destination}</span>
              <span className="flex items-center gap-2"><Calendar className="w-5 h-5" />{cruise.duration}</span>
              <span className="flex items-center gap-2"><Users className="w-5 h-5" />{cruise.passengers}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <CruiseDetailContent
            description={cruise.description}
            highlights={cruise.highlights}
            route={cruise.route}
            included={cruise.included}
            notIncluded={cruise.notIncluded}
          />
          <CruiseDetailSidebar price={cruise.price} date={cruise.date} duration={cruise.duration} />
        </div>
      </div>
    </div>
  );
}
