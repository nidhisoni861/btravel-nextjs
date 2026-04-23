'use client';
import { motion } from 'motion/react';
import { X, Calendar, Users, MapPin, Star } from 'lucide-react';

type Offer = { id: number; title: string; image: string; description: string };

type Props = { offer: Offer; onClose: () => void };

const shipImages = [
  'https://images.unsplash.com/photo-1697124510322-27ef594f67fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTc0NDU5MXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzU3NDQ1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzU3NDQ1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

const highlights = [
  { title: 'Private Suite with Balcony', desc: '45m² luxury with sea view' },
  { title: 'Michelin Restaurants', desc: '3 gourmet restaurants on board' },
  { title: 'Exclusive Shore Excursions', desc: 'Private tours in every port' },
  { title: 'Personal Butler', desc: '24/7 concierge service' },
];

export default function OfferDetails({ offer, onClose }: Props) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }} className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl ui-panel" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src={offer.image} alt={offer.title} className="w-full h-72 object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[var(--navy)]" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
            <h2 className="font-serif text-4xl text-white mb-2">{offer.title}</h2>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span className="text-sm">Mediterranean Route</span></div>
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span className="text-sm">7 Days / 6 Nights</span></div>
              <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" /><span className="text-sm">5-Star Luxury</span></div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <h3 className="font-serif text-2xl text-[var(--navy)] mb-4">About This Trip</h3>
            <p className="text-[var(--navy)]/70 leading-relaxed">Experience ultimate luxury on our exclusive Mediterranean cruise. This 7-day journey takes you to the most beautiful ports of the Mediterranean, while you reside in a suite with a private balcony. Enjoy first-class service, Michelin-starred cuisine and exclusive shore excursions.</p>
          </div>
          <div className="mb-8">
            <h3 className="font-serif text-2xl text-[var(--navy)] mb-4">Ship & Cabin</h3>
            <div className="grid grid-cols-3 gap-4">
              {shipImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden aspect-[4/3] group ui-card">
                  <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-serif text-2xl text-[var(--navy)] mb-4">Highlights</h3>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--champagne)] rounded-full mt-2 flex-shrink-0" />
                  <div><h4 className="text-[var(--navy)] font-medium">{h.title}</h4><p className="text-[var(--navy)]/60 text-sm">{h.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t-2 border-[var(--sand)] pt-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[var(--navy)]/60 text-sm mb-1">From</p>
                <p className="font-serif text-4xl text-[var(--navy)]">€ 8.950</p>
                <p className="text-[var(--navy)]/60 text-sm">per person</p>
              </div>
              <div className="flex gap-3">
                <button className="px-8 py-3 border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors ui-control">More Info</button>
                <button className="px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors ui-control">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
