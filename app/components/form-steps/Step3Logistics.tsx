'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { FormData } from '@/app/types/index';

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const travelParties = [
  { value: 'couple', label: 'As a Couple', image: 'https://images.unsplash.com/photo-1766131402801-3894bc121dcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0cmF2ZWwlMjB2YWNhdGlvbiUyMHN1bnNldCUyMHJvbWFudGljJTIwd2FybXxlbnwxfHx8fDE3NzU3NDA5NDZ8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'family', label: 'With Family', image: 'https://images.unsplash.com/photo-1769674109608-f4d2f811a749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbiUyMGJlYWNoJTIwZ29sZGVuJTIwaG91ciUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NTc0MDk0Nnww&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'friends', label: 'With Friends', image: 'https://images.unsplash.com/photo-1764012248540-7f208bad897f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwZ3JvdXAlMjB0cmF2ZWwlMjBzdW5zZXQlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzc1NzQwOTQ2fDA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'business', label: 'On Business', image: 'https://images.unsplash.com/photo-1603160627096-1bc1f22b4f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbGVyJTIwYWlycG9ydCUyMGx1eHVyeSUyMHdhcm0lMjBsaWdodHxlbnwxfHx8fDE3NzU3NDA5NDd8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { value: 'solo', label: 'Solo', image: 'https://images.unsplash.com/photo-1500156006176-b65d84d15b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xvJTIwdHJhdmVsZXIlMjBzdW5zZXQlMjBhZHZlbnR1cmUlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3NTc0MDk0N3ww&ixlib=rb-4.1.0&q=80&w=400' },
];

const flexibilityOptions = [
  { value: 'flexible3', label: '+/- 3 Days' },
  { value: 'flexible7', label: '1 Week' },
];

const defaultMonth = new Date(2026, 6);
const defaultSelected = { from: new Date(2026, 6, 28), to: new Date(2026, 7, 4) };

export default function Step3Logistics({ formData, updateFormData, nextStep, prevStep }: Props) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [destination, setDestination] = useState('');

  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range) updateFormData({ dateRange: { from: range.from, to: range.to } });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--navy)] mb-3">When and with whom may we plan?</h2>
      <p className="text-[var(--navy)]/60 mb-6 sm:mb-10">Give us the most important details</p>
      <div className="space-y-8">
        <div>
          <label className="block text-[var(--navy)] mb-3">Travel Dates</label>
          <button onClick={() => setShowCalendar(!showCalendar)} className="w-full p-4 border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-colors flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-[var(--champagne)]" />
            <span className="text-[var(--navy)]">
              {formData.dateRange.from && formData.dateRange.to
                ? `${format(formData.dateRange.from, 'd. MMM', { locale: de })} - ${format(formData.dateRange.to, 'd. MMM yyyy', { locale: de })}`
                : '28. Juli - 4. August 2026'}
            </span>
          </button>
          {showCalendar && (
            <div className="mt-4 p-2 sm:p-4 border-2 border-[var(--sand)] bg-white overflow-x-auto">
              <DayPicker mode="range" defaultMonth={defaultMonth} selected={formData.dateRange.from ? formData.dateRange : defaultSelected} onSelect={handleDateSelect} locale={de} className="mx-auto" />
            </div>
          )}
        </div>
        <div>
          <label className="block text-[var(--navy)] mb-3">Flexible?</label>
          <div className="grid grid-cols-2 gap-3">
            {flexibilityOptions.map((option) => (
              <button key={option.value} onClick={() => updateFormData({ flexibility: option.value })}
                className={`p-3 border-2 transition-all ${formData.flexibility === option.value ? 'border-[var(--champagne)] bg-[var(--champagne)]/5' : 'border-[var(--sand)] hover:border-[var(--champagne)]'}`}>
                <div className="text-[var(--navy)] text-sm">{option.label}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[var(--navy)] mb-3">Travel Group</label>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {travelParties.map((party) => (
              <button key={party.value} onClick={() => updateFormData({ travelParty: party.value })}
                className={`relative overflow-hidden border-2 transition-all group ${formData.travelParty === party.value ? 'border-[var(--champagne)]' : 'border-[var(--sand)] hover:border-[var(--champagne)]'}`}>
                <div className="relative h-16 sm:h-20 overflow-hidden">
                  <img src={party.image} alt={party.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 transition-all ${formData.travelParty === party.value ? 'bg-[var(--champagne)]/20' : 'bg-[#0f1729]/40 group-hover:bg-[#0f1729]/20'}`} />
                </div>
                <div className="p-1 sm:p-2 bg-white"><div className="text-[var(--navy)] text-xs sm:text-sm leading-tight">{party.label}</div></div>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t-2 border-[var(--sand)]">
          <h3 className="font-serif text-xl text-[var(--navy)] mb-4">Do you have a dream destination – or may we inspire you?</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination"
              className="flex-1 p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors" />
            <button className="px-6 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors whitespace-nowrap">Inspire Me</button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        <button onClick={prevStep} className="px-8 py-3 border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors">Back</button>
        <button onClick={nextStep} disabled={!formData.travelParty}
          className="flex-1 px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
      </div>
    </motion.div>
  );
}
