'use client';
import { motion } from 'motion/react';
import { Sun, Sparkles, Moon } from 'lucide-react';

type Period = 'morning' | 'day' | 'evening';

interface TimeData {
  period: Period;
  greeting: string;
  tagline: string;
}

function getTimeData(): TimeData {
  const h = new Date().getHours();
  if (h < 12) return { period: 'morning', greeting: 'Guten Morgen', tagline: 'Schön, Sie heute zu sehen.' };
  if (h < 18) return { period: 'day',     greeting: 'Guten Tag',    tagline: 'Willkommen zurück bei BeTravel.' };
  return          { period: 'evening',    greeting: 'Guten Abend',   tagline: 'Lassen Sie uns Ihre perfekte Reise finden.' };
}

function PeriodIcon({ period }: { period: Period }) {
  const cls = 'w-5 h-5 text-emerald-300';
  if (period === 'morning') return <Sun      className={cls} />;
  if (period === 'day')     return <Sparkles className={cls} />;
  return                           <Moon     className={cls} />;
}

export default function WelcomeGreeting({ name = 'Nidhi' }: { name?: string }) {
  const { period, greeting, tagline } = getTimeData();

  return (
    <motion.div
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      {/* Greeting line + floating icon */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] font-medium">
          {greeting},{' '}
          <motion.span
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200"
          >
            {name}
          </motion.span>
        </h1>

        {/* Animated icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, type: 'spring', stiffness: 240, damping: 18 }}
          className="mt-2 shrink-0"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
          >
            <PeriodIcon period={period} />
          </motion.div>
        </motion.div>
      </div>

      {/* Underline — draws left to right */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="h-px w-28 bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent"
      />

      {/* Welcoming tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-base sm:text-lg text-white/55 font-light tracking-wide"
      >
        {tagline}
      </motion.p>
    </motion.div>
  );
}
