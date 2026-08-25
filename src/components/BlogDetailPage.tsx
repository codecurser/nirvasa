import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, ArrowRight } from 'lucide-react'
import type { BlogPost } from '../types/blog'
import logoImg from '../assets/logo_transparent.png'

interface BlogDetailPageProps {
  post: BlogPost
  onBack: () => void
  onBookConsultation: () => void
}

export function BlogDetailPage({ post, onBack, onBookConsultation }: BlogDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [post])

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white text-minimal-black font-inter selection:bg-minimal-black selection:text-white"
    >
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-minimal-black hover:text-amber-600 transition-colors py-2 px-3 bg-neutral-100 hover:bg-neutral-200 rounded-sm border border-neutral-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </button>

          <a href="#" onClick={onBack} className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="Navrassaa Events Logo"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-600 hover:text-minimal-black transition-colors py-2 px-3 border border-neutral-200 hover:border-neutral-400"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {/* Main Article Body */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-12 sm:py-16 space-y-10">
        {/* Category & Date Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-minimal-black text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5">
              {post.category}
            </span>
            <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {post.date}
            </span>
            <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {post.readTime}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-black text-minimal-black tracking-tight leading-[1.12]">
            {post.title}
          </h1>
          <p className="font-inter text-lg sm:text-2xl text-neutral-500 font-medium leading-relaxed">
            {post.subtitle}
          </p>
        </div>

        {/* Primary Single Image for the Blog */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-neutral-200 shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <article className="space-y-7 font-inter text-neutral-800 text-base sm:text-lg leading-relaxed pt-4">
          {post.content.map((item, idx) => {
            if (item.type === 'heading') {
              return (
                <h2
                  key={idx}
                  className="font-outfit text-2xl sm:text-4xl font-extrabold text-minimal-black pt-6 pb-1 tracking-tight border-t border-neutral-100"
                >
                  {item.text}
                </h2>
              )
            }
            if (item.type === 'quote') {
              return (
                <blockquote
                  key={idx}
                  className="my-8 border-l-4 border-minimal-black pl-6 sm:pl-8 py-3 italic font-outfit text-xl sm:text-2xl text-minimal-black font-semibold bg-neutral-50 rounded-r-md"
                >
                  "{item.text}"
                </blockquote>
              )
            }
            if (item.type === 'highlight') {
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 bg-neutral-950 text-white font-inter text-base sm:text-lg leading-relaxed border border-neutral-800 shadow-xl my-6 rounded-sm"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 mb-3" />
                  <p className="text-neutral-200 font-medium">{item.text}</p>
                </div>
              )
            }
            return <p key={idx}>{item.text}</p>
          })}
        </article>

        {/* Tags */}
        <div className="pt-8 border-t border-neutral-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 uppercase tracking-wider"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Consultation Call To Action Banner */}
        <div className="mt-12 p-8 sm:p-12 bg-neutral-950 text-white border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-8 rounded-sm shadow-2xl">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-amber-400 uppercase block">
              BESPOKE EVENT CURATION
            </span>
            <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to plan your luxury celebration?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Connect with the Navrassaa team to translate your story into an unforgettable experience.
            </p>
          </div>
          <button
            onClick={() => {
              onBack()
              setTimeout(onBookConsultation, 100)
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-minimal-black hover:bg-amber-400 transition-colors px-8 py-4 font-outfit text-xs font-bold tracking-widest uppercase whitespace-nowrap"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Back to top & return button */}
        <div className="pt-8 flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-500 hover:text-minimal-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to All Articles
          </button>
        </div>
      </main>
    </motion.div>
  )
}
