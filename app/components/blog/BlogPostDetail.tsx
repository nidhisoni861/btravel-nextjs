'use client';
import { motion } from 'motion/react';
import { X, Calendar, User } from 'lucide-react';
import BlogSectionRenderer from './BlogSectionRenderer';
import { blogFullContent } from './blogContent';

type BlogPost = { id: number; title: string; excerpt: string; image: string; date: string; author: string };
type Props = { post: BlogPost; onClose: () => void };

export default function BlogPostDetail({ post, onClose }: Props) {
  const content = blogFullContent[post.id] || { sections: [{ type: 'text', content: post.excerpt }] };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto" onClick={onClose}>
      <div className="min-h-screen flex items-center justify-center p-4 py-12">
        <motion.article initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-4xl shadow-2xl relative ui-panel" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[var(--navy)]" />
          </button>
          <div className="relative h-[400px]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="p-12">
            <div className="flex items-center gap-6 text-sm text-[var(--navy)]/60 mb-6">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.date}</div>
              <div className="flex items-center gap-2"><User className="w-4 h-4" />{post.author}</div>
            </div>
            <h1 className="font-serif text-4xl text-[var(--navy)] mb-6">{post.title}</h1>
            <p className="text-xl text-[var(--navy)]/80 mb-8 leading-relaxed font-light italic">{post.excerpt}</p>
            <BlogSectionRenderer sections={content.sections as Parameters<typeof BlogSectionRenderer>[0]['sections']} />
            <div className="border-t-2 border-[var(--sand)] pt-8 mt-12">
              <div className="text-center">
                <p className="text-[var(--navy)]/70 mb-6">Interested in a similar trip?</p>
                <button className="px-8 py-3 bg-[var(--champagne)] text-[var(--navy)] hover:bg-[var(--champagne)]/90 transition-colors ui-control">Inquire Now</button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
