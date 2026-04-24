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
  const cls = 'w-5 h-5 text-[#34bce1]';
  if (period === 'morning') return <Sun      className={cls} />;
  if (period === 'day')     return <Sparkles className={cls} />;
  return                           <Moon     className={cls} />;
}

interface WelcomeGreetingProps {
  name?: string;
  /** Offsets all internal animation delays — set to ~2s so reveals fire after the outer enter-animation settles */
  delay?: number;
}

export default function WelcomeGreeting({ name = 'Nidhi', delay = 0 }: WelcomeGreetingProps) {
  const { period, greeting, tagline } = getTimeData();

  return (
    // Plain div — outer enter animation is controlled by page.tsx
    <div className="space-y-4">
      {/* Greeting — icon sits inline right after the name, no flex-justify tricks */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] font-medium">
        {greeting},{' '}
        <motion.span
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#34bce1]"
        >
          {name}
        </motion.span>

        {/* Icon badge — inline so it sits directly beside the name */}
        <motion.span
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.35, type: 'spring', stiffness: 240, damping: 18 }}
          className="inline-flex ml-3 align-middle"
          style={{ verticalAlign: 'middle' }}
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center shadow-lg"
          >
            <PeriodIcon period={period} />
          </motion.span>
        </motion.span>
      </h1>

      {/* Underline — draws left to right */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: delay + 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="h-px w-28 bg-gradient-to-r from-[#34bce1] via-[#34bce1]/60 to-transparent"
      />

      {/* Welcoming tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.45 }}
        className="text-base sm:text-lg text-white/55 font-light tracking-wide"
      >
        {tagline}
      </motion.p>
    </div>
  );
}
