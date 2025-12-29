'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Heart, Sparkles, Camera, Music, UtensilsCrossed, Flower2, Gem, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const weddingTypes = [
  {
    title: 'Dubai Iconic City Weddings',
    description: 'Celebrate your love in the heart of luxury. From breathtaking venues to impeccable details, we craft unforgettable weddings that reflect your style and elegance, making your special day truly magical.',
    icon: Gem,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Dreamy Beachfront Weddings',
    description: 'Exchange vows with the sand beneath your feet and the ocean as your backdrop. Our stunning beach wedding setup offers a romantic and serene ambiance, perfect for an unforgettable celebration. Let the waves witness your love.',
    icon: Flower2,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Elegant Nikah Ceremony',
    description: 'Honor your sacred union in a beautifully serene setting, where tradition meets elegance. Our venue provides a refined and peaceful ambiance, ensuring a heartfelt and memorable Nikah ceremony, surrounded by loved ones and cherished moments.',
    icon: Heart,
    gradient: 'from-red-500 to-pink-500',
  },
]

const weddingFestivities = [
  { name: 'Bridal Shower', icon: Sparkles, color: 'pink', bgGradient: 'from-pink-400 to-pink-600', bgHover: 'bg-pink-500' },
  { name: 'Mehendi', icon: Flower2, color: 'orange', bgGradient: 'from-orange-400 to-orange-600', bgHover: 'bg-orange-500' },
  { name: 'Haldi', icon: Camera, color: 'yellow', bgGradient: 'from-yellow-400 to-yellow-600', bgHover: 'bg-yellow-500' },
  { name: 'Sangeet', icon: Music, color: 'purple', bgGradient: 'from-purple-400 to-purple-600', bgHover: 'bg-purple-500' },
]

const memories = [
  { title: 'Cocktail Party', icon: UtensilsCrossed, color: 'amber', bgGradient: 'from-amber-400 to-amber-600', bgHover: 'bg-amber-500' },
  { title: 'Honeymoon Room', icon: Heart, color: 'rose', bgGradient: 'from-rose-400 to-rose-600', bgHover: 'bg-rose-500' },
  { title: 'Spa & Salon', icon: Sparkles, color: 'pink', bgGradient: 'from-pink-400 to-pink-600', bgHover: 'bg-pink-500' },
]

export default function WeddingsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [heroRef2, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [weddingsRef, weddingsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            src="/banquet-4.png"
            alt="Timeless Weddings"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-900/20 via-transparent to-pink-900/20"
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
              initial={{ scale: 0, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1, type: 'spring', delay: 0.3 }}
              className="inline-block mb-6"
            >
              <Heart className="w-16 h-16 text-pink-400 drop-shadow-2xl" />
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
              Timeless Weddings
            </motion.h1>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
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

      {/* Enhanced Making Dreams Come True */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Making Your Wedding Dreams Come True
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                For generations, weddings at Seven Seas Hotel are synonymous with cherished memories. Embark on a journey of timeless romance as our dedicated experts ensure that every detail is a reflection of your dream celebrations. Step into a legacy of love and warm hospitality as we pull out all the stops for your special day.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-600 to-pink-500 text-white font-bold text-lg uppercase tracking-wider rounded-lg shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Plan your Dream Wedding
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-700 to-pink-600"
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
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/banquet-4.png"
                alt="Wedding Celebration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Destination Weddings */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-10 h-10 text-pink-500" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Destination Weddings Redefined
              </h2>
              <Sparkles className="w-10 h-10 text-pink-500" />
            </motion.div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your very own fairy tale comes alive with Seven Seas Hotel. Exquisite settings from majestic palaces, pristine beaches and secluded retreats amidst snow-capped peaks and meandering rivers, form a flawless canvas for your dream wedding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weddingTypes.map((type, index) => {
              const IconComponent = type.icon
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-full flex items-center justify-center mb-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent`} style={{ fontFamily: 'var(--font-playfair)' }}>
                      {type.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{type.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Create Memories */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
              Create Memories with Us!
            </h2>
            <p className="text-lg text-gray-600">
              Craft a bespoke proposal with us, from sweeping romantic gestures to private moments and set the stage for a lifetime of togetherness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memories.map((memory, index) => {
              const IconComponent = memory.icon
              return (
                <motion.div
                  key={memory.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 ${memory.bgHover} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-white rounded-xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-pink-200 h-full">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${memory.bgGradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800">{memory.title}</h3>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Wedding Festivities */}
      <section ref={weddingsRef} className="py-20 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={weddingsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Wedding Festivities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Unfold a tapestry of love and celebrations with intimate gatherings or grand receptions. From bridal showers and haldi ceremonies to mehndi and glitzy cocktail soirées, begin your journey of joy with Seven Seas Hotel.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {weddingFestivities.map((festivity, index) => {
              const IconComponent = festivity.icon
              return (
                <motion.div
                  key={festivity.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 ${festivity.bgHover} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-pink-200 h-full">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${festivity.bgGradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-800">{festivity.name}</h3>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            x: [0, 100],
            y: [0, 100],
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

        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-16 h-16 mx-auto" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              LUXURY DESTINATION
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Your Love Story, Perfectly Celebrated
            </h3>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-pink-50 leading-relaxed">
              From grand celebrations to intimate gatherings, we create unforgettable weddings tailored to your dreams. Whether you envision a luxurious ballroom affair, a serene beach ceremony, or a culturally rich Nikah, our expert team ensures every detail is flawlessly executed. Let us bring your vision to life and make your special day truly magical.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-white text-pink-600 font-bold text-lg uppercase tracking-wider rounded-lg shadow-2xl overflow-hidden"
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
