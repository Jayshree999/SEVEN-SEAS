'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Star, Heart, Sparkles, Leaf, Award, Users, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service, ensuring that every guest receives the highest standard of hospitality.',
    icon: Star,
    color: 'text-gold',
  },
  {
    title: 'Hospitality',
    description: 'Warm, authentic hospitality at its finest. We treat every guest as family, prioritizing your comfort above all.',
    icon: Heart,
    color: 'text-gold-dark',
  },
  {
    title: 'Innovation',
    description: 'Blending timeless tradition with modern luxury to create a seamless and sophisticated stay.',
    icon: Sparkles,
    color: 'text-amber-700',
  },
  {
    title: 'Sustainability',
    description: 'Dedicated to eco-conscious practices that preserve our planet for future generations.',
    icon: Leaf,
    color: 'text-emerald-700',
  },
]

const stats = [
  { number: '150+', label: 'Elegant Rooms & Suites', icon: Award },
  { number: '10+', label: 'Years of Legacy', icon: Star },
  { number: '50K+', label: 'Delighted Guests', icon: Users },
  { number: '4.8', label: 'Guest Satisfaction', icon: Heart },
]

export default function AboutUsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [heroRef2, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navigation />

      {/* Enhanced Hero Section with Parallax */}
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
            src="/hero2.jpg"
            alt="About Seven Seas Hotel"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <span className="text-white/80 text-sm tracking-[0.2em] uppercase">Est. 2014</span>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              style={{
                fontFamily: 'var(--font-playfair)',
                textShadow: '0 4px 30px rgba(0, 0, 0, 1), 0 2px 15px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              About Us
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
              style={{
                textShadow: '0 3px 15px rgba(0, 0, 0, 1), 0 1px 8px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where luxury finds its home. Experience a sanctuary of serenity and style.
            </motion.p>

            <motion.div
              className="w-24 h-0.5 bg-white/30 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Enhanced Introduction */}
      <section className="py-8 md:py-12 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Welcome to Seven Seas Hotel
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Located in the vibrant heart of Al Nahda 1, Dubai, Seven Seas Hotel offers a sanctuary of serenity and style. Every detail is curated to provide an unforgettable experience, blending world-class amenities with personalized service that anticipates your every need. Whether you are here for business or leisure, discover a haven where comfort meets sophistication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chairman's Message Section */}
      <section className="py-8 md:py-12 px-6 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              CHAIRMAN'S MESSAGE!
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Chairman Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-none overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/chairman.jpg"
                  alt="Jitender Kumar Singla - Chairman"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Chairman's Message */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  "Experience a new standard of hospitality in one of the world's most dynamic cities. At Seven Seas Hotel, Al Nahda, we believe that true luxury lies in the details."
                </p>
                <p>
                  "Our philosophy is built on a foundation of excellence, where every interaction is an opportunity to create a lasting memory. We invite you to immerse yourself in an environment where comfort meets sophistication."
                </p>
                <p>
                  "Personalisation is our mark, and we treat every guest as a unique individual. Welcome to a destination where you are always the center of our world."
                </p>
              </div>

              <div className="pt-6 border-t-2 border-amber-200">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Jitender Kumar Singla
                </h3>
                <p className="text-lg text-amber-600 font-semibold">
                  Chairman
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-b border-white/10 py-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={stat.label} className="text-center group">
                  <div className="text-4xl md:text-5xl font-light mb-4 text-amber-200 font-serif">{stat.number}</div>
                  <div className="text-xs md:text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Our Values */}
      <section ref={valuesRef} className="py-24 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={valuesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-10 h-10 text-amber-500" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Our Values
              </h2>
              <Sparkles className="w-10 h-10 text-amber-500" />
            </motion.div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white p-10 h-full border border-gray-100 transition-all duration-500 hover:shadow-xl hover:border-amber-200/50 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 pt-1 group-hover:scale-110 transition-transform duration-500 group-hover:bg-amber-100/50">
                      <IconComponent className={`w-8 h-8 ${value.color} stroke-1 opacity-80 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-wide text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {value.title}
                    </h3>
                    <div className="w-8 h-[1px] bg-amber-600/50 mb-4 transition-all duration-500 group-hover:w-16"></div>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Location & Contact */}
      <section className="py-12 md:py-16 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3), transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.3), transparent 50%)`,
          }}
        />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Visit Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-none p-10 shadow-sm hover:shadow-xl border border-gray-100 hover:border-amber-200/50 transition-all duration-500 text-center flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 pt-1 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-8 h-8 text-amber-600 opacity-80" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-wide" style={{ fontFamily: 'var(--font-playfair)' }}>Location</h3>
              <div className="w-8 h-[1px] bg-amber-600/50 mb-4 transition-all duration-500 group-hover:w-16"></div>
              <p className="text-gray-500 font-light text-sm">
                Seven Seas Hotel - 231, Al Ittihad Rd, Al Qusais, Al Nahda 1, Dubai, UAE
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-none p-10 shadow-sm hover:shadow-xl border border-gray-100 hover:border-amber-200/50 transition-all duration-500 text-center flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 pt-1 group-hover:scale-110 transition-transform duration-500">
                <Phone className="w-8 h-8 text-amber-600 opacity-80" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-wide" style={{ fontFamily: 'var(--font-playfair)' }}>Phone</h3>
              <div className="w-8 h-[1px] bg-amber-600/50 mb-4 transition-all duration-500 group-hover:w-16"></div>
              <a href="tel:+971551009152" className="text-gray-500 hover:text-amber-600 font-light text-sm transition-colors">
                +971 55 100 9152
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-none p-10 shadow-sm hover:shadow-xl border border-gray-100 hover:border-amber-200/50 transition-all duration-500 text-center flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 pt-1 group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-8 h-8 text-amber-600 opacity-80" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-wide" style={{ fontFamily: 'var(--font-playfair)' }}>Email</h3>
              <div className="w-8 h-[1px] bg-amber-600/50 mb-4 transition-all duration-500 group-hover:w-16"></div>
              <a href="mailto:reservation@sevenseashotel.ae" className="text-gray-500 hover:text-amber-600 font-light text-sm transition-colors">
                reservation@sevenseashotel.ae
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 md:py-36 px-6 bg-[#1a1a1a] text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            x: [0, 50],
            y: [0, 50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Your Journey Begins Here
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-amber-50 leading-relaxed">
              Indulge in the extraordinary. Book your stay at Seven Seas Hotel and elevate your Dubai experience.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white text-gray-900 font-bold text-lg uppercase tracking-[0.2em] rounded-none shadow-xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Make a reservation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gray-100"
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
