'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Users, Video, Building2, UtensilsCrossed, Presentation, Sparkles, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const meetingTypes = [
  {
    title: 'Confrences & Conventions',
    description: 'Elevate engagement levels with state-of-the-art audio-video conferencing, high-speed Wi-Fi, and cutting-edge technology for a truly impactful experience.',
    icon: Video,
    image: '/meetings/WhatsApp-Image-2026-03-06-at-11.21.36-1.jpeg',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Small Meetings',
    description: 'Select from our selection of signature suites and elegant rooms that offer impeccable accommodation options for your distinguished associates and guests.',
    icon: Users,
    image: '/meetings/WhatsApp-Image-2026-03-06-at-11.21.42-rng37rhmsfw74gxazusd8vgvb9wrm4dn93nkgig8t8.jpeg',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Choice of Venues & Budgets',
    description: 'Explore a spectrum of options tailored to suit your preferences from 300+ versatile indoor and outdoor venues, across city hotels, grand palaces and idyllic city resorts.',
    icon: Building2,
    image: '/meetings/WhatsApp-Image-2026-05-14-at-17.06.22-rng3to482fvrpb3s2tocuuglpjxq06cfxizy3nyxss.jpeg',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Food & Drinks',
    description: 'Your personal point of contact ensures swift responses as our expert team delivers solutions aligned with your exact requirements for a truly bespoke business meet.',
    icon: UtensilsCrossed,
    image: '/meetings/Gemini_Generated_Image_pi3h4wpi3h4wpi3h-ro4ch4unhjaa0ke0tty3crgvgj3xlmka5n3whly464.png',
    gradient: 'from-green-500 to-emerald-500',
  },
]

const features = [
  { name: 'Your social events', image: '/meetings/social-events-1024x683.jpeg' },
  { name: 'Corporate Gatherings', image: '/meetings/parallax-19-1024x666.jpeg' },
  { name: 'Sustainable Meetups', image: '/meetings/WhatsApp-Image-2025-05-26-at-4.20.40-PM-4-1024x681.jpeg' },
  { name: 'Latest Tech Equipments', image: '/meetings/istockphoto-600072788-612x612-1.jpg' },
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

export default function MeetingsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [boardroomsRef, boardroomsInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [planRef, planInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [meetingsRef, meetingsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [wellnessRef, wellnessInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/meetings/hero-background.png"
            alt="Meetings &amp; Conferences Background"
            fill
            className="object-cover opacity-65 scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
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
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Grand Gatherings &amp; Business
            </span>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Meetings &amp; Conferences
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
          </motion.div>
        </div>
      </section>

      {/* --- BOARDROOMS & EXCEPTIONAL VENUES --- */}
      <section ref={boardroomsRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={boardroomsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-6">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Exceptional Spaces
              </span>
              <h2
                className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                BOARDROOMS &amp; EXCEPTIONAL VENUES
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40" />
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
                Step into a realm of remarkable possibilities &amp; explore a curated selection of versatile meeting &amp; conference venues. From client conclaves to grand conferences, discover spaces that offer a harmonious blend of functionality &amp; finesse.
              </p>
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
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
                <Image
                  src="/meetings/WhatsApp-Image-2026-03-06-at-11.21.42-1024x768.jpeg"
                  alt="Boardrooms &amp; Exceptional Venues Showcase"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- PLAN YOUR MEETINGS WITH US --- */}
      <section ref={planRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={planInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
                <Image
                  src="/meetings/WhatsApp-Image-2026-03-06-at-11.21.36-1.jpeg"
                  alt="Business Meeting in Progress"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-[8000ms] ease-out"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Bespoke Planning
              </span>
              <h2
                className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Plan Your Meetings With Us
              </h2>
              <div className="h-[1px] w-20 bg-amber-500/40" />
              <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
                Discover a seamless blend of elegance, versatility, and unmatched hospitality with meetings and events at Seven Seas Hotel. Our team of experts works closely with you right from choosing the right venue to delivering an immaculate experience for you and your guests.
              </p>
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- BUSINESS MEETINGS SECTION --- */}
      <section ref={meetingsRef} className="py-20 sm:py-28 bg-[#faf9f6] border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Professional Execution
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Business Meetings
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
            <p className="text-gray-650 font-light text-base sm:text-lg leading-relaxed pt-2">
              At Seven Seas Hotel, our commitment to innovation and personalised elegance is unwavering. As our experts craft your meetings and conferences, expect detailed planning, inventive solutions and dedication to creating seamless experiences.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={meetingsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6"
          >
            {meetingTypes.map((type) => {
              const IconComponent = type.icon
              return (
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
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">{type.title}</h3>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <p className="text-gray-650 text-sm leading-relaxed font-light">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* --- WELLNESS MEETS BUSINESS FEATURES --- */}
      <section ref={wellnessRef} className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Holistic Approach
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Wellness Meets Business
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
            <p className="text-gray-650 font-light text-base sm:text-lg leading-relaxed pt-2">
              Whether picking up a fresh snack on your way out, or lingering over a good meal with friends, the flavors you crave are here.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={wellnessInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative aspect-[3/4] w-full overflow-hidden shadow-xl border border-gray-150 group rounded-none cursor-pointer flex flex-col justify-end p-6"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={feature.image}
                    alt={feature.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:via-black/45 transition-colors duration-300" />
                </div>
                <div className="relative z-10 text-left space-y-3">
                  <h3
                    className="text-lg sm:text-xl font-bold text-white tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {feature.name}
                  </h3>
                  <div className="h-[1px] w-12 bg-amber-400/80 group-hover:w-20 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* --- CTA SECTION --- */}
      <section className="relative min-h-[600px] lg:min-h-[650px] flex items-center bg-[#faf9f6] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/meetings/cta-background.webp"
            alt="Luxury Destination Background"
            fill
            className="object-cover object-top lg:object-[right_top]"
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
              WHERE BUSINESS MEETS ELEGANCE
            </h2>
            <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed mb-8">
              Host your meetings in a space designed for success. Our venue offers a sophisticated setting with state-of-the-art facilities, seamless service, and a refined ambiance to elevate your corporate gatherings. Whether it&apos;s a board meeting, conference, or private business event, we ensure a professional and seamless experience tailored to your needs.
            </p>
            <div>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-[#b3832b] hover:bg-[#996f24] text-white font-medium text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-md"
                >
                  Make a reservation
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
