'use client';
import { motion } from 'motion/react';
import { FormData } from '@/app/types/index';
import LuxuryOptionGroup from './LuxuryOptionGroup';

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const luxuryOptions = {
  serviceLevel: [
    { key: 'conciergeService', label: 'Concierge Service' },
    { key: 'personalGuide', label: 'Personal Guide' },
  ],
  kulinarik: [
    { key: 'michelinRestaurants', label: 'Michelin Restaurants' },
    { key: 'privateDinner', label: 'Private Dinner' },
    { key: 'wineTrips', label: 'Wine Tours' },
  ],
  besondereErlebnisse: [
    { key: 'exclusiveAccess', label: 'Exclusive Access' },
    { key: 'closedEvents', label: 'Private Events' },
    { key: 'inaccessiblePlaces', label: 'Inaccessible Places' },
  ],
  unterkunftslevel: [
    { key: 'luxuryResort', label: '5★ Luxury Resort' },
    { key: 'boutiqueHotels', label: '5★ Boutique Hotels' },
    { key: 'privateVilla', label: 'Private Villa' },
  ],
  mobilitat: [
    { key: 'privateBoatTours', label: 'Private Boat Tours' },
    { key: 'privateTransfers', label: 'Private Transfers' },
    { key: 'yachtPrivateJet', label: 'Yacht / Private Jet' },
    { key: 'helicopter', label: 'Helicopter' },
  ],
};

export default function Step4Perfection({ formData, updateFormData, nextStep, prevStep }: Props) {
  const handleToggle = (key: keyof FormData['luxuryToggles']) => {
    updateFormData({ luxuryToggles: { ...formData.luxuryToggles, [key]: !formData.luxuryToggles[key] } });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--navy)] mb-3">What makes this trip perfect for you?</h2>
      <p className="text-[var(--navy)]/60 mb-6 sm:mb-10">Select your desired extras</p>
      <div className="space-y-8">
        <LuxuryOptionGroup title="Service Level" options={luxuryOptions.serviceLevel} formData={formData} onToggle={handleToggle} />
        <LuxuryOptionGroup title="Culinary" options={luxuryOptions.kulinarik} formData={formData} onToggle={handleToggle} />
        <LuxuryOptionGroup title="Special Experiences" options={luxuryOptions.besondereErlebnisse} formData={formData} onToggle={handleToggle} />
        <LuxuryOptionGroup title="Accommodation Level" options={luxuryOptions.unterkunftslevel} formData={formData} onToggle={handleToggle} />
        <LuxuryOptionGroup title="Mobility" options={luxuryOptions.mobilitat} formData={formData} onToggle={handleToggle} />
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={prevStep} className="px-8 py-3 border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors ui-control">Back</button>
        <button onClick={nextStep} className="flex-1 px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors ui-control">Next</button>
      </div>
    </motion.div>
  );
}
