'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const weddingTypes = [
  {
    title: 'Dubai Iconic City Weddings',
    description: 'Celebrate your love in the heart of luxury. From breathtaking venues to impeccable details, we craft unforgettable weddings that reflect your style and elegance, making your special day truly magical.',
    image: '/weddings/wedding-banquet.jpeg',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Elegant Nikah Ceremony',
    description: 'Honor your sacred union in a beautifully serene setting, where tradition meets elegance. Our venue provides a refined and peaceful ambiance, ensuring a heartfelt and memorable Nikah ceremony, surrounded by loved ones and cherished moments.',
    image: '/weddings/nikah-ceremony.jpg',
    gradient: 'from-red-500 to-pink-500',
  },
]

const memories = [
  { 
    title: 'Cocktail Party', 
    image: '/weddings/create-memories-main.jpg', 
    link: '/meetings',
    hoverText: 'View Meeting Venues' 
  },
  { 
    title: 'Honymoon Room', 
    image: '/weddings/honeymoon-offer.jpg', 
    link: '/offers-and-more',
    hoverText: 'Explore Honeymoon Offers' 
  },
  { 
    title: 'Spa & Saloon', 
    image: '/weddings/spa-salon.png', 
    link: 'https://wa.me/+971525974799',
    hoverText: 'Book a Session' 
  },
]

const luxuryEasing = [0.22, 1, 0.36, 1]

const fadeInUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEasing }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

export default function WeddingsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [typesRef, typesInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [memoriesRef, memoriesInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [festivitiesRef, festivitiesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-rose-100 selection:text-rose-900">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/weddings/hero-bg.jpg"
            alt="Timeless Weddings Background"
            fill
            className="object-cover opacity-70 scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#faf9f6]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <span className="text-rose-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Timeless Romance &amp; Luxury
            </span>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Timeless Weddings
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-6" />
          </motion.div>
        </div>
      </section>

      {/* --- MAKING DREAMS COME TRUE --- */}
      <section ref={introRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150 relative">
        {/* Subtle Decorative Tall Background Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <Image
            src="/weddings/tall-bg.jpg"
            alt="Decorative Pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={introInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-6">
              <span className="text-rose-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Bespoke Romance
              </span>
              <h2
                className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Making Your Wedding Dreams Come True
              </h2>
              <div className="h-[1px] w-20 bg-rose-500/40" />
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
                For generations, weddings at Seven Seas Hotel are synonymous with cherished memories. Embark on a journey of timeless romance as our dedicated experts ensure that every detail is a reflection of your dream celebrations. Step into a legacy of love and warm hospitality as we pull out all the stops for your special day.
              </p>
              <div className="pt-4">
                <a
                  href="https://wa.me/+971551009137"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-rose-900 transition-all font-medium text-sm tracking-wider uppercase rounded-none"
                  >
                    <span>Plan your Deam Wedding</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
                <Image
                  src="/weddings/wedding-banquet.jpeg"
                  alt="Elegant Wedding Showcase"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DESTINATION WEDDINGS REDEFINED --- */}
      <section ref={typesRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-rose-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Redefined Celebrations
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Destination Weddings Redefined
            </h2>
            <div className="h-[1px] w-20 bg-rose-500/40 mx-auto" />
            <p className="text-gray-650 font-light text-base sm:text-lg leading-relaxed pt-2">
              Your very own fairy tale comes alive with Seven Seas Hotel. Exquisite settings from majestic palaces, pristine beaches and secluded retreats amidst snow-capped peaks and meandering rivers, form a flawless canvas for your dream wedding.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={typesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 max-w-5xl mx-auto"
          >
            {weddingTypes.map((type) => (
              <motion.div
                key={type.title}
                variants={fadeInUp}
                className="bg-white border border-gray-150 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group rounded-none overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${type.gradient} rounded-none flex items-center justify-center`}>
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wider">{type.title}</h3>
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <p className="text-gray-655 text-sm leading-relaxed font-light">
                      {type.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CREATE MEMORIES WITH US! --- */}
      <section ref={memoriesRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150 relative">
        {/* Subtle Decorative Tall Background Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
          <Image
            src="/weddings/tall-bg.jpg"
            alt="Decorative Pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-rose-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Memories &amp; Romance
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Create Memories with Us!
            </h2>
            <div className="h-[1px] w-20 bg-rose-500/40 mx-auto" />
            <p className="text-gray-655 font-light text-base sm:text-lg leading-relaxed pt-2">
              Craft a bespoke proposal with us, from sweeping romantic gestures to private moments and set the stage for a lifetime of togetherness.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={memoriesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6"
          >
            {memories.map((memory) => {
              const isExternal = memory.link.startsWith('http')
              const CardContent = (
                <div className="relative bg-white border border-gray-150 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group rounded-none overflow-hidden h-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 flex items-center justify-between bg-white">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider group-hover:text-rose-600 transition-colors">
                      {memory.title}
                    </h3>
                    <span className="text-xs text-rose-600 font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {memory.hoverText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )

              return (
                <motion.div
                  key={memory.title}
                  variants={fadeInUp}
                  className="cursor-pointer h-full"
                >
                  {isExternal ? (
                    <a href={memory.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {CardContent}
                    </a>
                  ) : (
                    <Link href={memory.link} className="block h-full">
                      {CardContent}
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* --- WEDDING FESTIVITIES ASYMMETRICAL GRID --- */}
      <section ref={festivitiesRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-rose-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Tapestry of Love
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Wedding Festivities
            </h2>
            <div className="h-[1px] w-20 bg-rose-500/40 mx-auto" />
            <p className="text-gray-655 font-light text-base sm:text-lg leading-relaxed pt-2">
              Unfold a tapestry of love and celebrations with intimate gatherings or grand receptions. From bridal showers and haldi ceremonies to mehndi and glitzy cocktail soirées, begin your journey of joy with Seven Seas Hotel.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={festivitiesInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* ROW 1: Stacked Bridal & Mehendi on Left, Tall Sangeet Image on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Bridal Shower */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-[#faf9f6] border border-gray-150 flex flex-col justify-between overflow-hidden shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <Image
                      src="/weddings/bridal-shower.jpg"
                      alt="Bridal Shower"
                      fill
                      className="object-cover hover:scale-103 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 border-t border-gray-150 text-center">
                    <div className="h-[1px] w-12 bg-rose-400/50 mx-auto mb-4" />
                    <h3
                      className="text-2xl font-bold text-gray-900 tracking-wide"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      Bridal Shower
                    </h3>
                  </div>
                </motion.div>

                {/* Mehendi */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-[#faf9f6] border border-gray-150 flex flex-col justify-between overflow-hidden shadow-sm"
                >
                  <div className="p-8 border-b border-gray-150 text-center">
                    <h3
                      className="text-2xl font-bold text-gray-900 tracking-wide"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      Mehendi
                    </h3>
                    <div className="h-[1px] w-12 bg-rose-400/50 mx-auto mt-4" />
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <Image
                      src="/weddings/mehendi.jpg"
                      alt="Mehendi"
                      fill
                      className="object-cover hover:scale-103 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Tall Sangeet Banner */}
              <motion.div
                variants={fadeInUp}
                className="lg:col-span-4 relative min-h-[400px] lg:min-h-full overflow-hidden border border-gray-150 bg-gray-100 shadow-md"
              >
                <Image
                  src="/weddings/sangeet.jpg"
                  alt="Wedding Festivities Scene"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </motion.div>
            </div>

            {/* ROW 2: 4-Column Asymmetrical Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Haldi Image */}
              <motion.div
                variants={fadeInUp}
                className="relative aspect-[4/3] sm:aspect-square md:aspect-[3/4] overflow-hidden border border-gray-150 shadow-sm"
              >
                <Image
                  src="/weddings/haldi-function.jpg"
                  alt="Haldi Function"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-700"
                />
              </motion.div>

              {/* Haldi Text Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-[#faf9f6] border border-gray-150 flex flex-col justify-center items-center p-8 text-center shadow-sm"
              >
                <div className="h-[1px] w-12 bg-rose-400/50 mb-4" />
                <h3
                  className="text-2xl font-bold text-gray-900 tracking-wide"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Haldi
                </h3>
              </motion.div>

              {/* Sangeet Image */}
              <motion.div
                variants={fadeInUp}
                className="relative aspect-[4/3] sm:aspect-square md:aspect-[3/4] overflow-hidden border border-gray-150 shadow-sm"
              >
                <Image
                  src="/weddings/wedding-festivities-hero.jpg"
                  alt="Sangeet Stageworks"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-700"
                />
              </motion.div>

              {/* Sangeet Text Card */}
              <motion.div
                variants={fadeInUp}
                className="bg-[#faf9f6] border border-gray-150 flex flex-col justify-center items-center p-8 text-center shadow-sm"
              >
                <div className="h-[1px] w-12 bg-rose-400/50 mb-4" />
                <h3
                  className="text-2xl font-bold text-gray-900 tracking-wide"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Sangeet
                </h3>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative min-h-[600px] lg:min-h-[650px] flex items-center bg-[#faf9f6] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/weddings/cta-bg.webp"
            alt="Luxury Destination Background"
            fill
            className="object-cover object-top lg:object-[left_center]"
            priority
          />
          <div className="absolute inset-0 bg-black/20 lg:bg-transparent" />
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
              LUXURY DESTINATION
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight text-gray-900 mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              YOUR LOVE STORY, PERFECTLY CELEBRATED
            </h2>
            <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed mb-8">
              From grand celebrations to intimate gatherings, we create unforgettable weddings tailored to your dreams. Whether you envision a luxurious ballroom affair, a serene beach ceremony, or a culturally rich Nikah, our expert team ensures every detail is flawlessly executed. Let us bring your vision to life and make your special day truly magical.
            </p>
            <div>
              <a 
                href="https://wa.me/+971551009140"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-[#b3832b] hover:bg-[#996f24] text-white font-medium text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-md"
                >
                  Make a reservation
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
