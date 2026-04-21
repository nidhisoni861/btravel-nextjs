'use client';
import { motion } from 'motion/react';
import { FormData } from '@/app/types/index';

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const vibes = [
  { value: 'privacy', label: 'Complete Peace & Privacy', image: 'https://images.unsplash.com/photo-1677380609601-ab895b38edbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwbHV4dXJ5JTIwcG9vbCUyMHZpbGxhJTIwd2FybSUyMHN1bnNldHxlbnwxfHx8fDE3NzU3NDA5MjJ8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'culinary', label: 'Culinary Highlights', image: 'https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMHdhcm0lMjBhbWJpYW5jZSUyMGx1eHVyeXxlbnwxfHx8fDE3NzU3NDA5MjN8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'nature', label: 'Nature & Space', image: 'https://images.unsplash.com/photo-1565246144528-f235c0500319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBzdW5zZXQlMjB3YXJtJTIwY29sb3JzJTIwc2NlbmljfGVufDF8fHx8MTc3NTc0MDkyM3ww&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'culture', label: 'Culture & Exclusivity', image: 'https://images.unsplash.com/photo-1558704517-1a11f50d0585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBnb2xkZW4lMjBob3VyJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzU3NDA5MjJ8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'adventure', label: 'Active Adventure', image: 'https://images.unsplash.com/photo-1760365944143-450fd6885520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMGdvbGRlbiUyMGxpZ2h0JTIwaGlraW5nfGVufDF8fHx8MTc3NTc0MDkyM3ww&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'quality-family', label: 'Time with Family', image: 'https://images.unsplash.com/photo-1769674845630-bf19ee7cd4bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbiUyMGJlYWNoJTIwd2FybSUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzc1NzQwOTI0fDA&ixlib=rb-4.1.0&q=80&w=400' },
];

export default function Step2Vibe({ formData, updateFormData, nextStep, prevStep }: Props) {
  const handleToggle = (value: string) => {
    const current = formData.vibe || [];
    updateFormData({ vibe: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <h2 className="font-serif text-3xl text-[var(--navy)] mb-3">How would you like to feel on this trip?</h2>
      <p className="text-[var(--navy)]/60 mb-10">Select one or more moods</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {vibes.map((vibe) => {
          const isSelected = formData.vibe.includes(vibe.value);
          return (
            <motion.button key={vibe.value} onClick={() => handleToggle(vibe.value)}
              className={`relative overflow-hidden border-2 transition-all hover:border-[var(--champagne)] hover:shadow-lg group ${isSelected ? 'border-[var(--champagne)]' : 'border-[var(--sand)]'}`}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="relative h-28 overflow-hidden">
                <img src={vibe.image} alt={vibe.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className={`absolute inset-0 transition-all ${isSelected ? 'bg-[var(--champagne)]/20' : 'bg-[#0f1729]/40 group-hover:bg-[#0f1729]/20'}`} />
              </div>
              <div className="p-3 bg-white"><div className="text-[var(--navy)] font-medium text-sm">{vibe.label}</div></div>
            </motion.button>
          );
        })}
      </div>
      <div className="flex gap-4">
        <button onClick={prevStep} className="px-8 py-3 border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors">Back</button>
        <button onClick={nextStep} disabled={formData.vibe.length === 0}
          className="flex-1 px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
      </div>
    </motion.div>
  );
}
