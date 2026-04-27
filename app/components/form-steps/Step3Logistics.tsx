'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, User } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { FormData } from '@/app/types/index';

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const durationOptions = [
  { value: 'exact', label: 'Exakt', days: null as number | null },
  { value: '7', label: '1 Woche', days: 7 },
  { value: '14', label: '2 Wochen', days: 14 },
  { value: '5', label: '5 Tage', days: 5 },
  { value: '10', label: '10 Tage', days: 10 },
  { value: 'flex', label: 'Beliebig', days: null as number | null },
];

const stayOptions = [
  { value: 'weekend', label: 'Ein Wochenende' },
  { value: 'week', label: 'Eine Woche' },
  { value: 'month', label: 'Einen Monat' },
  { value: 'other', label: 'Anderer Zeitraum' },
];

const childAgeOptions = Array.from({ length: 18 }, (_, i) => ({
  value: String(i),
  label: `${i} Jahre alt`,
}));

const defaultMonth = new Date(2026, 3); // April 2026

export default function Step3Logistics({ formData, updateFormData, nextStep, prevStep }: Props) {
  const [duration, setDuration] = useState('exact');
  const [customDays, setCustomDays] = useState('');
  const [stayDuration, setStayDuration] = useState('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [destination, setDestination] = useState('');

  const adults = formData.adults ?? 2;
  const children = formData.children ?? 0;
  const childrenAges = formData.childrenAges ?? [];
  const isFlexible = formData.flexibility === 'flexible';

  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range) {
      let to = range.to;
      const durOpt = durationOptions.find((d) => d.value === duration);
      if (durOpt?.days && range.from && !range.to) {
        to = addDays(range.from, durOpt.days - 1);
      }
      updateFormData({ dateRange: { from: range.from, to } });
    }
  };

  const handleDurationClick = (opt: (typeof durationOptions)[0]) => {
    setDuration(opt.value);
    if (opt.days && formData.dateRange.from) {
      updateFormData({
        dateRange: { from: formData.dateRange.from, to: addDays(formData.dateRange.from, opt.days - 1) },
      });
    }
  };

  const adjustAdults = (delta: number) => {
    updateFormData({ adults: Math.max(1, adults + delta) });
  };

  const adjustChildren = (delta: number) => {
    const newCount = Math.max(0, children + delta);
    const newAges = delta > 0 ? [...childrenAges, ''] : childrenAges.slice(0, newCount);
    updateFormData({ children: newCount, childrenAges: newAges });
  };

  const updateChildAge = (index: number, age: string) => {
    const ages = [...childrenAges];
    ages[index] = age;
    updateFormData({ childrenAges: ages });
  };

  const toggleMonth = (key: string) =>
    setSelectedMonths((prev) =>
      prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key]
    );

  const upcomingMonths = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(2026, 3 + i);
    return {
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: format(d, 'MMM', { locale: de }),
      year: d.getFullYear(),
    };
  });

  const dateLabel =
    formData.dateRange.from && formData.dateRange.to
      ? `${format(formData.dateRange.from, 'd. MMM', { locale: de })} – ${format(formData.dateRange.to, 'd. MMM yyyy', { locale: de })}`
      : formData.dateRange.from
      ? format(formData.dateRange.from, 'd. MMM yyyy', { locale: de })
      : 'Reisedatum wählen';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--navy)] mb-2">
        Wann und mit wem dürfen wir planen?
      </h2>
      <p className="text-[var(--navy)]/60 mb-6 sm:mb-8">Geben Sie uns die wichtigsten Details</p>

      <div className="space-y-8">

        {/* ── Reisedaten ──────────────────────────────────────── */}
        <div>
          <label className="block text-[var(--navy)] font-medium mb-3">Reisedaten</label>

          {/* Date range display */}
          <div className="w-full px-4 py-3 border-2 border-[var(--champagne)] bg-white flex items-center gap-3 ui-control">
            <svg
              className="w-4 h-4 text-[var(--champagne)] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-[var(--navy)]">{dateLabel}</span>
          </div>

          {/* Calendar – always visible, two months side by side */}
          <div className="mt-3 p-2 sm:p-4 border-2 border-[var(--sand)] bg-white overflow-x-auto ui-card">
            <DayPicker
              mode="range"
              defaultMonth={defaultMonth}
              selected={formData.dateRange.from ? (formData.dateRange as any) : undefined}
              onSelect={handleDateSelect as any}
              locale={de}
              numberOfMonths={2}
              className="mx-auto"
            />
          </div>

          {/* Duration quick-picks */}
          <div className="mt-3">
            <p className="text-xs text-[var(--navy)]/60 mb-2">Wie lange möchtest du verreisen?</p>
            <div className="flex flex-wrap gap-2 items-center">
              {durationOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleDurationClick(opt)}
                  className={`px-3 py-1.5 text-xs border transition-all ui-control ${
                    duration === opt.value
                      ? 'border-[var(--champagne)] bg-[var(--champagne)] text-[var(--navy)]'
                      : 'border-[var(--sand)] text-[var(--navy)] hover:border-[var(--champagne)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <div className="flex items-center gap-1.5 border border-[var(--sand)] px-2 py-1.5 ui-control">
                <span className="text-xs text-[var(--navy)]/60">genau</span>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={customDays}
                  onChange={(e) => {
                    setCustomDays(e.target.value);
                    setDuration('custom');
                  }}
                  className="w-10 text-xs text-[var(--navy)] text-center focus:outline-none bg-transparent"
                  placeholder="—"
                />
                <span className="text-xs text-[var(--navy)]/60">Tage</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Flexibel ────────────────────────────────────────── */}
        <div>
          <label className="block text-[var(--navy)] font-medium mb-3">Flexibel?</label>
          <div className="flex gap-3">
            <button
              onClick={() => updateFormData({ flexibility: 'flexible3' })}
              className={`flex-1 py-3 border-2 text-sm font-medium transition-all ui-control ${
                formData.flexibility === 'flexible3'
                  ? 'border-[var(--champagne)] bg-[var(--champagne)] text-[var(--navy)]'
                  : 'border-[var(--sand)] text-[var(--navy)] hover:border-[var(--champagne)]'
              }`}
            >
              +/- 3 Tage
            </button>
            <button
              onClick={() => updateFormData({ flexibility: 'flexible' })}
              className={`flex-1 py-3 border-2 text-sm font-medium transition-all ui-control ${
                isFlexible
                  ? 'border-[var(--champagne)] bg-[var(--champagne)] text-[var(--navy)]'
                  : 'border-[var(--sand)] text-[var(--navy)] hover:border-[var(--champagne)]'
              }`}
            >
              Ich bin flexibel
            </button>
          </div>

          {/* Expanded flexible panel */}
          {isFlexible && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-4 border-2 border-[var(--sand)] bg-white space-y-5 ui-card"
            >
              <div>
                <p className="text-sm font-medium text-[var(--navy)] mb-3">
                  Wie lange möchten Sie bleiben?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {stayOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="stayDuration"
                        value={opt.value}
                        checked={stayDuration === opt.value}
                        onChange={() => setStayDuration(opt.value)}
                        className="accent-[var(--champagne)] w-4 h-4"
                      />
                      <span className="text-sm text-[var(--navy)] group-hover:text-[var(--champagne)] transition-colors">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--navy)] mb-3">
                  Wann möchten Sie reisen?
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {upcomingMonths.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => toggleMonth(m.key)}
                      className={`flex-shrink-0 flex flex-col items-center px-3 py-2 border text-xs transition-all ui-control min-w-[52px] ${
                        selectedMonths.includes(m.key)
                          ? 'border-[var(--champagne)] bg-[var(--champagne)] text-[var(--navy)]'
                          : 'border-[var(--sand)] text-[var(--navy)] hover:border-[var(--champagne)]'
                      }`}
                    >
                      <span className="font-medium">{m.label}</span>
                      <span className="opacity-60 text-[10px]">{m.year}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Reisegruppe ─────────────────────────────────────── */}
        <div>
          <label className="block text-[var(--navy)] font-medium mb-3">Reisegruppe</label>
          <div className="border-2 border-[var(--sand)] bg-white ui-card divide-y divide-[var(--sand)]">

            {/* Adults row */}
            <div className="flex items-center gap-3 px-4 py-3">
              <User className="w-4 h-4 text-[var(--navy)]/40 flex-shrink-0" />
              <span className="flex-1 text-sm text-[var(--navy)]">Erwachsene</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustAdults(-1)}
                  disabled={adults <= 1}
                  className="w-8 h-8 border border-[var(--sand)] flex items-center justify-center text-[var(--navy)] hover:border-[var(--champagne)] disabled:opacity-30 disabled:cursor-not-allowed transition-all ui-control text-base leading-none"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-medium text-[var(--navy)]">{adults}</span>
                <button
                  onClick={() => adjustAdults(1)}
                  className="w-8 h-8 border border-[var(--sand)] flex items-center justify-center text-[var(--navy)] hover:border-[var(--champagne)] transition-all ui-control text-base leading-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children row */}
            <div className="flex items-center gap-3 px-4 py-3">
              <User className="w-4 h-4 text-[var(--navy)]/40 flex-shrink-0" />
              <span className="flex-1 text-sm text-[var(--navy)]">Kinder</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustChildren(-1)}
                  disabled={children <= 0}
                  className="w-8 h-8 border border-[var(--sand)] flex items-center justify-center text-[var(--navy)] hover:border-[var(--champagne)] disabled:opacity-30 disabled:cursor-not-allowed transition-all ui-control text-base leading-none"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-medium text-[var(--navy)]">{children}</span>
                <button
                  onClick={() => adjustChildren(1)}
                  className="w-8 h-8 border border-[var(--sand)] flex items-center justify-center text-[var(--navy)] hover:border-[var(--champagne)] transition-all ui-control text-base leading-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Child age dropdowns */}
            {children > 0 && (
              <div className="px-4 py-3 flex flex-wrap gap-2">
                {Array.from({ length: children }, (_, i) => (
                  <div key={i} className="relative">
                    <select
                      value={childrenAges[i] ?? ''}
                      onChange={(e) => updateChildAge(i, e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 border border-[var(--sand)] text-xs text-[var(--navy)] bg-white focus:outline-none focus:border-[var(--champagne)] transition-colors ui-control cursor-pointer"
                    >
                      <option value="" disabled>
                        Alter benötigt
                      </option>
                      {childAgeOptions.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--navy)]/40 pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Destination section – unchanged ─────────────────── */}
        <div className="mt-8 pt-8 border-t-2 border-[var(--sand)]">
          <h3 className="font-serif text-xl text-[var(--navy)] mb-4">Do you have a dream destination – or may we inspire you?</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="flex-1 p-3 border-2 border-[var(--sand)] focus:border-[var(--champagne)] focus:outline-none transition-colors ui-control"
            />
            <button className="px-6 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors whitespace-nowrap ui-control">
              Inspire Me
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={prevStep}
          className="px-8 py-3 border-2 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors ui-control"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={adults < 1}
          className="flex-1 px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ui-control"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
