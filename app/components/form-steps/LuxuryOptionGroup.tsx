'use client';
import { Check } from 'lucide-react';
import { FormData } from '@/app/types/index';

type Option = { key: string; label: string };

type Props = {
  title: string;
  options: Option[];
  formData: FormData;
  onToggle: (key: keyof FormData['luxuryToggles']) => void;
};

export default function LuxuryOptionGroup({ title, options, formData, onToggle }: Props) {
  return (
    <div>
      <h3 className="text-[var(--navy)] font-medium mb-4">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const isChecked = formData.luxuryToggles[option.key as keyof FormData['luxuryToggles']];
          return (
            <label key={option.key} className="flex items-center gap-3 p-4 border-2 border-[var(--sand)] hover:border-[var(--champagne)] transition-all cursor-pointer group ui-card">
              <span className="flex-1 text-[var(--navy)]">{option.label}</span>
              <button type="button" onClick={(e) => { e.preventDefault(); onToggle(option.key as keyof FormData['luxuryToggles']); }}
                className={`w-5 h-5 border-2 flex items-center justify-center transition-all ui-control ${isChecked ? 'bg-[var(--champagne)] border-[var(--champagne)]' : 'bg-white border-[var(--sand)] group-hover:border-[var(--champagne)]'}`}>
                {isChecked && <Check className="w-4 h-4 text-[var(--navy)]" />}
              </button>
            </label>
          );
        })}
      </div>
    </div>
  );
}
