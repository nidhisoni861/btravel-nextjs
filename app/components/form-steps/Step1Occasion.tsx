'use client';
import { motion } from 'motion/react';
import { FormData } from '@/app/types/index';

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
};

const occasions = [
  { value: 'inspiration', label: 'Looking for Inspiration', image: 'https://images.unsplash.com/photo-1667262422332-9b09d4065117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbnNwaXJhdGlvbiUyMHdhbmRlcmx1c3QlMjBzdW5zZXQlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3NTc0MTM3NHww&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'honeymoon', label: 'Honeymoon', image: 'https://images.unsplash.com/photo-1769415244321-ebd2c562c34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGhvbmV5bW9vbiUyMHN1bnNldCUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzc1NzQwOTEyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'anniversary', label: 'Anniversary', image: 'https://images.unsplash.com/photo-1768297087596-c4c0e6e1f542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjZWxlYnJhdGlvbiUyMGNoYW1wYWduZSUyMGdvbGQlMjBlbGVnYW50fGVufDF8fHx8MTc3NTc0MDkxM3ww&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'family', label: 'Family Time', image: 'https://images.unsplash.com/photo-1769674845630-bf19ee7cd4bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbiUyMGJlYWNoJTIwd2FybSUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzc1NzQwOTI0fDA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'retreat', label: 'Retreat', image: 'https://images.unsplash.com/photo-1770573320171-9f21c3c1f8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMHJlbGF4YXRpb24lMjB3YXJtJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzc1NzQwOTEzfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'business', label: 'Business Trip', image: 'https://images.unsplash.com/photo-1746350359613-c45c950277c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNsYXNzJTIwbHV4dXJ5JTIwdHJhdmVsJTIwd2FybXxlbnwxfHx8fDE3NzU3NDA5MTR8MA&ixlib=rb-4.1.0&q=80&w=400' },
];

export default function Step1Occasion({ formData, updateFormData, nextStep }: Props) {
  const handleSelect = (value: string) => {
    updateFormData({ occasion: value });
    setTimeout(() => nextStep(), 400);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--navy)] mb-3">Is there a special occasion?</h2>
      <p className="text-[var(--navy)]/60 mb-6 sm:mb-10">Select the occasion for your trip</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {occasions.map((occasion) => (
          <motion.button key={occasion.value} onClick={() => handleSelect(occasion.value)}
            className={`relative overflow-hidden border-2 transition-all hover:border-[var(--champagne)] hover:shadow-lg group ${formData.occasion === occasion.value ? 'border-[var(--champagne)]' : 'border-[var(--sand)]'}`}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div className="relative h-32 overflow-hidden">
              <img src={occasion.image} alt={occasion.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className={`absolute inset-0 transition-all ${formData.occasion === occasion.value ? 'bg-[var(--champagne)]/20' : 'bg-[#0f1729]/40 group-hover:bg-[#0f1729]/20'}`} />
            </div>
            <div className="p-4 bg-white"><div className="text-[var(--navy)] font-medium">{occasion.label}</div></div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
