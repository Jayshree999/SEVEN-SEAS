'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

const celebrationExperiences = [
  {
    title: 'Birthday Party',
    description: 'With tailored perfection and unmatched attention to detail, we ensure that every detail is curated to suit your needs.',
    image: '/events-3/birthday-party.jpg', // Screenshot-2026-05-28-164706 (slide 1 on live)
  },
  {
    title: 'Real Estate Event',
    description: 'Explore a spectrum of options tailored to suit your preferences from multiple venues, inside the hotel.',
    image: '/events-3/real-estate.jpg',    // bg-about (slide 2 on live)
  },
  {
    title: 'Social Event',
    description: 'With opulent suites and sophisticated rooms, welcome your guests to stays that defines comfort, luxury and unparalleled hospitality.',
    image: '/events-3/social-event.jpg',   // corporate-event-wallpaper (slide 3 on live)
  },
  {
    title: 'Social Gathering',
    description: 'Explore our versatile indoor and outdoor venues that seamlessly merge luxury with an unforgettable experience every time.',
    image: '/events-3/social-gathering.jpg', // WhatsApp-2026-05-14 (slide 4 on live)
  },
  {
    title: 'Accommodation',
    description: 'Explore our versatile indoor and outdoor venues that seamlessly merge luxury with an unforgettable experience every time.',
    image: '/events-3/accommodation.jpg',  // 019A3948 hotel room (slide 5 on live)
  },
]


const luxuryEasing = [0.22, 1, 0.36, 1]

export default function EventsPage() {
  const heroRef = useRef(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [occasionsRef, occasionsInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [promiseRef, promiseInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  const scrollLeft = () => {
    if (sliderRef.current) {
      const firstChild = sliderRef.current.firstElementChild as HTMLElement
      const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 0
      sliderRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      const firstChild = sliderRef.current.firstElementChild as HTMLElement
      const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 0
      sliderRef.current.scrollBy({ left: cardWidth + 32, behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/events-3/hero-bg.webp"
            alt="Events & Celebrations Background"
            fill
            className="object-cover opacity-70 scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#faf9f6]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Exceptional Celebrations
            </span>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Events
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
          </motion.div>
        </div>
      </section>

      {/* --- JOYFUL OCCASIONS & CELEBRATIONS --- */}
      <section ref={occasionsRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={occasionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Joyful Occasions &amp; Life Celebrations
              </span>
              <h2
                className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Plan Your Celebrations With Us
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40" />
              <div className="space-y-4 text-gray-650 font-light text-base sm:text-lg leading-relaxed">
                <p>
                  Discover a portfolio of venues that are the perfect canvas for your special moments. From intimate gatherings to grand galas, our venues are where celebrations come to life. Let our spaces be the stage for your joy, laughter and the creation of a lifetime of memories.
                </p>
                <p>
                  Our expert team, attention to detail and diverse venues converge to transform your vision into extraordinary reality. Whether it is an intimate social soirée or an extravagant gathering, unlock a world of possibilities with us.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all font-medium text-sm tracking-wider uppercase rounded-none"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
                <Image
                  src="/events-3/joyful-occasions.jpg"
                  alt="Plan Your Celebrations With Us"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- OUR PROMISE & EXPERIENCES SLIDER --- */}
      <section ref={promiseRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={promiseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            {/* Top Header Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              <div className="lg:col-span-4">
                <h2
                  className="text-4xl sm:text-5xl font-normal text-gray-900 tracking-wide uppercase"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Our Promise
                </h2>
              </div>
              <div className="lg:col-span-8 lg:pl-8">
                <p className="text-gray-655 font-light text-base sm:text-lg leading-relaxed pt-1">
                  With innovative solutions and personalised touches, our dedicated team ensures flawless execution so you can focus on creating unforgettable memories with your loved ones.
                </p>
              </div>
            </div>

            {/* Slider Carousel Container */}
            <div className="relative px-4 sm:px-12">
              {/* Navigation Buttons */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm focus:outline-none"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm focus:outline-none"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>

              {/* Scrollable Cards Div */}
              <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-8 scroll-smooth no-scrollbar snap-x snap-mandatory py-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {celebrationExperiences.map((exp) => (
                  <div
                    key={exp.title}
                    className="min-w-full sm:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-22px)] snap-start bg-white flex flex-col items-center text-center group"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-gray-50 border border-gray-150 shadow-sm">
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-103 transition-transform duration-[8000ms] ease-out"
                      />
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-normal text-[#b3832b] tracking-wider uppercase mb-3"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {exp.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light px-2 sm:px-4">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BOTTOM CTA SECTION --- */}
      <section ref={ctaRef} className="relative min-h-[600px] lg:min-h-[650px] flex items-center bg-[#faf9f6] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/events-3/cta-bg.jpg"
            alt="Celebrate New Beginnings in Style"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30 lg:bg-black/10" />
        </div>

        {/* Content Card Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="bg-white text-gray-950 p-8 sm:p-12 lg:p-20 max-w-2xl w-full shadow-2xl border border-gray-100 text-left"
          >
            <span className="text-gray-500 text-xs font-bold tracking-[0.25em] uppercase block mb-4">
              Celebrate New Beginnings in Style!
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Toast to New Adventures
            </h2>
            <p className="text-gray-650 font-light text-sm sm:text-base leading-relaxed mb-8">
              Turn the page with a night to remember! embracing a fresh start, our venue is the perfect place to celebrate with friends, laughter, and unforgettable moments. Indulge in great music, delicious drinks, and an electric atmosphere as you toast to new adventures ahead!
            </p>
            <div>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-[#b3832b] hover:bg-[#996f24] text-white font-medium text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-md"
                >
                  Plan Your Event
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
