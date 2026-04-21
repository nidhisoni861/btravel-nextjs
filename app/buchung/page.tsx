'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Star, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const packages = [
  { id: 1, name: 'Maldives Luxury Retreat', destination: 'Maldives', duration: '7 Nights', price: '€ 12,500', image: 'https://images.unsplash.com/photo-1762961881563-66852e1e4527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', highlights: ['Private Island Resort', 'Personal Butler', 'Private Diving', 'Michelin Restaurant'] },
  { id: 2, name: 'Japan Culinary Journey', destination: 'Japan', duration: '14 Nights', price: '€ 18,900', image: 'https://images.unsplash.com/photo-1753898464732-85e0f3df8a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', highlights: ['Michelin Star Tours', 'Private Sake Tasting', 'Exclusive Temple Access', 'Ryokan Luxury Stays'] },
  { id: 3, name: 'Tanzania Safari Excellence', destination: 'Tanzania', duration: '10 Nights', price: '€ 22,000', image: 'https://images.unsplash.com/photo-1753898465083-a6830cd77c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', highlights: ['Private Safari Lodges', 'Hot Air Balloon Safari', 'Personal Ranger', 'Gourmet Bush Dinner'] },
];

export default function BuchungPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[var(--navy)] text-white px-8 py-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-5xl mb-3">Luxury Packages</h1>
            <p className="text-white/70 text-lg">Choose your perfect travel experience from our curated collections</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`border-2 transition-all cursor-pointer ${selectedPackage === pkg.id ? 'border-[var(--champagne)] shadow-xl' : 'border-[var(--sand)] hover:border-[var(--champagne)]'}`}
              onClick={() => setSelectedPackage(pkg.id)}>
              <div className="relative overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105" />
                {selectedPackage === pkg.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--champagne)] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-[var(--navy)]" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-[var(--navy)] mb-4">{pkg.name}</h3>
                <div className="space-y-2 text-sm text-[var(--navy)]/70 mb-6">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--champagne)]" />{pkg.destination}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[var(--champagne)]" />{pkg.duration}</div>
                </div>
                <div className="space-y-2 mb-6">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[var(--navy)]/70">
                      <Star className="w-4 h-4 text-[var(--champagne)] fill-[var(--champagne)]" />{h}
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-[var(--sand)]">
                  <div className="text-sm text-[var(--navy)]/60 mb-1">From</div>
                  <div className="font-serif text-3xl text-[var(--champagne)]">{pkg.price}</div>
                  <div className="text-xs text-[var(--navy)]/60 mt-1">per person</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {selectedPackage && !showConfirmation && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-[var(--sand-light)] p-8 border-l-4 border-[var(--champagne)]">
            <div className="max-w-[800px] mx-auto">
              <h2 className="font-serif text-2xl text-[var(--navy)] mb-6">Booking Summary</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[var(--navy)] mb-2">Travel Date</label>
                  <input type="date" className="w-full p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[var(--navy)] mb-2">Number of Travelers</label>
                  <select className="w-full p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none">
                    <option>1 Person</option><option>2 Persons</option><option>3 Persons</option><option>4+ Persons</option>
                  </select>
                </div>
              </div>
              <motion.button onClick={() => setShowConfirmation(true)}
                className="w-full py-4 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                Confirm Booking
              </motion.button>
            </div>
          </motion.div>
        )}
        {showConfirmation && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="max-w-[600px] mx-auto bg-white p-12 shadow-2xl border-2 border-[var(--champagne)] text-center">
            <div className="w-16 h-16 bg-[var(--champagne)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[var(--navy)]" />
            </div>
            <h2 className="font-serif text-3xl text-[var(--navy)] mb-4">Booking Received!</h2>
            <p className="text-[var(--navy)]/70 mb-8">Thank you for your trust. Your personal travel advisor will contact you within 24 hours to discuss all details and perfect your dream trip.</p>
            <button onClick={() => router.push('/dashboard')}
              className="px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors">
              Go to Dashboard
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
