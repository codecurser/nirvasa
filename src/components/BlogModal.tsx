import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Calendar, Share2, Sparkles, ArrowRight } from 'lucide-react'
import type { BlogPost } from '../types/blog'

interface BlogModalProps {
  post: BlogPost | null
  onClose: () => void
  onBookConsultation: () => void
}

export function BlogModal({ post, onClose, onBookConsultation }: BlogModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (post) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [post, onClose])

  if (!post) return null

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Article link copied to clipboard!')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-neutral-200 shadow-2xl rounded-sm z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-neutral-200">
            <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              NAVRASSAA EDITORIAL
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 text-neutral-500 hover:text-minimal-black transition-colors rounded-full hover:bg-neutral-100"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-neutral-500 hover:text-minimal-black transition-colors rounded-full hover:bg-neutral-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-10 lg:p-12 space-y-8 no-scrollbar">
            {/* Category & Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-minimal-black text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1">
                  {post.category}
                </span>
                <span className="text-xs text-neutral-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  {post.date}
                </span>
                <span className="text-xs text-neutral-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {post.readTime}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black text-minimal-black tracking-tight leading-[1.15]">
                {post.title}
              </h1>
              <p className="font-inter text-lg sm:text-xl text-neutral-500 font-medium leading-relaxed">
                {post.subtitle}
              </p>
            </div>

            {/* Brand Editorial Header */}
            <div className="flex items-center gap-2 py-3 border-y border-neutral-100">
              <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-500 uppercase">
                NAVRASSAA EDITORIAL
              </span>
            </div>

            {/* Cover Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-neutral-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Content Paragraphs */}
            <div className="space-y-6 font-inter text-neutral-700 text-base leading-relaxed">
              {post.content.map((item, idx) => {
                if (item.type === 'heading') {
                  return (
                    <h3
                      key={idx}
                      className="font-outfit text-2xl sm:text-3xl font-extrabold text-minimal-black pt-4 tracking-tight"
                    >
                      {item.text}
                    </h3>
                  )
                }
                if (item.type === 'quote') {
                  return (
                    <blockquote
                      key={idx}
                      className="my-6 border-l-2 border-minimal-black pl-6 py-2 italic font-outfit text-xl sm:text-2xl text-minimal-black font-semibold bg-neutral-50/80 rounded-r-md"
                    >
                      "{item.text}"
                    </blockquote>
                  )
                }
                if (item.type === 'highlight') {
                  return (
                    <div
                      key={idx}
                      className="p-6 bg-neutral-900 text-white font-inter text-sm sm:text-base leading-relaxed border border-neutral-800 shadow-md my-4"
                    >
                      <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="text-neutral-200">{item.text}</p>
                    </div>
                  )
                }
                return <p key={idx}>{item.text}</p>
              })}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 border border-neutral-200 px-3 py-1 uppercase tracking-wider"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Consultation CTA Banner inside Article */}
            <div className="mt-10 p-8 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 text-white border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[9px] font-bold tracking-[0.2em] text-amber-400 uppercase block mb-1">
                  EXCLUSIVE DESIGN CONSULTATION
                </span>
                <h4 className="font-outfit text-xl font-bold tracking-tight">
                  Ready to craft your bespoke luxury celebration?
                </h4>
              </div>
              <button
                onClick={() => {
                  onClose()
                  onBookConsultation()
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-minimal-black hover:bg-amber-400 transition-colors px-6 py-3 font-outfit text-xs font-bold tracking-widest uppercase whitespace-nowrap"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
