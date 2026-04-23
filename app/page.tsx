"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Welcome() {
  const router = useRouter();
  const [isFormal, setIsFormal] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Guten Morgen";
    if (hour < 18) return "Guten Tag";
    return "Guten Abend";
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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

      {/* Page Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="max-w-[880px] w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-8 sm:space-y-12"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-6"
            >
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {getGreeting()}
              </h1>

              <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full" />
            </motion.div>

            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="space-y-8 bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/20 shadow-2xl"
            >
              <div className="space-y-6">
                <p
                  className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Diese Seite dreht sich ganz um Sie und Ihre Wünsche.
                </p>

                <p
                  className="text-base sm:text-lg text-white/80 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Wenn Sie es vorziehen, formell angesprochen zu werden,{" "}
                  <button
                    onClick={() => setIsFormal(!isFormal)}
                    className="text-emerald-300 hover:text-emerald-200 underline underline-offset-4 decoration-emerald-400/50 hover:decoration-emerald-300 transition-all duration-300"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    klicken Sie hier
                  </button>
                  , und wir sprechen Sie mit dem formellen „Sie“ an.
                  {isFormal && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-2 text-emerald-300"
                    >
                      ✓ Sie werden jetzt formell angesprochen
                    </motion.span>
                  )}
                </p>

                <div className="pt-4 space-y-4">
                  <p
                    className="text-2xl sm:text-3xl text-white leading-relaxed"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Suchen Sie nach Entspannung, einem Urlaub oder einer Reise?
                  </p>

                  <p
                    className="text-base sm:text-lg text-white/90 leading-relaxed"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Dann sind Sie bereits auf dem richtigen Weg. Wenn Sie uns
                    mehr über Ihre Wünsche erzählen, können wir Ihnen die besten
                    Vorschläge machen, die wir haben.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => router.push("/reisen-finden")}
                className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-5 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative text-xl font-semibold text-white tracking-wide flex items-center justify-center gap-3">
                  Reisen finden
                  <motion.span
                    className="inline-block"
                    animate={{ x: 5 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.75,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap gap-6 items-center justify-center text-white/60 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                Maßgeschneiderte Reisen
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400" />
                Persönliche Beratung
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                Unvergessliche Erlebnisse
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
