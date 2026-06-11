'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Calendar, Users, Video, Lightbulb, Table, Mic, Wifi, Coffee, Sparkles, ArrowRight, CheckCircle, Star, FileText, Download } from 'lucide-react'
import { useRef } from 'react'

const eventTypes = [
  'Parties and Celebrations',
  'Conferences',
  'Seminars',
  'Corporate Events',
  'Weddings-Indoor',
  'Meetings',
  'Networking Events',
  'Weddings',
  'Outdoor Meetings',
  'Trainings and Workshops',
  'Indoor Dinners',
  'Awards',
  'Galas',
  'Product Launches and Demos',
]

const venueTypes = [
  'Ballroom',
  'Banquet Hall',
  'Boardroom',
  'Meeting Room',
  'Conference Room',
  'Foyer',
  'Pre-function Area',
]

const productionDetails = {
  audiovisual: [
    'High speed internet access',
    'Sound systems',
    'Projectors and screens',
    'LED displays and video walls',
    'Available technician',
    'AV capabilities',
  ],
  furniture: [
    'Chairs (folding, banquet, theater-style)',
    'Tables (round, rectangular, cocktail)',
    'Lounge furniture (sofas, ottomans, coffee tables)',
    'Bar stools and high-top tables',
    'Outdoor furniture',
  ],
  staging: [
    'Podiums and lecterns',
    'Modular stage platforms',
  ],
  lighting: [
    'Available technician',
    'Dimmable lighting controls',
  ],
  decor: [
    'Linens and tablecloths',
    'Meeting / banquet facilities',
  ],
}

const pdfMaterials = [
  { name: 'Fact Sheet', url: 'https://sevenseashotel.net/wp-content/uploads/2025/03/Fact-Sheet-Final-Seven-Seas-Hotel.pdf' },
  { name: 'Mehfil Ballroom Brochure', url: 'https://sevenseashotel.net/wp-content/uploads/2025/03/Mehfill-Ballroom-Brochure.pdf' },
  { name: 'Wedding Brochure', url: 'https://sevenseashotel.net/wp-content/uploads/2025/03/Wedding-Planner-Presentation-Seven-Seas-Hotel.pdf' },
  { name: 'Real Estate Events Flyer', url: 'https://sevenseashotel.net/wp-content/uploads/2025/03/Real-Estate-Flyer-Mehfil-Ballroom.pdf' },
  { name: 'Corporate Events Flyer', url: 'https://sevenseashotel.net/wp-content/uploads/2025/03/Corporate-Flyer-Mehfil-Ballroom.pdf' },
  { name: 'Conference Room Info', url: 'https://sevenseashotel.net/wp-content/uploads/2025/03/Conference-Room-Seven-Seas-Hotel.pdf' }
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

export default function MehfilBallroomPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [typesRef, typesInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [detailsRef, detailsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [capacitiesRef, capacitiesInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [plansRef, plansInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      <Navigation />

      {/* Ultra-Premium Hero Section with Parallax */}
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
            src="/banquet-4.png"
            alt="Mehfil Ballroom"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-[#faf9f6]" />

          {/* Animated Luxury Gradient Overlay */}
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

          {/* Floating Ambient Orbs */}
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
            {/* Premium Star Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', delay: 0.3 }}
              className="inline-flex mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/50">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Main Title with Gradient */}
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
                Mehfil Ballroom
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-gray-200 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where Every Event Becomes Unforgettable
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
                    Book Your Event
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

        {/* Premium Scroll Indicator */}
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

      {/* Enhanced Event & Venue Types Section */}
      <section ref={typesRef} className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6] via-white to-[#faf9f6]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Event Types */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={typesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: luxuryEasing }}
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={typesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Event Types</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-transparent rounded-full mt-2" />
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-3">
                {eventTypes.map((type, index) => (
                  <motion.span
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={typesInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.03, ease: luxuryEasing }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-150 hover:border-amber-350 text-gray-700 font-semibold text-sm transition-all cursor-pointer hover:bg-amber-50"
                  >
                    {type}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Venue Types */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={typesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: luxuryEasing }}
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={typesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-amber-600/30">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Venue Types</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-transparent rounded-full mt-2" />
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-3">
                {venueTypes.map((type, index) => (
                  <motion.span
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={typesInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.03, ease: luxuryEasing }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-150 hover:border-amber-350 text-gray-700 font-semibold text-sm transition-all cursor-pointer hover:bg-amber-50"
                  >
                    {type}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Venue Style */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={typesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: luxuryEasing }}
            >
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={typesInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Venue Style</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-transparent rounded-full mt-2" />
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-3">
                {['Contemporary', 'Modern'].map((type, index) => (
                  <motion.span
                    key={type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={typesInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.03, ease: luxuryEasing }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-150 hover:border-amber-350 text-gray-700 font-semibold text-sm transition-all cursor-pointer hover:bg-amber-50"
                  >
                    {type}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ultra-Premium Production Details */}
      <section ref={detailsRef} className="py-24 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-[#faf9f6] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-300/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Premium Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={detailsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <motion.div
              className="inline-flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={detailsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-amber-500" />
              </motion.div>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Production Details
            </h2>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400" />
              <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              State-of-the-art facilities for flawless event execution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Audiovisual - Enhanced */}
            <ProductionCard
              icon={Video}
              title="Audiovisual"
              items={productionDetails.audiovisual}
              color="amber"
              delay={0}
              inView={detailsInView}
            />

            {/* Furniture - Enhanced */}
            <ProductionCard
              icon={Table}
              title="Furniture & Seating"
              items={productionDetails.furniture}
              color="amber"
              delay={0.1}
              inView={detailsInView}
            />

            {/* Staging - Enhanced */}
            <ProductionCard
              icon={Mic}
              title="Staging & Platforms"
              items={productionDetails.staging}
              color="amber"
              delay={0.2}
              inView={detailsInView}
            />

            {/* Lighting - Enhanced */}
            <ProductionCard
              icon={Lightbulb}
              title="Lighting"
              items={productionDetails.lighting}
              color="amber"
              delay={0.3}
              inView={detailsInView}
            />

            {/* Decor - Enhanced */}
            <ProductionCard
              icon={Sparkles}
              title="Decor & Fabrication"
              items={productionDetails.decor}
              color="amber"
              delay={0.4}
              inView={detailsInView}
            />
          </div>
        </div>
      </section>

      {/* --- CAPACITIES SECTION --- */}
      <section ref={capacitiesRef} className="py-20 bg-[#faf9f6] border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Layout &amp; Capacity
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Capacities
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={capacitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="bg-white border border-gray-200/80 p-6 shadow-xl overflow-hidden rounded-none"
          >
            <div className="overflow-x-auto pb-4 scrollbar-thin">
              <div className="min-w-[800px] h-[120px] relative mx-auto">
                <Image
                  src="/mehfil-ballroom/Details-1024x136.png"
                  alt="Mehfil Ballroom Capacity Details Table"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FLOOR PLANS & ADDITIONAL MATERIALS --- */}
      <section ref={plansRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Resources
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Floor plans and additional materials
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
            <p className="text-gray-650 font-light text-base sm:text-lg leading-relaxed pt-2">
              You can access plans, structures, and additional materials here.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={plansInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
          >
            {pdfMaterials.map((pdf) => (
              <motion.a
                key={pdf.name}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-[#faf9f6] border border-gray-200/60 p-8 flex flex-col justify-between group hover:shadow-xl hover:border-amber-500/20 transition-all duration-300 rounded-none cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-bold text-gray-950 tracking-wide">
                      {pdf.name}
                    </h4>
                    <p className="text-xs text-gray-505 mt-1 uppercase tracking-wider font-semibold">
                      Document PDF
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-widest group-hover:text-amber-700 transition-colors">
                  <span>Download File</span>
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium Contact Section */}
      <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden text-white">
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
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ready to Host Your Event?
            </h2>
            <p className="text-xl text-gray-300">
              Contact our events team for detailed information and personalized planning
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-center text-gray-300 mb-8 text-lg">
              For detailed capacity information, floor plans, and additional materials, please contact our events team.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white font-bold rounded-2xl shadow-2xl shadow-amber-500/50 overflow-hidden text-lg"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Contact Us
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

              <motion.a
                href="tel:+971551009152"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-amber-400/50 text-white font-bold rounded-2xl hover:bg-amber-500/20 hover:border-amber-400 transition-all text-center text-lg"
              >
                Call: +971 55 100 9152
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Premium Production Card Component
function ProductionCard({
  icon: Icon,
  title,
  items,
  color,
  delay,
  inView
}: {
  icon: any
  title: string
  items: string[]
  color: string
  delay: number
  inView: boolean
}) {
  const colorMap: any = {
    blue: {
      from: 'from-blue-500',
      to: 'to-blue-600',
      border: 'border-blue-250',
      text: 'text-amber-600',
      bg: 'bg-blue-500',
      shadow: 'shadow-blue-500/30'
    },
    amber: {
      from: 'from-amber-500',
      to: 'to-amber-600',
      border: 'border-amber-250',
      text: 'text-amber-600',
      bg: 'bg-amber-500',
      shadow: 'shadow-amber-500/30'
    },
    purple: {
      from: 'from-purple-500',
      to: 'to-purple-600',
      border: 'border-purple-250',
      text: 'text-amber-600',
      bg: 'bg-purple-500',
      shadow: 'shadow-purple-500/30'
    },
    yellow: {
      from: 'from-yellow-500',
      to: 'to-yellow-600',
      border: 'border-yellow-250',
      text: 'text-amber-600',
      bg: 'bg-yellow-500',
      shadow: 'shadow-yellow-500/30'
    },
    pink: {
      from: 'from-pink-500',
      to: 'to-pink-600',
      border: 'border-pink-250',
      text: 'text-amber-600',
      bg: 'bg-pink-500',
      shadow: 'shadow-pink-500/30'
    },
  }

  const colors = colorMap[color] || colorMap.amber

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: luxuryEasing }}
      whileHover={{ y: -15, scale: 1.02 }}
      className="group relative h-full"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-150 group-hover:border-amber-300 h-full flex flex-col">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out overflow-hidden rounded-2xl">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent skew-x-12" />
        </div>

        {/* Icon Header */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
            {title}
          </h3>
        </div>

        {/* Items List */}
        <ul className="space-y-3 flex-grow relative z-10">
          {items.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: delay + index * 0.05 }}
              className="flex items-start gap-3 text-gray-700"
            >
              <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="font-medium">{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
      </div>
    </motion.div>
  )
}
