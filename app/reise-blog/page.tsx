'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User } from 'lucide-react';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { blogPosts } from '../data/blog-posts';

export default function TravelBlog() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1773378998468-dca683d776e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjB0cmF2ZWwlMjBleG90aWMlMjBkZXN0aW5hdGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzU3MzcwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Travel Blog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[var(--navy)]/60" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-6xl text-white mb-4">Travel Blog</h1>
          <p className="text-white/80 text-lg">Inspiration for your next luxury trip</p>
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post, index) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }} className="group cursor-pointer" onClick={() => setSelectedPost(post)}>
              <div className="overflow-hidden mb-6">
                <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-6 text-sm text-[var(--navy)]/60 mb-4">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.date}</div>
                <div className="flex items-center gap-2"><User className="w-4 h-4" />{post.author}</div>
              </div>
              <h2 className="font-serif text-2xl text-[var(--navy)] mb-3 group-hover:text-[var(--champagne)] transition-colors">{post.title}</h2>
              <p className="text-[var(--navy)]/70 leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 text-[var(--champagne)] group-hover:translate-x-2 transition-transform inline-block">Read more →</div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && <BlogPostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />}
      </AnimatePresence>
    </div>
  );
}
