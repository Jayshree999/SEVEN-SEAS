'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Key, Lock, Utensils, Sparkles } from 'lucide-react'

const smartFeatures = [
  {
    icon: Key,
    title: 'Smart Key',
    description: 'Touch your own door',
    color: 'from-blue-500 to-cyan-500',
    hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
  },
  {
    icon: Lock,
    title: 'Store Luggage',
    description: 'Feel your Home Locker',
    color: 'from-amber-500 to-yellow-500',
    hoverColor: 'hover:from-amber-600 hover:to-yellow-600',
  },
  {
    icon: Utensils,
    title: 'Room Service',
    description: 'Feel your home Dining',
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-600 hover:to-pink-600',
  },
  {
    icon: Sparkles,
    title: 'Disinfection',
    description: 'Spotless Lives',
    color: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:from-green-600 hover:to-emerald-600',
  },
]

export default function SmartFeatures() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-amber-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              SMART FEATURES
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Experience modern convenience with our innovative smart features designed for your comfort
          </motion.p>
        </div>

        {/* Features Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {smartFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  feature, 
  index, 
  inView 
}: { 
  feature: typeof smartFeatures[0]
  index: number
  inView: boolean
}) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -15, scale: 1.05 }}
      className="group relative"
    >
      <div className="relative h-full p-6 md:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-amber-200 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Icon */}
        <div className="relative z-10 mb-6">
          <motion.div
            className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 
            className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {feature.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  )
}

