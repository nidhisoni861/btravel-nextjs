'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Phone, Mail, MessageCircle } from 'lucide-react';
import OfferDetails from './OfferDetails';

const offers = [
  { id: 1, title: 'Offer 1', image: 'https://images.unsplash.com/photo-1679586491833-50f5af25e58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb3VudGFpbiUyMGxha2UlMjBzdW5zZXQlMjB3YXJtJTIwY29sb3JzfGVufDF8fHx8MTc3NTc0NDI2MXww&ixlib=rb-4.1.0&q=80&w=1080', description: 'Luxurious mountain retreat' },
  { id: 2, title: 'Offer 2', image: 'https://images.unsplash.com/photo-1739254513646-b199b2bc47bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb3VudGFpbiUyMGxha2UlMjBzdW5zZXQlMjB3YXJtJTIwY29sb3JzfGVufDF8fHx8MTc3NTc0NDI2MXww&ixlib=rb-4.1.0&q=80&w=1080', description: 'Relaxation by crystal-clear lake' },
  { id: 3, title: 'Offer 3', image: 'https://images.unsplash.com/photo-1697448025195-f354eeed956a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBtb3VudGFpbiUyMGxha2UlMjBzdW5zZXQlMjB3YXJtJTIwY29sb3JzfGVufDF8fHx8MTc3NTc0NDI2MXww&ixlib=rb-4.1.0&q=80&w=1080', description: 'Adventure in pristine nature' },
];

const contactMethods = [
  { icon: Video, label: 'Google Meet' },
  { icon: Phone, label: 'Phone' },
  { icon: MessageCircle, label: 'WhatsApp' },
  { icon: Mail, label: 'E-Mail' },
];

export default function SubmitSuccess() {
  const [selectedOffer, setSelectedOffer] = useState<typeof offers[0] | null>(null);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-sm p-12 shadow-2xl text-center ui-panel">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 className="font-serif text-3xl text-[var(--navy)] mb-3">Thank you, Ms. Customer</h2>
        <p className="text-[var(--navy)]/70 mb-10 max-w-xl mx-auto">Your personal travel expert from Euro Lloyd<br />will contact you within 24 hours</p>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="mb-8">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#34bce1]">
            <img src="/profile-image.png" alt="Gabriele Reminder-Schray" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-serif text-2xl text-[var(--navy)] mb-1">Gabriele Reminder-Schray</h3>
          <p className="text-[var(--navy)]/60 text-sm">Your travel expert from Stuttgart</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
          <p className="text-[var(--navy)]/70 mb-4">Contact us directly:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {contactMethods.map(({ icon: Icon, label }) => (
              <button key={label} className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-[var(--sand)] hover:border-[var(--champagne)] hover:bg-[var(--champagne)]/5 transition-all ui-card">
                <Icon className="w-8 h-8 text-[var(--champagne)]" />
                <span className="text-sm text-[var(--navy)]">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
          className="border-t-2 border-[var(--sand)] pt-12">
          <h3 className="font-serif text-2xl text-[var(--navy)] mb-8">Get inspired in the meantime</h3>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {offers.map((offer, index) => (
              <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }} className="group cursor-pointer" onClick={() => setSelectedOffer(offer)}>
                <div className="relative overflow-hidden mb-3 aspect-[4/3] ui-card">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                  </div>
                </div>
                <h4 className="text-[var(--navy)] font-medium mb-1">{offer.title}</h4>
                <p className="text-[var(--navy)]/60 text-sm">{offer.description}</p>
              </motion.div>
            ))}
          </div>
          <button className="px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors ui-control">Discover More Offers</button>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {selectedOffer && <OfferDetails offer={selectedOffer} onClose={() => setSelectedOffer(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
