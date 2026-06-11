'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, ArrowRight, Quote } from 'lucide-react'

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

export default function WellnessPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [introRef, introInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [elevateRef, elevateInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [spaRef, spaInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [gymRef, gymInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [salonRef, salonInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [relaxRef, relaxInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [trendsRef, trendsInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [redefinedRef, redefinedInView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <main className="min-h-screen bg-[#faf9f6] text-gray-900 overflow-hidden selection:bg-amber-100 selection:text-amber-900">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/wellness_bg.png"
            alt="Wellness Banner Background"
            fill
            className="object-cover opacity-60 scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-[#faf9f6]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <span className="text-amber-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              Serenity & Rejuvenation
            </span>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Rejuvenate Your Mind &amp; Body
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
            <p className="text-lg sm:text-xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
              Our Wellness &amp; Spa services offer a perfect escape to restore balance, relieve stress, and rejuvenate your senses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INTRODUCTORY COPY SECTION --- */}
      <section ref={headerRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-2xl text-gray-700 font-light leading-relaxed"
          >
            Our Wellness &amp; Spa services offer a perfect escape to restore balance, relieve stress, and rejuvenate your senses. From soothing massages to holistic therapies, we provide a luxurious experience tailored to your well-being.
          </motion.p>
        </motion.div>
      </section>

      {/* --- WELLNESS & SPA MAIN SECTION --- */}
      <section ref={introRef} className="py-20 sm:py-28 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
              Harmonious Living
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Wellness &amp; Spa at Seven Seas Restaurants
            </h2>
            <div className="h-[1px] w-20 bg-amber-500/40 mx-auto" />
            <p className="text-gray-600 font-light text-base sm:text-lg leading-relaxed pt-2">
              Embark on a journey of exquisite experiences for the discerning connoisseur, seamlessly woven together with impeccable service, sophisticated ambience and masterful culinary artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {/* Card 1: Behnah Spa */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                  <Image
                    src="/wellness/wellness-main.png"
                    alt="Behnah Spa Reception Logo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8 text-center space-y-4">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#c5a880] group-hover:text-amber-600 transition-colors uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Behnah Spa
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    A luxurious spa experience in the heart of Dubai, offering rejuvenating treatments that blend traditional techniques with modern wellness.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Gym */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                  <Image
                    src="/wellness/behnah-spa-thumb.png"
                    alt="Fitness Gym Studio Room"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8 text-center space-y-4">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#c5a880] group-hover:text-amber-600 transition-colors uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Gym
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Whether you are traveling for business, enjoying a luxury getaway, or just staying in routine, our state-of-the-art Fitness Centre ensures you don&apos;t have to pause your progress.It’s designed to energize your body and clear your mind.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Seven Unisex Saloon */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden border-b border-gray-100 bg-gray-50">
                  <Image
                    src="/wellness/gym-thumb.jpg"
                    alt="Barber Styling Salon"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8 text-center space-y-4">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#c5a880] group-hover:text-amber-600 transition-colors uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Seven Unisex Saloon
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    A premium unisex salon in the heart of Dubai, offering expert styling, grooming, and beauty services with a blend of creativity and precision.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ELEVATE YOUR EXPERIENCE WITH US --- */}
      <section ref={elevateRef} className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={elevateInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Image Left */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden shadow-xl border border-gray-100 lg:order-1"
          >
            <Image
              src="/wellness/elevate-experience.png"
              alt="Elevate Your Experience"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[6000ms]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content Right */}
          <div className="lg:col-span-6 space-y-6 lg:order-2">
            <motion.div variants={fadeInUp} className="space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Pure Excellence
              </span>
              <h2
                className="text-2xl sm:text-4xl font-bold text-gray-950"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Elevate Your Experience with Us
              </h2>
              <div className="h-[1px] w-16 bg-amber-500/30" />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 font-light text-base sm:text-lg leading-relaxed"
            >
              Discover a destination where excellence meets comfort. Whether you’re seeking relaxation, rejuvenation, or transformation, our expert services cater to your every need.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* --- BEHNAH SPA DETAILED SECTION --- */}
      <section ref={spaRef} className="py-20 sm:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={spaInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Content Left */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div variants={fadeInUp} className="flex gap-4 items-center">
                <div className="relative w-12 h-12 overflow-hidden flex-shrink-0">
                  <Image
                    src="/wellness/behnah-spa-logo.png"
                    alt="Behnah Spa Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                    Wellness Oasis
                  </span>
                  <h2
                    className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Behnah Spa
                  </h2>
                </div>
              </motion.div>
              <div className="h-[1px] w-20 bg-amber-500/40" />

              <motion.div variants={fadeInUp} className="text-gray-600 font-light text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                  Escape the noise of the outside world and step into a haven of pure relaxation. At Behnah Spa Seven Seas, we blend time-honored wellness traditions with contemporary luxury to create a deeply restorative experience for your body, mind, and spirit.
                </p>
                <p>
                  Whether you are seeking to release deep-seated tension, revitalize your skin, or simply find a moment of quiet reflection, our beautifully appointed, warm-lit treatment suites provide the perfect backdrop for your wellness journey.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="tel:+971525974799"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +971 52 597 4799</span>
                </a>
              </motion.div>
            </div>

            {/* Image Right */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image
                src="/wellness/elevate-experience.png"
                alt="Behnah Spa Interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- GYM DETAILED SECTION --- */}
      <section ref={gymRef} className="py-20 sm:py-28 bg-[#faf9f6] border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={gymInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Image Left */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100 lg:order-1"
            >
              <Image
                src="/wellness/behnah-spa-detail.png"
                alt="Fitness Gym Room"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Content Right */}
            <div className="lg:col-span-6 space-y-6 lg:order-2">
              <motion.div variants={fadeInUp} className="flex gap-4 items-center">
                <div className="relative w-12 h-12 overflow-hidden flex-shrink-0">
                  <Image
                    src="/wellness/gym-logo.png"
                    alt="Gym Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                    Active Vitality
                  </span>
                  <h2
                    className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Gym
                  </h2>
                </div>
              </motion.div>
              <div className="h-[1px] w-20 bg-amber-500/40" />

              <motion.p
                variants={fadeInUp}
                className="text-gray-600 font-light text-base sm:text-lg leading-relaxed"
              >
                Whether you&apos;re building strength, improving endurance, or starting your fitness journey, we provide the tools and support you need. Elevate your workouts and reach your goals with confidence.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-4">
                <a
                  href="tel:+971551009140"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +971 55 100 9140</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SEVEN UNISEX SALOON DETAILED SECTION --- */}
      <section ref={salonRef} className="py-20 sm:py-28 bg-white border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={salonInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Content Left */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div variants={fadeInUp} className="flex gap-4 items-center">
                <div className="relative w-16 h-16 overflow-hidden flex-shrink-0 bg-[#faf9f6] border border-gray-100 p-1">
                  <Image
                    src="/wellness/gym-detail-2.png"
                    alt="Seven Unisex Saloon Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                    Haute Grooming
                  </span>
                  <h2
                    className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Seven Unisex Saloon
                  </h2>
                </div>
              </motion.div>
              <div className="h-[1px] w-20 bg-amber-500/40" />

              <motion.p
                variants={fadeInUp}
                className="text-gray-600 font-light text-base sm:text-lg leading-relaxed"
              >
                With skilled stylists, premium products, and the latest trends, we ensure a luxurious experience for both men and women. Step in for a transformation and leave feeling confident and refreshed.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-4">
                <a
                  href="tel:+971551009140"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +971 55 100 9140</span>
                </a>
              </motion.div>
            </div>

            {/* Image Right */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-6 relative aspect-[4/3] w-full overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image
                src="/wellness/gym-detail.jpg"
                alt="Seven Unisex Saloon Styling"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- INDULGE IN PURE RELAXATION --- */}
      <section ref={relaxRef} className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={relaxInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Content Left */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div variants={fadeInUp} className="space-y-3">
                <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                  Mindfulness
                </span>
                <h2
                  className="text-3xl sm:text-5xl font-bold text-gray-950 leading-tight"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Indulge in Pure Relaxation
                </h2>
                <div className="h-[1px] w-20 bg-amber-500/40" />
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-gray-600 font-light text-base sm:text-lg leading-relaxed"
              >
                Unwind in a haven of peace and wellness. Our spa treatments blend ancient techniques with modern therapies to restore your body, mind, and soul. Experience ultimate relaxation tailored to your well-being.
              </motion.p>
            </div>

            {/* Image Right */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image
                src="/wellness/indulge-relaxation.png"
                alt="Indulge in Relaxation"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- FITNESS GALLERY / ELEVATE YOUR FITNESS JOURNEY --- */}
      <section ref={trendsRef} className="py-20 bg-[#faf9f6] border-y border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={trendsInView ? 'visible' : 'hidden'}
            className="space-y-16"
          >
            {/* Row 1: Elevate Fitness Journey */}
            <div className="text-center space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Performance Gym
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-950"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Elevate your fitness journey
              </h2>
              <div className="h-[1px] w-16 bg-amber-500/30 mx-auto" />
            </div>

            {/* Row 2: Where Trends Meet Expertise (3 Images) */}
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <h3
                  className="text-2xl sm:text-3xl font-bold text-gray-950 font-serif"
                >
                  Where trends meet expertise
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden shadow-md border border-gray-200 bg-white">
                  <Image
                    src="/wellness/trends-expertise-1.png"
                    alt="Styling Trend 1"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden shadow-md border border-gray-200 bg-white">
                  <Image
                    src="/wellness/trends-expertise-2.jpg"
                    alt="Styling Trend 2"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden shadow-md border border-gray-200 bg-white">
                  <Image
                    src="/wellness/trends-expertise-3.jpg"
                    alt="Styling Trend 3"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STYLE REDEFINED SECTION --- */}
      <section ref={redefinedRef} className="py-20 sm:py-24 bg-white border-b border-gray-150">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={redefinedInView ? 'visible' : 'hidden'}
            className="space-y-12 text-center"
          >
            <div className="space-y-3">
              <span className="text-amber-600 text-xs font-bold tracking-[0.2em] uppercase block">
                Beauty & Style
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-950"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Style redefined, for everyone
              </h2>
              <div className="h-[1px] w-16 bg-amber-500/30 mx-auto" />
            </div>

            <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full overflow-hidden shadow-xl border border-gray-100 bg-[#faf9f6]">
              <Image
                src="/wellness/style-redefined-1.jpg"
                alt="Style Redefined Lounge"
                fill
                className="object-cover hover:scale-102 transition-transform duration-[8000ms]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT GRID (MAP + REACH TO US + DROP A LINE) --- */}
      <section ref={contactRef} className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={contactInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          >
            {/* Map Column */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#faf9f6] border border-gray-200/60 p-1 overflow-hidden min-h-[350px] flex"
            >
              <iframe
                src="https://maps.google.com/maps?q=seven%20seas%20hotel%20dubai%2C%20al%20nahda&t=m&z=12&output=embed&iwloc=near"
                className="w-full h-full min-h-[300px] border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Seven Seas Hotel Dubai location map"
              />
            </motion.div>

            {/* Reach to us Column */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#faf9f6] border border-gray-200/60 p-8 sm:p-10 flex flex-col items-center text-center justify-between group hover:shadow-xl hover:border-amber-500/20 transition-all duration-500"
            >
              <div className="flex flex-col items-center w-full">
                <div className="relative w-16 h-16 mb-6 transform transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="/offers/icon-20.png"
                    alt="Phone Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Reach to us
                </h3>
                <div className="w-full space-y-6">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Reservation
                    </span>
                    <a
                      href="tel:+97142765555"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors"
                    >
                      + 971 4 276 5555
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Booking
                    </span>
                    <a
                      href="tel:+971526090739"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors"
                    >
                      +971 52 609 0739
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 w-full">
                <a
                  href="tel:+971526090739"
                  className="flex items-center justify-center gap-2 py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase w-full"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call reservation</span>
                </a>
              </div>
            </motion.div>

            {/* Drop a line Column */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#faf9f6] border border-gray-200/60 p-8 sm:p-10 flex flex-col items-center text-center justify-between group hover:shadow-xl hover:border-amber-500/20 transition-all duration-500"
            >
              <div className="flex flex-col items-center w-full">
                <div className="relative w-16 h-16 mb-6 transform transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="/offers/icon-19.png"
                    alt="Email Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Drop a line
                </h3>
                <div className="w-full space-y-6">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Information
                    </span>
                    <a
                      href="mailto:info@sevenseashotel.ae"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors break-all"
                    >
                      info@sevenseashotel.ae
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                      Reservations
                    </span>
                    <a
                      href="mailto:reservation@sevenseashotel.ae"
                      className="text-lg font-light text-gray-800 hover:text-amber-600 transition-colors break-all"
                    >
                      reservation@sevenseashotel.ae
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 w-full">
                <a
                  href="mailto:reservation@sevenseashotel.ae"
                  className="flex items-center justify-center gap-2 py-3 bg-black text-white hover:bg-amber-600 transition-colors font-medium text-sm tracking-wider uppercase w-full"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send an Email</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.25), transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.25), transparent 50%)`,
          }} />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
            className="space-y-6"
          >
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Begin Your Wellness Journey
            </h2>
            <p className="text-base sm:text-lg text-amber-100 font-light max-w-2xl mx-auto leading-relaxed">
              Take a moment for yourself and experience the ultimate in relaxation and rejuvenation. Our expert therapists are ready to help you achieve complete wellness.
            </p>
            <div className="pt-6">
              <Link href="https://sevenseashotel.net/reservation/">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-10 py-5 bg-white text-gray-950 font-bold text-sm uppercase tracking-[0.2em] rounded-none shadow-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book Your Treatment
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div
                    className="absolute inset-0 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0"
                  />
                  <span className="absolute inset-0 bg-amber-500 -z-10 group-hover:text-white" />
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
