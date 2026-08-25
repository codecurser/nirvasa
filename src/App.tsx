import { useState, useEffect, useRef } from 'react'
import { motion, MotionValue, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import logoImg from './assets/logo_transparent.png'
import { BlogSection } from './components/BlogSection'
import { BlogDetailPage } from './components/BlogDetailPage'
import type { BlogPost } from './types/blog'
import { 
  ArrowRight, 
  Award, 
  Briefcase, 
  Clock, 
  Compass, 
  Crown, 
  Heart, 
  MapPin, 
  Sparkles, 
  Utensils, 
  X, 
  MessageSquare,
  Check
} from 'lucide-react'

// Simple cn utility for classnames
const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ')
}

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Showcase', href: '#works' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact Us', href: '#book' },
]

const services = [
  {
    title: 'Corporate Events & Conferences',
    desc: 'Seamless execution, custom networking spaces, and cutting-edge production designed to project your corporate authority.',
    icon: Briefcase,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-champagne-poured-into-glasses-at-a-party-41712-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
    highlights: ['Symmetrical stage setups', 'Custom audio routing', 'Interactive panels'],
  },
  {
    title: 'Entire Wedding Planning',
    desc: 'Sophisticated ceremonies from location sourcing to clean structural setups, crafted perfectly to host your classic moment.',
    icon: Heart,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-wedding-rings-on-table-41716-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    highlights: ['Destination logistics', 'Opulent floral grids', 'Vip guest seating'],
  },
  {
    title: 'Theme-based Parties',
    desc: 'Immersive spaces featuring custom lighting architectures, structural concepts, and curated layouts that host distinct settings.',
    icon: Sparkles,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-champagne-poured-into-glasses-at-a-party-41712-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
    highlights: ['Concept lighting arrays', 'Interactive installations', 'Scenic set builds'],
  },
  {
    title: 'Birthday Decors',
    desc: 'Clean celebratory styling featuring geometric displays, architectural lighting, and signature minimalist backdrops.',
    icon: Crown,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-champagne-poured-into-glasses-at-a-party-41712-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800',
    highlights: ['Minimal backdrops', 'Aesthetic color mapping', 'Fine structural framing'],
  },
  {
    title: 'Dining & Catering',
    desc: 'Curated menus by expert culinary chefs paired with clean spatial dining layouts, modern setups, and custom signature cocktail bars.',
    icon: Utensils,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-champagne-poured-into-glasses-at-a-party-41712-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800',
    highlights: ['Chef-designed plating', 'Mixology bar staging', 'Fine dining geometry'],
  },
  {
    title: 'Social & Cultural Events',
    desc: 'Large community events celebrating legacy with structural stage designs, structural setups, and streamlined crowd coordination.',
    icon: Compass,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-at-a-concert-41680-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800',
    highlights: ['Monumental staging', 'Sound path engineering', 'Crowd flow logistics'],
  },
]

const stats = [
  { value: '450+', label: 'Events Curated' },
  { value: '98%', label: 'Flawless Rating' },
  { value: '15+', label: 'Global Destinations' },
  { value: '100M+', label: 'Impressions Built' },
]

const stockImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", // Wedding
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800", // Corporate
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800", // Party
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800", // Birthday
  "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800", // Dining
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800", // Concert
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", // Floral
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800", // Stage
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800", // Plates
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800", // Audience
]

const cinematicVideos = [
  {
    title: 'THE CORPORATE SUMMIT',
    desc: 'High-end corporate keynotes and spatial architectural designs.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-champagne-poured-into-glasses-at-a-party-41712-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
  },
  {
    title: 'THE COMO UNION',
    desc: 'Opulent wedding orchestrations and lakefront destination ceremonies.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-wedding-rings-on-table-41716-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
  },
  {
    title: 'THE FESTIVAL STAGE',
    desc: 'Monumental stage designs, lighting arrays, and public operations.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-at-a-concert-41680-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800',
  }
]

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
}

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[200px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-64 sm:h-72 lg:h-[30vh] w-full overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
          <img
            src={src}
            alt="Event archive illustration"
            className="pointer-events-none w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  )
}

// Character Components for Splitting Reveals (Skiper31)
type CharacterProps = {
  char: string
  index: number
  centerIndex: number
  scrollYProgress: any
}

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " "
  const distanceFromCenter = index - centerIndex

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  )
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  )

  return (
    <motion.span
      className={cn("inline-block text-minimal-black font-black font-outfit", isSpace && "w-6")}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  )
}

type IconCharacterProps = {
  icon: React.ComponentType<{ className?: string }>
  index: number
  centerIndex: number
  scrollYProgress: any
}

const CharacterV2 = ({
  icon: Icon,
  index,
  centerIndex,
  scrollYProgress,
}: IconCharacterProps) => {
  const distanceFromCenter = index - centerIndex

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 55, 0]
  )
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1])

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 35, 0]
  )

  return (
    <motion.div
      className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-neutral-200 shadow-md p-3 mx-1 text-minimal-black hover:border-minimal-black transition-colors duration-300"
      style={{
        x,
        scale,
        y,
        transformOrigin: "center",
      }}
    >
      <Icon className="w-6 h-6" />
    </motion.div>
  )
}

const CharacterV3 = ({
  icon: Icon,
  index,
  centerIndex,
  scrollYProgress,
}: IconCharacterProps) => {
  const distanceFromCenter = index - centerIndex

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 80, 0]
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 45, 0]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 20, 0]
  )
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1])

  return (
    <motion.div
      className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-neutral-200 shadow-md p-3 mx-1 text-minimal-black hover:border-minimal-black transition-colors duration-300"
      style={{
        x,
        rotate,
        y,
        scale,
        transformOrigin: "center",
      }}
    >
      <Icon className="w-6 h-6" />
    </motion.div>
  )
}

function ServicesSection({ 
  setSelectedService 
}: { 
  setSelectedService: (title: string) => void 
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)

  // Framer Motion useScroll pinned on section container from start start to end end
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // 6 services = 600% track width. Shifting by 5 slide widths (5/6 = 83.333333%) displays slide 6.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.333333%"])
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Sync active counter with scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(Math.max(Math.round(latest * 5), 0), 5)
    setActiveServiceIndex(index)
  })

  // Mobile scroll handler for swipeable carousel indicator
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return
    const { scrollLeft, clientWidth } = mobileScrollRef.current
    if (clientWidth > 0) {
      const idx = Math.min(Math.max(Math.round(scrollLeft / (clientWidth * 0.8)), 0), 5)
      setMobileIndex(idx)
    }
  }

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className="relative w-full bg-white z-20 md:h-[600vh]"
    >
      {/* DESKTOP & TABLET VIEW (md and up): Pinned Sticky Horizontal Scroll */}
      <div className="hidden md:flex sticky top-0 w-full h-screen overflow-hidden flex-col justify-between">
        
        {/* Header Progress indicator */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 md:pt-10 flex justify-between items-end border-b border-neutral-100 pb-4 shrink-0 z-30">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-1.5 block">
              OUR SERVICES
            </span>
            <h2 className="font-outfit text-2xl sm:text-3xl font-extrabold text-minimal-black">
              Bespoke Experiences. One by One.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-neutral-400 uppercase">
            <span className="hidden sm:inline">SCROLL DOWN TO ADVANCE</span>
            <span className="hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-1.5 text-minimal-black bg-neutral-100/90 backdrop-blur-sm px-3.5 py-1.5 border border-neutral-200/80 font-mono text-sm font-bold shadow-xs">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={activeServiceIndex} 
                  initial={{ opacity: 0, y: -6 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 6 }} 
                  transition={{ duration: 0.15 }}
                  className="inline-block min-w-[2ch] text-center"
                >
                  0{activeServiceIndex + 1}
                </motion.span>
              </AnimatePresence>
              <span className="text-neutral-400 font-normal">/</span>
              <span className="text-neutral-400 font-normal">06</span>
            </div>
          </div>
        </div>

        {/* Horizontal Slide Container Track */}
        <div className="flex-1 flex items-center overflow-hidden relative">
          <motion.div 
            style={{ x, width: '600%' }}
            className="flex flex-row flex-nowrap h-[72vh] shrink-0"
          >
            {services.map((service, index) => (
              <div 
                key={service.title} 
                className="w-1/6 h-full shrink-0 flex flex-col lg:flex-row items-center px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto gap-8 lg:gap-16"
              >
                {/* Left Column: Image base layer + Video hover preview */}
                <div className="w-full lg:w-1/2 h-[42%] lg:h-[88%] relative overflow-hidden border border-neutral-200 shadow-md group cursor-pointer">
                  
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  <video
                    src={service.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    ref={(el) => { 
                      if (el) { 
                        el.muted = true; 
                        el.play().catch(() => {}); 
                      } 
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-neutral-200 px-3 py-1 text-[8px] font-bold tracking-widest uppercase text-minimal-black group-hover:bg-minimal-black group-hover:text-white transition-colors duration-300">
                    HOVER TO WATCH PREVIEW
                  </div>

                  <span className="absolute bottom-4 left-6 font-outfit text-5xl lg:text-7xl font-black text-white/20 select-none">
                    0{index + 1}
                  </span>
                </div>

                {/* Right Column: Editorial Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-start justify-center pr-4">
                  <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-minimal-black animate-pulse" />
                    SERVICE FOCUS
                  </span>
                  <h3 className="font-outfit text-2xl sm:text-4xl font-extrabold text-minimal-black tracking-tight mb-5 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-6 font-inter">
                    {service.desc}
                  </p>

                  <div className="space-y-2 mb-8">
                    {service.highlights.map((point) => (
                      <div key={point} className="flex items-center gap-3 text-xs text-neutral-600 font-semibold tracking-wide uppercase">
                        <div className="w-5 h-5 rounded-full border border-neutral-200 flex items-center justify-center bg-neutral-50">
                          <Check className="w-3 h-3 text-minimal-black" />
                        </div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedService(service.title)
                      const portal = document.getElementById('book')
                      if (portal) {
                        portal.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-minimal-black text-white font-outfit text-xs font-bold tracking-widest uppercase px-6 py-3.5 hover:bg-neutral-800 transition-colors duration-300 cursor-pointer"
                  >
                    CONFIGURE IN PORTAL
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual bottom progress bar indicator */}
        <div className="w-full h-[4px] bg-neutral-100 mt-auto shrink-0 z-30 overflow-hidden">
          <motion.div 
            style={{ width: progressBarWidth }}
            className="h-full bg-minimal-black"
          />
        </div>
      </div>

      {/* MOBILE VIEW (< md): Touch-Friendly Horizontal Swipe Carousel */}
      <div className="block md:hidden py-12 px-4 w-full overflow-hidden">
        {/* Mobile Header */}
        <div className="px-2 mb-6 flex justify-between items-end border-b border-neutral-100 pb-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-1 block">
              OUR SERVICES
            </span>
            <h2 className="font-outfit text-xl font-extrabold text-minimal-black">
              Bespoke Experiences
            </h2>
          </div>
          <div className="flex items-center gap-1 text-minimal-black bg-neutral-100 px-3 py-1 rounded-full font-mono text-xs font-bold">
            <span>0{mobileIndex + 1}</span>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-400 font-normal">06</span>
          </div>
        </div>

        {/* Swipeable Carousel Track */}
        <div 
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 px-2"
        >
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="snap-center shrink-0 w-[88vw] max-w-sm bg-white border border-neutral-200 p-5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden border border-neutral-200 mb-5 group">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute bottom-2 left-4 font-outfit text-4xl font-black text-white/30">
                    0{index + 1}
                  </span>
                </div>

                <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase mb-2 block">
                  SERVICE FOCUS
                </span>
                <h3 className="font-outfit text-lg font-bold text-minimal-black mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                  {service.desc}
                </p>
                <div className="space-y-1.5 mb-6">
                  {service.highlights.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-[10px] text-neutral-600 font-semibold uppercase">
                      <Check className="w-3 h-3 text-minimal-black shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedService(service.title)
                  const portal = document.getElementById('book')
                  if (portal) {
                    portal.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-minimal-black text-white font-outfit text-xs font-bold tracking-widest uppercase py-3 cursor-pointer"
              >
                CONFIGURE IN PORTAL
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Slide Dot Indicator */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (mobileScrollRef.current) {
                  const cardWidth = mobileScrollRef.current.clientWidth * 0.85
                  mobileScrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
                }
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                mobileIndex === i ? "bg-minimal-black w-6" : "bg-neutral-300"
              )}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [heroRotate, setHeroRotate] = useState({ x: 0, y: 0 })
  const [selectedService, setSelectedService] = useState<string>('Entire Wedding Planning')
  const [selectedLocation, setSelectedLocation] = useState<string>('Luxury Estate')
  const [guestCount, setGuestCount] = useState<number>(250)
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null)
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  
  // Track scroll position for header animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize Lenis smooth scroll globally on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard smooth easing
      smoothWheel: true
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])



  // Dimension & scroll tracking for the vertical columns showcase (Skiper30)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress: galleryScrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener("resize", resize)
    resize()
    return () => window.removeEventListener("resize", resize)
  }, [])

  const { height: windowHeight } = dimension
  const y = useTransform(galleryScrollYProgress, [0, 1], [0, windowHeight * 2])
  const y2 = useTransform(galleryScrollYProgress, [0, 1], [0, windowHeight * 3.3])
  const y3 = useTransform(galleryScrollYProgress, [0, 1], [0, windowHeight * 1.25])
  const y4 = useTransform(galleryScrollYProgress, [0, 1], [0, windowHeight * 3])

  // Refs for character reveal scrolling triggers (Skiper31)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const targetRef2 = useRef<HTMLDivElement | null>(null)
  const targetRef3 = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress: revealScrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })
  const { scrollYProgress: revealScrollYProgress2 } = useScroll({
    target: targetRef2,
    offset: ["start end", "end start"]
  })
  const { scrollYProgress: revealScrollYProgress3 } = useScroll({
    target: targetRef3,
    offset: ["start end", "end start"]
  })

  const revealText = "NAVRASSAA EXPERIENCE"
  const characters = revealText.split("")
  const centerIndex = Math.floor(characters.length / 2)

  const eventIcons = [
    Briefcase,
    Heart,
    Sparkles,
    Crown,
    Utensils,
    Compass,
    Award,
    MapPin,
    Clock
  ]
  const iconCenterIndex = Math.floor(eventIcons.length / 2)

  // Mouse move handler for Hero 3D elements
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX - innerWidth / 2) / (innerWidth / 2) // -1 to 1
    const y = (clientY - innerHeight / 2) / (innerHeight / 2) // -1 to 1
    setHeroRotate({ x: x * 8, y: -y * 8 })
  }

  const handleHeroMouseLeave = () => {
    setHeroRotate({ x: 0, y: 0 })
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  const heroOpacity = Math.max(1 - scrollY / 650, 0)
  const heroScale = Math.max(1 - scrollY / 2500, 0.95)

  if (selectedBlogPost) {
    return (
      <BlogDetailPage
        post={selectedBlogPost}
        onBack={() => setSelectedBlogPost(null)}
        onBookConsultation={() => {
          setSelectedBlogPost(null)
          setTimeout(() => {
            document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
          }, 150)
        }}
      />
    )
  }

  return (
    <div className="relative bg-white text-minimal-black w-full min-h-screen font-inter select-none bg-grid-pattern">
      
      {/* Scroll Progress Bar */}
      <div 
        style={{ width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
        className="fixed top-0 left-0 h-[2px] bg-minimal-black z-50 transition-all duration-100"
      />

      {/* Header / Navbar - Merged directly over Hero Video */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
          
          {/* Logo image */}
          <a href="#" className="flex items-center gap-3 group py-1">
            <img 
              src={logoImg} 
              alt="Navrassaa Events Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.45)]"
            />
          </a>

          {/* Desktop Nav - Horizontal listing merged over video */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-white/90 uppercase tracking-widest hover:text-amber-400 transition-colors duration-200 drop-shadow-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#book"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-amber-400 bg-black/40 hover:bg-amber-500 hover:text-black text-white px-5 py-2.5 font-outfit text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm backdrop-blur-sm shadow-lg"
            >
              BOOK CONSULTATION
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden flex flex-col items-end gap-1.5 p-2 focus:outline-none"
            aria-label="Open Menu"
          >
            <div className="w-6 h-0.5 bg-white" />
            <div className="w-6 h-0.5 bg-white" />
            <div className="w-4 h-0.5 bg-white" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white/98 backdrop-blur-md flex flex-col justify-between transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-neutral-100">
          <a href="#" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <img src={logoImg} alt="Navrassaa Events Logo" className="h-9 w-auto object-contain" />
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-minimal-black hover:text-neutral-500 transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex-1 flex flex-col justify-center items-center gap-8">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-outfit text-2xl text-minimal-black uppercase tracking-widest hover:text-amber-600 transition-all duration-500 transform ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 80 + 100}ms` }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div
            className={`transition-all duration-500 transform mt-8 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '420ms' }}
          >
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 bg-minimal-black text-white font-outfit text-xs font-bold tracking-widest uppercase px-8 py-4"
            >
              BOOK CONSULTATION
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        <div className="text-center py-6 text-[10px] tracking-widest text-neutral-400">
          <span>NAVRASSAA &bull; BESPOKE LUXURY GATHERINGS</span>
        </div>
      </div>

      {/* Hero Section - Pure Unobstructed Full-Bleed Video Background */}
      <section 
        id="hero"
        style={{ opacity: heroOpacity, transform: `scale(${heroScale})` }}
        className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[65vh] flex flex-col justify-end items-center text-center px-6 pb-16 z-10 preserve-3d overflow-hidden"
      >
        {/* Crystal Clear full-bleed video background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            src="/genrate_an_video_for_the_hero.mp4"
            poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1500"
            autoPlay
            muted
            loop
            playsInline
            ref={(el) => { 
              if (el) { 
                el.muted = true; 
                el.play().catch((err) => console.log('Autoplay blocked:', err)); 
              } 
            }}
            className="w-full h-full object-cover filter brightness-100 contrast-100"
          />
        </div>
      </section>

      {/* 4 Overlapping Feature Cards - Placed at the bottom edge of Hero Video */}
      <div className="relative -mt-16 sm:-mt-20 z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature Card 1 */}
          <a href="#services" className="group bg-white rounded-lg border border-neutral-200/80 p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Briefcase className="w-7 h-7" />
            </div>
            <h4 className="font-outfit text-base font-extrabold text-neutral-900 uppercase tracking-wide group-hover:text-purple-600 transition-colors">
              CORPORATE EVENTS
            </h4>
            <p className="text-xs text-neutral-500 mt-2 font-inter leading-relaxed">
              Summits, keynotes & corporate galas executed with authority.
            </p>
          </a>

          {/* Feature Card 2 */}
          <a href="#services" className="group bg-white rounded-lg border border-neutral-200/80 p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Heart className="w-7 h-7" />
            </div>
            <h4 className="font-outfit text-base font-extrabold text-neutral-900 uppercase tracking-wide group-hover:text-pink-600 transition-colors">
              PALACE WEDDINGS
            </h4>
            <p className="text-xs text-neutral-500 mt-2 font-inter leading-relaxed">
              Royal heritage celebrations & coastal destination mandaps.
            </p>
          </a>

          {/* Feature Card 3 */}
          <a href="#services" className="group bg-white rounded-lg border border-neutral-200/80 p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="font-outfit text-base font-extrabold text-neutral-900 uppercase tracking-wide group-hover:text-amber-600 transition-colors">
              PRODUCTION & LIGHTING
            </h4>
            <p className="text-xs text-neutral-500 mt-2 font-inter leading-relaxed">
              Immersive stage design, spatial audio & visual architecture.
            </p>
          </a>

          {/* Feature Card 4 */}
          <a href="#services" className="group bg-white rounded-lg border border-neutral-200/80 p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <Crown className="w-7 h-7" />
            </div>
            <h4 className="font-outfit text-base font-extrabold text-neutral-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
              LUXURY HOSPITALITY
            </h4>
            <p className="text-xs text-neutral-500 mt-2 font-inter leading-relaxed">
              Seamless guest relations, concierge & VIP arrival experiences.
            </p>
          </a>

        </div>
      </div>

      {/* The Studio / About Section */}
      <section 
        id="about" 
        className="relative py-24 sm:py-32 border-b border-neutral-200/60 bg-white z-10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Grid (Left) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Outline box frames */}
            <div className="absolute w-80 h-80 border border-neutral-200 rotate-45 pointer-events-none" />
            <div className="absolute w-80 h-80 border border-neutral-100 -rotate-12 pointer-events-none" />
            
            {/* Center minimalist card */}
            <div className="relative bg-white border border-neutral-200 rounded-none p-8 max-w-sm w-full z-10 shadow-lg hover:-translate-y-1 transition-transform duration-500">
              <Award className="w-10 h-10 text-minimal-black mb-6" />
              <h4 className="font-outfit text-lg font-bold mb-3 tracking-wide text-minimal-black">STRUCTURAL DESIGN</h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                We believe visual restraint projects higher quality than ornament. Our setups focus on symmetry, lighting path coordinates, and spatial order.
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 text-[9px] text-neutral-400 tracking-widest uppercase font-bold">
                <span>ESTABLISHED 2018</span>
                <span>&bull;</span>
                <span>TOKYO - PARIS</span>
              </div>
            </div>
          </div>

          {/* Copy (Right) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-3">
              THE STUDIO
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-minimal-black">
              Restrained visual language. Extraordinary execution.
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-5 text-sm font-inter">
              Navrassaa Events functions at the intersection of architecture and event production. By stripping away visual clutter, we highlight structural shapes, pristine caterings, and smooth timeline operations.
            </p>
            <p className="text-neutral-500 leading-relaxed mb-8 text-sm font-inter">
              Our studio handles location layouts, seating architectures, custom audio coordinate arrays, and timeline logistics. We operate with strict adherence to minimal design standards, delivering experiences that command attention.
            </p>

            <div className="grid grid-cols-2 gap-8 w-full border-t border-neutral-100 pt-6">
              <div>
                <span className="block font-outfit text-lg font-bold text-minimal-black tracking-tight">MINIMAL DESIGN</span>
                <span className="block text-[9px] tracking-widest text-neutral-400 uppercase mt-0.5">High visual restraint</span>
              </div>
              <div>
                <span className="block font-outfit text-lg font-bold text-minimal-black tracking-tight">PRECISE RUNTIME</span>
                <span className="block text-[9px] tracking-widest text-neutral-400 uppercase mt-0.5">Minute-perfect operations</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Services Grid Section - Pinned horizontal storytelling section */}
      <ServicesSection setSelectedService={setSelectedService} />

      {/* Skiper30 - Showcase vertical multi-column parallax photo gallery */}
      <section id="works" className="relative py-24 sm:py-32 bg-white border-t border-b border-neutral-100 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-3 block">
              PORTFOLIO ARCHIVES
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-minimal-black mb-4">
              Structural showcases.
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Scroll down to inspect our visual layouts. The adjacent pillars slide vertically at offset calculations to display visual depth.
            </p>
          </div>

          {/* Skiper30 Parallax track container */}
          <div
            ref={galleryRef}
            className="relative box-border flex h-[100vh] sm:h-[120vh] lg:h-[140vh] gap-[2vw] overflow-hidden bg-white p-[2vw] border border-neutral-200"
          >
            <Column images={[stockImages[0], stockImages[1], stockImages[2]]} y={y} />
            <Column images={[stockImages[3], stockImages[4], stockImages[5]]} y={y2} />
            <Column images={[stockImages[6], stockImages[7], stockImages[8]]} y={y3} />
            <Column images={[stockImages[9], stockImages[0], stockImages[1]]} y={y4} />
          </div>

        </div>
      </section>

      {/* Curated Blog Section */}
      <BlogSection 
        onSelectPost={(post) => setSelectedBlogPost(post)} 
      />

      {/* Skiper31 - Transition folds right before the booking portal */}
      <section className="relative w-full bg-[#f5f4f3] border-t border-b border-neutral-200 py-24 z-10">
        
        {/* Character reveal splitting target 1 */}
        <div
          ref={targetRef}
          className="relative box-border flex h-[60vh] items-center justify-center gap-[2vw] overflow-hidden p-[2vw] border-b border-neutral-200/60"
        >
          <div
            className="font-outfit w-full max-w-4xl text-center text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-minimal-black"
            style={{ perspective: "500px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={revealScrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Character reveal splitting target 2 - circular icons layout */}
        <div
          ref={targetRef2}
          className="relative box-border flex h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden p-[2vw]"
        >
          <p className="font-outfit flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-[0.25em] text-neutral-400 uppercase">
            <span>&bull;</span>
            <span>INTEGRATED WORKFLOW</span>
            <span>&bull;</span>
          </p>
          <div className="w-full max-w-4xl text-center">
            {eventIcons.map((icon, index) => (
              <CharacterV2
                key={index}
                icon={icon}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={revealScrollYProgress2}
              />
            ))}
          </div>
        </div>

        {/* Character reveal splitting target 3 - rotating circular icons layout */}
        <div
          ref={targetRef3}
          className="relative box-border flex h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden p-[2vw]"
        >
          <p className="font-outfit flex items-center justify-center gap-3 text-xs sm:text-sm font-bold tracking-[0.25em] text-neutral-400 uppercase">
            <span>&bull;</span>
            <span>OPULENT STANDARDS</span>
            <span>&bull;</span>
          </p>
          <div className="w-full max-w-4xl text-center" style={{ perspective: "500px" }}>
            {eventIcons.map((icon, index) => (
              <CharacterV3
                key={index}
                icon={icon}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={revealScrollYProgress3}
              />
            ))}
          </div>
        </div>

      </section>

      {/* Cinematic Moments Gallery */}
      <section id="cinematic" className="relative py-24 sm:py-32 bg-neutral-50/50 border-t border-b border-neutral-100 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-3 block">
              CINEMATIC ARCHIVES
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-minimal-black mb-4">
              Experience the atmosphere.
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Click any archive to launch our high-definition player. Experience the visual weight and sound design of our active gathers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cinematicVideos.map((item) => (
              <div
                key={item.title}
                onClick={() => setActiveVideoModal(item.videoUrl)}
                className="group relative overflow-hidden bg-white border border-neutral-200 p-4 hover:border-minimal-black transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="w-full h-56 relative overflow-hidden bg-neutral-100 mb-4 border border-neutral-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <video
                    src={item.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    ref={(el) => { 
                      if (el) { 
                        el.muted = true; 
                        el.play().catch(() => {}); 
                      } 
                    }}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-350">
                      <Sparkles className="w-5 h-5 text-minimal-black animate-pulse" />
                    </div>
                  </div>
                </div>
                <h4 className="font-outfit text-md font-bold text-minimal-black mb-1 group-hover:text-black transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-white border-b border-neutral-100 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-outfit text-4xl sm:text-5xl font-black text-minimal-black tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase mt-2.5 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Design Portal */}
      <section id="book" className="relative py-24 sm:py-32 bg-white z-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-3 block">
              DESIGN PORTAL
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold tracking-tight text-minimal-black mb-4">
              Configure parameters.
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
              Define the scale, preferred locations, and vision criteria for your event. Our production architects will assemble a mood board and floor coordinate plan.
            </p>
          </div>

          {/* Minimal Form */}
          <div className="border border-neutral-200 bg-white p-8 sm:p-12 shadow-sm">
            
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              
              {/* Event selection button grid */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-4">
                  EVENT STREAM
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {services.map((serv) => (
                    <button
                      key={serv.title}
                      type="button"
                      onClick={() => setSelectedService(serv.title)}
                      className={`px-4 py-2.5 border text-[11px] font-bold tracking-wider text-center transition-all duration-300 ${
                        selectedService === serv.title
                          ? 'border-minimal-black bg-minimal-black text-white'
                          : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400 hover:text-minimal-black'
                      }`}
                    >
                      {serv.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Location buttons */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-3">
                    PREFERRED SETTING
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Luxury Estate', 'Historic Palace', 'Metropolitan Loft', 'Tropical Shore'].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setSelectedLocation(loc)}
                        className={`px-4 py-2.5 border text-[10px] font-bold tracking-wider text-center transition-all duration-300 ${
                          selectedLocation === loc
                            ? 'border-minimal-black bg-minimal-black text-white'
                            : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400 hover:text-minimal-black'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                      GUEST CAPACITY
                    </label>
                    <span className="font-outfit text-xs font-bold text-minimal-black">
                      {guestCount} guests
                    </span>
                  </div>
                  <div className="relative pt-3">
                    <input
                      type="range"
                      min={50}
                      max={1500}
                      step={50}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-minimal-black focus:outline-none"
                    />
                    <div className="flex justify-between text-[9px] text-neutral-400 uppercase font-bold mt-2">
                      <span>50</span>
                      <span>Mid (500)</span>
                      <span>Imperial (1500)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Lord Sterling"
                    className="w-full py-2 bg-transparent text-minimal-black text-sm border-b border-neutral-200 focus:border-minimal-black focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. sterling@estate.com"
                    className="w-full py-2 bg-transparent text-minimal-black text-sm border-b border-neutral-200 focus:border-minimal-black focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Vision Notes */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2">
                  Vision Blueprint / Special Aesthetic Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="E.g., high-contrast layout, white lighting coordinates, symmetrical setups..."
                  className="w-full py-2 bg-transparent text-minimal-black text-sm border-b border-neutral-200 focus:border-minimal-black focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-minimal-black text-white hover:bg-neutral-800 font-outfit text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  INITIALIZE PRODUCTION
                  <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '6s' }} />
                </button>
                
                {formSubmitted && (
                  <div className="mt-4 text-xs tracking-widest text-minimal-black font-bold animate-pulse text-center">
                    PRODUCTION ENGINE RUNNING. AN EXPERIENCE DESIGNER WILL CALL YOU IN 12 HOURS.
                  </div>
                )}
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-24 sm:py-32 border-t border-neutral-100 bg-neutral-50/30 z-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          
          <span className="text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase mb-6 block">
            CLIENT EXPERIENCE
          </span>

          <div className="relative py-4">
            <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto mb-6" />
            <p className="font-outfit text-xl sm:text-2xl italic leading-relaxed text-minimal-black max-w-3xl mx-auto mb-8">
              "Navrassaa Events engineered a wedding union that felt like a museum exhibition. Symmetrical floral grids, clean audio paths, and flawless catering scheduling. Exceptional restraint."
            </p>
            <div className="flex flex-col items-center">
              <span className="font-outfit font-extrabold text-[11px] tracking-widest uppercase text-minimal-black">
                HELENA &amp; AURELIUS BRANSON
              </span>
              <span className="text-[9px] tracking-widest text-neutral-400 uppercase mt-0.5">
                Lake Como, Wedding 2025
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Video Lightbox Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black border border-white/10 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-neutral-400 transition-colors flex items-center gap-1 text-xs tracking-widest uppercase font-bold cursor-pointer"
            >
              CLOSE <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full h-full">
              <video
                src={activeVideoModal}
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative bg-white border-t border-neutral-200 pt-20 pb-10 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-100">
            
            {/* Logo details */}
            <div className="md:col-span-4 flex flex-col items-start">
              <img 
                src={logoImg} 
                alt="Navrassaa Events Logo" 
                className="h-14 sm:h-16 w-auto object-contain mb-4"
              />
              <span className="text-[10px] text-neutral-400 tracking-widest uppercase font-bold mb-4">
                BESPOKE EXPERIENCE DESIGN
              </span>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
                Architectural layouts, visual stage blueprints, destination coordination, and clean gather operations. Curating space systems since 2018.
              </p>
            </div>

            {/* Links */}
            <div className="md:col-span-3">
              <h5 className="text-[10px] font-bold tracking-widest text-minimal-black uppercase mb-4">
                THE STUDIO
              </h5>
              <ul className="space-y-3 text-[10px] text-neutral-500 font-bold tracking-wider uppercase">
                <li><a href="#about" className="hover:text-minimal-black transition-colors">THE VISION</a></li>
                <li><a href="#services" className="hover:text-minimal-black transition-colors">SERVICES PORTFOLIO</a></li>
                <li><a href="#works" className="hover:text-minimal-black transition-colors">ARCHIVE BLUEPRINT</a></li>
                <li><a href="#book" className="hover:text-minimal-black transition-colors">DESIGN PORTAL</a></li>
              </ul>
            </div>

            {/* Address */}
            <div className="md:col-span-3">
              <h5 className="text-[10px] font-bold tracking-widest text-minimal-black uppercase mb-4">
                OFFICES
              </h5>
              <ul className="space-y-4 text-xs text-neutral-500 leading-relaxed font-semibold">
                <li className="flex gap-2">
                  <MapPin className="w-4 h-4 text-minimal-black shrink-0" />
                  <span>TOKYO &bull; Shibuya District, Suite 4A</span>
                </li>
                <li className="flex gap-2">
                  <MapPin className="w-4 h-4 text-minimal-black shrink-0" />
                  <span>PARIS &bull; 8ème Arrondissement, Champs-Élysées 402</span>
                </li>
                <li className="flex gap-2">
                  <MapPin className="w-4 h-4 text-minimal-black shrink-0" />
                  <span>DELHI &bull; Mehrauli Heritage Complex, The Arches Gallery</span>
                </li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="md:col-span-2">
              <h5 className="text-[10px] font-bold tracking-widest text-minimal-black uppercase mb-4">
                CONTACT
              </h5>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 font-semibold">
                <Clock className="w-4 h-4 text-minimal-black" />
                <span>24/7 Service</span>
              </div>
              <span className="block text-xs text-neutral-400">
                concierge@navrassaaevents.com
              </span>
              <span className="block text-xs text-neutral-400 mt-0.5">
                +81 (3) 5422 9901
              </span>
            </div>

          </div>

          {/* Socials / Copyright */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="text-[9px] tracking-widest text-neutral-400 uppercase text-center sm:text-left font-bold">
              <span>&copy; {new Date().getFullYear()} NAVRASSAA. ALL RIGHTS RESERVED. &bull; MINIMALIST PROFESSIONAL GATHERINGS.</span>
            </div>

            <div className="flex items-center gap-6 text-neutral-400 font-bold">
              <a href="#" className="hover:text-minimal-black transition-colors text-[10px] tracking-widest uppercase">INSTAGRAM</a>
              <a href="#" className="hover:text-minimal-black transition-colors text-[10px] tracking-widest uppercase">PINTEREST</a>
              <a href="#" className="hover:text-minimal-black transition-colors text-[10px] tracking-widest uppercase">VIMEO</a>
              <a href="#" className="hover:text-minimal-black transition-colors text-[10px] tracking-widest uppercase">LINKEDIN</a>
            </div>

          </div>

        </div>
      </footer>

    </div>
  )
}
