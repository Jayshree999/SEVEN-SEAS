'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Calendar, Cake, Music, Sparkles, Heart, Users, Gift, ArrowRight, Star, Trophy, Crown } from 'lucide-react'
import { useRef } from 'react'

const eventTypes = [
  {
    name: 'Birthday Celebrations',
    description: 'Create unforgettable memories with our stunning venues and personalized service.',
    icon: Cake,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Anniversaries',
    description: 'Celebrate love and milestones in an atmosphere of timeless elegance.',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
  },
  {
    name: 'Graduation Parties',
    description: 'Honor achievements with a celebration worthy of success.',
    icon: Trophy,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Engagement Celebrations',
    description: 'Begin your journey with an enchanting celebration of love.',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Baby Showers',
    description: 'Welcome new life with warmth, joy, and elegant surroundings.',
    icon: Gift,
    color: 'from-yellow-400 to-amber-500',
  },
  {
    name: 'Corporate Milestones',
    description: 'Celebrate business achievements in a prestigious environment.',
    icon: Crown,
    color: 'from-amber-500 to-yellow-600',
  },
]

const luxuryEasing = [0.22, 1, 0.36, 1]

export default function EventsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [heroRef2, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [eventsRef, eventsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navigation />

      {/* Ultra-Premium Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/events_bg.webp"
            alt="Luxury Events"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" />

          {/* Luxury Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-amber-900/30"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Floating Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: luxuryEasing }}
          >
            {/* Premium Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', delay: 0.3 }}
              className="inline-flex mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/50">
                <Star className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: 'var(--font-playfair)',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: luxuryEasing }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-[0_0_60px_rgba(251,191,36,0.6)]">
                Luxury Events & Celebrations
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where Every Moment Becomes a Timeless Memory
            </motion.p>

            {/* Premium Underline */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-12"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white font-bold text-lg rounded-full shadow-2xl shadow-amber-500/50 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Plan Your Event
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-amber-400/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1.5 h-3 bg-amber-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Premium Introduction Section */}
      <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <motion.div
              className="inline-flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-amber-500" />
              </motion.div>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Joyful Occasions & Life Celebrations
            </h2>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Discover a portfolio of venues that are the perfect canvas for your special moments. From intimate gatherings to grand galas, our spaces are where celebrations come to life with joy, laughter, and unforgettable memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plan Your Celebrations - Enhanced */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEasing }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                Plan Your Celebrations With Us
              </h2>

              <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-8" />

              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                Our expert team, attention to detail, and diverse venues converge to transform your vision into extraordinary reality. Whether it's an intimate social soirée or an extravagant gathering, unlock a world of possibilities with us.
              </p>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-amber-500/30 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Enquire Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEasing }}
              className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/banquet-4.png"
                alt="Luxury Event Celebration"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Event Types Grid */}
      <section ref={eventsRef} className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-300/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Celebration Experiences
            </h2>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we create perfect moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => {
              const IconComponent = event.icon
              return (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: luxuryEasing }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative h-full"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group-hover:border-amber-200 h-full flex flex-col">
                    {/* Shimmer */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out overflow-hidden rounded-2xl">
                      <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent skew-x-12" />
                    </div>

                    {/* Icon */}
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${event.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 relative z-10" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {event.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium flex-grow relative z-10">{event.description}</p>

                    {/* Bottom Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Premium Our Promise Section */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <motion.div
              className="inline-flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-amber-400" />
              </motion.div>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Promise
            </h2>

            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
              With innovative solutions and personalized touches, our dedicated team ensures flawless execution, so you can focus on creating unforgettable memories with your loved ones.
            </p>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-amber-500/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Planning Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
