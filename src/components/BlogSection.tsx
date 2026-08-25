import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import { blogsData } from '../data/blogsData'
import type { BlogPost } from '../types/blog'

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void
}

export function BlogSection({ onSelectPost }: BlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = ['All', 'Luxury Planning', 'Corporate', 'Destination Celebrations', 'Styling & Design']

  // Featured stories array for the carousel
  const featuredPosts = useMemo(() => {
    return blogsData.slice(0, 3)
  }, [])

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<number>(1)

  // Currently displayed featured post
  const currentFeaturedPost = featuredPosts[currentFeaturedIndex] || featuredPosts[0]

  // Preload featured images to prevent flicker during rotation
  useEffect(() => {
    featuredPosts.forEach((post) => {
      if (post.image) {
        const img = new Image()
        img.src = post.image
      }
    })
  }, [featuredPosts])

  // Auto-rotate featured carousel every 6 seconds
  useEffect(() => {
    if (isHovered || featuredPosts.length <= 1) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredPosts.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isHovered, featuredPosts.length, currentFeaturedIndex])

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    if (index === currentFeaturedIndex) return
    setDirection(index > currentFeaturedIndex ? 1 : -1)
    setCurrentFeaturedIndex(index)
  }

  // Filter remaining articles for the 4-card grid
  const secondaryPosts = useMemo(() => {
    return blogsData.filter((post) => {
      // Exclude current featured post from secondary grid when in 'All' category view
      if (activeCategory === 'All' && !searchQuery && post.id === currentFeaturedPost.id) {
        return false
      }
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, currentFeaturedPost.id])

  return (
    <section id="blogs" className="relative w-full bg-neutral-900 text-white py-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-900 to-black pointer-events-none" />
      
      <div className="relative max-w-[1400px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              CURATED EDITORIALS & PERSPECTIVES
            </span>
            <h2 className="font-outfit text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              INSIGHTS INTO <br />
              <span className="text-neutral-400 italic font-serif font-normal">BESPOKE CELEBRATIONS</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-inter">
              Delve into our architectural philosophies, luxury event planning guidelines, and behind-the-scenes stories crafted by the Navrassaa team.
            </p>
          </div>

          {/* Search Input */}
          <div className="space-y-4 w-full lg:w-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-72 bg-neutral-800/80 border border-neutral-700 text-white placeholder-neutral-500 text-xs px-10 py-3 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Category Nav Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-neutral-800/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-bold tracking-widest uppercase px-4 py-2 transition-all duration-300 whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-white text-minimal-black border-white'
                  : 'bg-neutral-800/40 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Automatic Rotating Featured Carousel */}
        {activeCategory === 'All' && !searchQuery && (
          <div
            className="group relative bg-neutral-950 border border-neutral-800 overflow-hidden cursor-pointer shadow-2xl rounded-sm transition-all duration-500 hover:border-neutral-700"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelectPost(currentFeaturedPost)}
          >
            {/* Pagination Dots / Slide Indicators */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 border border-neutral-800/80 rounded-full">
              {featuredPosts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleDotClick(e, idx)}
                  aria-label={`Go to featured slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    currentFeaturedIndex === idx
                      ? 'w-6 bg-amber-400'
                      : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentFeaturedPost.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 25 : -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -25 : 25 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 w-full h-full"
              >
                {/* Featured Image Column */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[400px] overflow-hidden">
                  <img
                    src={currentFeaturedPost.image}
                    alt={currentFeaturedPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 bg-amber-400 text-minimal-black text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 z-10">
                    FEATURED STORY
                  </div>
                </div>

                {/* Featured Details Column */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-neutral-400 font-semibold">
                      <span className="text-amber-400 uppercase tracking-widest text-[10px]">
                        {currentFeaturedPost.category}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        {currentFeaturedPost.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {currentFeaturedPost.readTime}
                      </span>
                    </div>

                    <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white leading-snug group-hover:text-amber-300 transition-colors duration-300">
                      {currentFeaturedPost.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-inter line-clamp-3">
                      {currentFeaturedPost.excerpt}
                    </p>
                  </div>

                  {/* Brand Footer */}
                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                      NAVRASSAA EDITORIAL
                    </span>

                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 group-hover:translate-x-1 transition-transform">
                      READ ARTICLE
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* 4 Cards in a Row Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondaryPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              onClick={() => onSelectPost(post)}
              className="group bg-neutral-950 border border-neutral-800 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300 shadow-lg rounded-sm"
            >
              {/* Fixed Size Card Media */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 bg-neutral-900/90 backdrop-blur-sm text-white text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 border border-neutral-700">
                  {post.category}
                </div>
              </div>

              {/* Fixed Uniform Card Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {post.readTime}
                    </span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                  </div>

                  <h4 className="font-outfit text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
                    {post.title}
                  </h4>

                  <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2 font-inter min-h-[2.25rem]">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs">
                  <span className="text-[8px] font-bold tracking-widest text-neutral-500 uppercase">
                    NAVRASSAA EDITORIAL
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-amber-400 uppercase group-hover:translate-x-1 transition-transform">
                    READ <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
