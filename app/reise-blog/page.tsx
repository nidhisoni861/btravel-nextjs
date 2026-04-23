'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User } from 'lucide-react';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { blogPosts } from '../data/blog-posts';

type BlogPost = (typeof blogPosts)[number];

export default function TravelBlog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - matches Figma */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1773378998468-dca683d776e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjB0cmF2ZWwlMjBleG90aWMlMjBkZXN0aW5hdGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzU3MzcwMjB8MA&ixlib=rb-4.1.0&q=80&w=1600"
          alt="Reise Blog"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/55" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1
            className="text-white text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Reise Blog
          </h1>
          <p
            className="mt-4 text-white/90 text-lg sm:text-xl"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Inspiration für Ihre nächste Luxusreise
          </p>
        </div>
      </motion.section>

      {/* Blog Cards */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer overflow-hidden rounded-[30px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-100 transition-all duration-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-7 lg:p-8">
                <div className="mb-5 flex flex-wrap items-center gap-6 text-[15px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h2
                  className="mb-4 text-[28px] leading-[1.25] font-semibold text-[var(--navy)] transition-colors duration-300 group-hover:text-sky-500"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {post.title}
                </h2>

                <p className="mb-6 text-[15px] leading-8 text-slate-600">
                  {post.excerpt}
                </p>

                <div className="inline-flex items-center text-[15px] font-medium text-sky-500 transition-transform duration-300 group-hover:translate-x-1">
                  Weiterlesen →
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <BlogPostDetail
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}