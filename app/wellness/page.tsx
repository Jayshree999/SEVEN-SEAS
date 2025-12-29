'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Sparkles, Scissors, Droplets, Heart, Leaf, Wind, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

const wellnessServices = [
  {
    name: 'Seven SPA',
    description: 'Indulge in a world of relaxation and rejuvenation. Our spa offers a range of therapeutic treatments, massages, and wellness therapies designed to restore your mind, body, and soul.',
    icon: Droplets,
    image: '/SPA.png',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Behnah Spa',
    description: 'Experience traditional and modern spa treatments in a serene environment. Let our expert therapists pamper you with luxurious treatments.',
    icon: Sparkles,
    image: '/SPA.png',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Seven Salon',
    description: 'Transform your look with our professional hair styling, beauty treatments, and grooming services. Our expert stylists ensure you look and feel your best.',
    icon: Scissors,
    image: '/SPA.png',
    gradient: 'from-pink-500 to-rose-500',
  },
]

const wellnessFeatures = [
  { name: 'Massage Therapy', icon: Heart, color: 'green', bgGradient: 'from-green-400 to-green-600', bgHover: 'bg-green-500' },
  { name: 'Facial Treatments', icon: Sparkles, color: 'pink', bgGradient: 'from-pink-400 to-pink-600', bgHover: 'bg-pink-500' },
  { name: 'Body Treatments', icon: Leaf, color: 'emerald', bgGradient: 'from-emerald-400 to-emerald-600', bgHover: 'bg-emerald-500' },
  { name: 'Aromatherapy', icon: Wind, color: 'teal', bgGradient: 'from-teal-400 to-teal-600', bgHover: 'bg-teal-500' },
]

export default function WellnessPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [heroRef2, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            src="/SPA.png"
            alt="Wellness & Spa"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-transparent to-green-900/20"
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
              <Leaf className="w-16 h-16 text-green-400 drop-shadow-2xl" />
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
              Wellness
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
              Rejuvenate Your Mind, Body & Soul
            </motion.p>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-8"
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

      {/* Enhanced Introduction */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM16 16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              A SANCTUARY OF SERENITY
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Escape the hustle and bustle of city life and immerse yourself in a world of tranquility. Our wellness facilities offer a complete range of spa treatments, beauty services, and relaxation therapies to help you unwind and rejuvenate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Wellness Services */}
      <section ref={servicesRef} className="py-20 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-32">
            {wellnessServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 100 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group`}
                >
                  <motion.div 
                    className="flex-1 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 space-y-6">
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {service.name}
                      </h3>
                    </motion.div>
                    
                    <motion.p
                      className="text-gray-600 text-lg leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.1 }}
                    >
                      {service.description}
                    </motion.p>
                    
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group relative px-8 py-4 bg-gradient-to-r ${service.gradient} text-white font-bold rounded-lg shadow-lg overflow-hidden`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Book Appointment
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <motion.div
                          className="absolute inset-0 opacity-80"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Wellness Features */}
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
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.3), transparent 50%),
                              radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.3), transparent 50%)`,
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
              Our Wellness Offerings
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wellnessFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 ${feature.bgHover} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-white rounded-xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-green-200 h-full">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${feature.bgGradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-800 text-sm">{feature.name}</h3>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-32 px-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white relative overflow-hidden">
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

        <div className="container mx-auto max-w-4xl text-center relative z-10">
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
              <Leaf className="w-16 h-16 mx-auto" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Begin Your Wellness Journey
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-green-50 leading-relaxed">
              Take a moment for yourself and experience the ultimate in relaxation and rejuvenation. Our expert therapists are ready to help you achieve complete wellness.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-white text-green-600 font-bold text-lg uppercase tracking-wider rounded-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Your Treatment
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
