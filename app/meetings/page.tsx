'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useInView } from 'react-intersection-observer'
import { Users, Video, Building2, UtensilsCrossed, Presentation, Coffee, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import { useRef } from 'react'

const meetingTypes = [
  {
    title: 'Conferences & Conventions',
    description: 'Elevate engagement levels with state-of-the-art audio-video conferencing, high-speed Wi-Fi, and cutting-edge technology for a truly impactful experience.',
    icon: Video,
    image: '/019A3970-Enhanced-NR.jpg',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Small Meetings',
    description: 'Select from our selection of signature suites and elegant rooms that offer impeccable accommodation options for your distinguished associates and guests.',
    icon: Users,
    image: '/019A3970-Enhanced-NR.jpg',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Choice of Venues & Budgets',
    description: 'Explore a spectrum of options tailored to suit your preferences from 300+ versatile indoor and outdoor venues, across city hotels, grand palaces and idyllic city resorts.',
    icon: Building2,
    image: '/019A3970-Enhanced-NR.jpg',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Food & Drinks',
    description: 'Your personal point of contact ensures swift responses as our expert team delivers solutions aligned with your exact requirements for a truly bespoke business meet.',
    icon: UtensilsCrossed,
    image: '/019A3970-Enhanced-NR.jpg',
    gradient: 'from-green-500 to-emerald-500',
  },
]

const features = [
  { name: 'Your social events', icon: Users, color: 'amber', bgGradient: 'from-amber-400 to-amber-600', bgHover: 'bg-amber-500' },
  { name: 'Corporate Gatherings', icon: Building2, color: 'blue', bgGradient: 'from-blue-400 to-blue-600', bgHover: 'bg-blue-500' },
  { name: 'Sustainable Meetups', icon: Sparkles, color: 'green', bgGradient: 'from-green-400 to-green-600', bgHover: 'bg-green-500' },
  { name: 'Latest Tech Equipments', icon: Video, color: 'purple', bgGradient: 'from-purple-400 to-purple-600', bgHover: 'bg-purple-500' },
]

export default function MeetingsPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const [heroRef2, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [meetingsRef, meetingsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            src="/019A3970-Enhanced-NR.jpg"
            alt="Meetings & Conferences"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20"
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
              <Presentation className="w-16 h-16 text-blue-400 drop-shadow-2xl" />
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
              Meetings & Conferences
            </motion.h1>
            
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"
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

      {/* Enhanced Boardrooms Section */}
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
              BOARDROOMS & EXCEPTIONAL VENUES
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Step into a realm of remarkable possibilities & explore a curated selection of versatile meeting & conference venues. From client conclaves to grand conferences, discover spaces that offer a harmonious blend of functionality & finesse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Plan Your Meetings */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Plan Your Meetings With Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Discover a seamless blend of elegance, versatility, and unmatched hospitality with meetings and events at Seven Seas Hotel. Our team of experts works closely with you right from choosing the right venue to delivering an immaculate experience for you and your guests.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-bold text-lg uppercase tracking-wider rounded-lg shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Enquire Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600"
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
                src="/019A3970-Enhanced-NR.jpg"
                alt="Business Meeting"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Business Meetings Section */}
      <section ref={meetingsRef} className="py-20 md:py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={meetingsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={meetingsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-10 h-10 text-blue-500" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                Business Meetings
              </h2>
              <Sparkles className="w-10 h-10 text-blue-500" />
            </motion.div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Seven Seas Hotel, our commitment to innovation and personalised elegance is unwavering. As our experts craft your meetings and conferences, expect detailed planning, inventive solutions and dedication to creating seamless experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {meetingTypes.map((type, index) => {
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
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 h-full">
                    <div className="relative h-64">
                      <Image
                        src={type.image}
                        alt={type.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <div className={`w-12 h-12 bg-gradient-to-br ${type.gradient} rounded-lg flex items-center justify-center mb-3`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{type.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Wellness Meets Business
            </h2>
            <p className="text-lg text-gray-600">
              Whether picking up a fresh snack on your way out, or lingering over a good meal with friends, the flavors you crave are here.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
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
                  <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-blue-200 h-full flex flex-col items-center justify-center">
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
      <section className="py-20 md:py-32 px-6 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 relative overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              LUXURY DESTINATION
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Where Business Meets Elegance
            </h3>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-blue-50 leading-relaxed">
              Host your meetings in a space designed for success. Our venue offers a sophisticated setting with state-of-the-art facilities, seamless service, and a refined ambiance to elevate your corporate gatherings. Whether it's a board meeting, conference, or private business event, we ensure a professional and seamless experience tailored to your needs.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-white text-blue-600 font-bold text-lg uppercase tracking-wider rounded-lg shadow-2xl overflow-hidden"
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
