"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import WelcomeGreeting from "./components/WelcomeGreeting";

// ── Animation timing constants ──────────────────────────────────────────────
//
//  t = 0.0 – 0.7s  Greeting fades in at centre (y = 220, opacity 0→1)
//  t = 0.7 – 1.3s  Greeting pauses at centre so the user reads it
//  t = 1.3 – 2.7s  Greeting glides upward to its final top position (y → 0)
//  t = 1.7s        Card begins to fade in while greeting is still moving
//  t = 2.5s        WelcomeGreeting internal reveals fire (name, line, tagline)
//  t = 2.8s        Bottom badges appear
//
// The y keyframe array [220, 220, 0] with times [0, 0.46, 1] over 2.7s gives:
//   segment 1: hold at y=220 for the first 1.24s   (pause phase)
//   segment 2: ease y from 220→0 over the last 1.46s  (move phase)
// ────────────────────────────────────────────────────────────────────────────

const GREETING_DURATION = 2.7;
const GREETING_PAUSE_RATIO = 0.46; // ~1.24s pause, then ~1.46s move

export default function Welcome() {
  const router = useRouter();
  const [isFormal, setIsFormal] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* ── Hero background ── */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1771722285883-31eaf657dd58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMHNjZW5pY3xlbnwxfHx8fDE3NzY4NjI4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury travel destination"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-emerald-900/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="max-w-[880px] w-full space-y-8 sm:space-y-12">

          {/* ── STEP 1 → 4: Greeting enters at centre, then rises to its natural position ── */}
          <motion.div
            initial={{ opacity: 0, y: 220 }}
            animate={{ opacity: 1, y: [220, 220, 0] }}
            transition={{
              // opacity fades in quickly during the pause phase
              opacity: { duration: 0.7, ease: "easeOut" },
              // y: hold at 220 for GREETING_PAUSE_RATIO of the total duration,
              //    then glide upward with a premium deceleration curve
              y: {
                duration: GREETING_DURATION,
                times: [0, GREETING_PAUSE_RATIO, 1],
                ease: ["linear", [0.22, 1, 0.36, 1]],
              },
            }}
          >
            {/*
              Internal reveals (name, underline, tagline) are delayed so they
              fire just as the greeting settles into its final position (~2.5s).
            */}
            <WelcomeGreeting name="Nidhi" delay={2.5} />
          </motion.div>

          {/* ── STEP 5: Glass card glides in from the right — slow, cinematic, premium ── */}
          <motion.div
            initial={{ opacity: 0, x: 72 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              // opacity fades in slowly and independently so the fade is clearly felt
              opacity: { duration: 1.8, ease: 'easeOut', delay: 1.6 },
              // x drifts home with a smooth ease-out — starts gently, decelerates to rest
              x: { duration: 2.0, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            className="space-y-8 bg-white/10 backdrop-blur-md p-8 sm:p-10 lg:p-12 border border-white/20 shadow-2xl ui-panel"
          >
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed font-medium">
                Diese Seite dreht sich ganz um Sie und Ihre Wünsche.
              </p>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Wenn Sie es vorziehen, formell angesprochen zu werden,{" "}
                <button
                  onClick={() => setIsFormal(!isFormal)}
                  className="text-[#34bce1] hover:text-white underline underline-offset-4 transition-all duration-300"
                >
                  klicken Sie hier
                </button>
                , und wir sprechen Sie mit dem formellen „Sie" an.
                {isFormal && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 text-[#34bce1]"
                  >
                    ✓ Sie werden jetzt formell angesprochen
                  </motion.span>
                )}
              </p>

              <div className="pt-4 space-y-5">
                <p className="text-2xl sm:text-3xl text-white leading-relaxed">
                  Suchen Sie nach Entspannung, einem Urlaub oder einer Reise?
                </p>

                {/* Description LEFT + Button RIGHT */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                  <p className="text-base sm:text-lg text-white/90 leading-relaxed flex-1">
                    Dann sind Sie bereits auf dem richtigen Weg. Wenn Sie uns mehr
                    über Ihre Wünsche erzählen, können wir Ihnen die besten
                    Vorschläge machen, die wir haben.
                  </p>
                  <motion.button
                    onClick={() => router.push("/reisen-finden")}
                    className="flex-shrink-0 px-8 py-3 bg-[#34bce1] hover:bg-[#2ca4c9] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#34bce1]/40 text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reisen finden →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── STEP 6: Bottom badges fade in last ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 2.8 }}
            className="flex flex-wrap gap-6 items-center justify-center text-white/60 text-sm"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#34bce1]" />
              Maßgeschneiderte Reisen
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#34bce1]" />
              Persönliche Beratung
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#34bce1]" />
              Unvergessliche Erlebnisse
            </span>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
