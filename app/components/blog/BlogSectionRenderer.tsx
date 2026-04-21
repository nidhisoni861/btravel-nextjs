'use client';
import { motion } from 'motion/react';

type ContentSection =
  | { type: 'text'; content: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'gallery'; images: string[] }
  | { type: 'route'; stops: Array<{ day: number; port: string; highlights: string[] }> }
  | { type: 'routeMap'; title: string; subtitle: string; routePoints: string[]; duration: string; price: string; priceNote?: string };

type Props = { sections: ContentSection[] };

export default function BlogSectionRenderer({ sections }: Props) {
  return (
    <div className="max-w-none">
      {sections.map((section, index) => {
        if (section.type === 'text') {
          return <p key={index} className="text-[var(--navy)]/70 leading-relaxed mb-8 text-lg">{section.content}</p>;
        }
        if (section.type === 'image') {
          return (
            <motion.figure key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="my-12">
              <img src={section.url} alt={section.caption || ''} className="w-full h-auto object-cover rounded" />
              {section.caption && <figcaption className="text-[var(--navy)]/50 text-sm mt-3 text-center italic">{section.caption}</figcaption>}
            </motion.figure>
          );
        }
        if (section.type === 'gallery') {
          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4 my-12">
              {section.images?.map((img, i) => <img key={i} src={img} alt="" className="w-full h-80 object-cover rounded" />)}
            </motion.div>
          );
        }
        if (section.type === 'route') {
          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="my-12 bg-gradient-to-br from-[var(--sand-light)] to-white p-8 rounded-lg border-2 border-[var(--sand)]">
              <h3 className="font-serif text-3xl text-[var(--navy)] mb-8 text-center">Route Plan</h3>
              <div className="space-y-6">
                {section.stops?.map((stop, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-8 pb-8 border-l-2 border-[var(--champagne)] last:border-l-0 last:pb-0">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[var(--champagne)] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{stop.day}</span>
                    </div>
                    <h4 className="font-serif text-xl text-[var(--navy)] mb-3">Day {stop.day}: {stop.port}</h4>
                    <ul className="space-y-2">
                      {stop.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-[var(--navy)]/70">
                          <span className="text-[var(--champagne)] mt-1">•</span><span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        }
        if (section.type === 'routeMap') {
          return (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="my-12 bg-[#e8dfd0] p-8 rounded-lg">
              <div className="mb-8 bg-white/50 p-8 rounded">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {section.routePoints?.map((point, i) => (
                    <div key={i} className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600" />
                        <span className="text-[var(--navy)] font-medium whitespace-nowrap">{point}</span>
                      </div>
                      {i < section.routePoints.length - 1 && <div className="w-8 h-0.5 bg-red-400 mx-2" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center space-y-6">
                <h3 className="font-serif text-2xl md:text-3xl text-[var(--navy)] tracking-wider">{section.title}</h3>
                <div className="text-[var(--navy)]/80 space-y-2">
                  <p className="text-sm">{section.routePoints?.join(' – ')}</p>
                  <p className="text-sm">{section.duration}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-[#34bce1]">Early booking price per person {section.price}</p>
                  <p className="text-sm text-[var(--navy)]/60">Ocean Terrace Suite (double occupancy)</p>
                  {section.priceNote && <p className="text-xs text-[var(--navy)]/50 italic">{section.priceNote}</p>}
                </div>
                <button className="px-8 py-3 bg-[#34bce1] text-white hover:bg-[#2aa3c7] transition-colors">Inquire Now</button>
              </div>
            </motion.div>
          );
        }
        return null;
      })}
    </div>
  );
}
