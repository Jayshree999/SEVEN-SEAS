'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Custom Premium SVG Icons
const SmartKeyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Card body */}
      <rect x="8" y="16" width="48" height="32" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Chip */}
      <rect x="14" y="22" width="12" height="10" rx="1.5" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Signal waves */}
      <path d="M38 26C40 26 42 27.5 42 29.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M44 24C47 24 50 26.5 50 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Security dots */}
      <circle cx="40" cy="38" r="1.5" fill="currentColor"/>
      <circle cx="46" cy="38" r="1.5" fill="currentColor"/>
      <circle cx="52" cy="38" r="1.5" fill="currentColor"/>
    </g>
  </svg>
)

const StorageLuggageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Suitcase body */}
      <rect x="12" y="24" width="40" height="28" rx="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Handle top */}
      <path d="M24 24V18C24 15.7909 25.7909 14 28 14H36C38.2091 14 40 15.7909 40 18V24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Lock plate */}
      <rect x="28" y="34" width="8" height="10" rx="1.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Keyhole */}
      <circle cx="32" cy="38" r="2" fill="currentColor"/>
      <path d="M32 40L32 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Side straps */}
      <line x1="20" y1="28" x2="20" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="44" y1="28" x2="44" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </g>
  </svg>
)

const RoomServiceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Cloche dome */}
      <path d="M48 34C48 24.0589 40.8366 16 32 16C23.1634 16 16 24.0589 16 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
      {/* Handle knob */}
      <circle cx="32" cy="14" r="3" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Base plate */}
      <ellipse cx="32" cy="34" rx="20" ry="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Serving tray */}
      <line x1="10" y1="38" x2="54" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M12 38L10 42C10 44 11 46 13 46H51C53 46 54 44 54 42L52 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Steam */}
      <path d="M26 22C26 20 25 18 25 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M32 20C32 18 31 16 31 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M38 22C38 20 37 18 37 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </g>
  </svg>
)

const DisinfectionIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* Shield */}
      <path d="M32 10L14 18C14 18 12 28 14 38C16 48 32 54 32 54C32 54 48 48 50 38C52 28 50 18 50 18L32 10Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Inner shield detail */}
      <path d="M32 16L20 22C20 22 19 29 20 36C21 43 32 48 32 48C32 48 43 43 44 36C45 29 44 22 44 22L32 16Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Checkmark */}
      <path d="M26 32L30 36L38 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Sparkle 1 */}
      <path d="M48 22L50 24L52 22L50 20L48 22Z" fill="currentColor"/>
      <path d="M50 19L50 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M47 22L53 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Sparkle 2 */}
      <path d="M14 30L15.5 31.5L17 30L15.5 28.5L14 30Z" fill="currentColor" opacity="0.8"/>
      <path d="M15.5 27.5L15.5 32.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
      <path d="M13 30L18 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8"/>
    </g>
  </svg>
)

const smartFeatures = [
  {
    icon: SmartKeyIcon,
    title: 'Smart Key',
    description: 'Touch your own door',
    color: 'from-blue-500 to-cyan-500',
    hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
  },
  {
    icon: StorageLuggageIcon,
    title: 'Store Luggage',
    description: 'Feel your Home Locker',
    color: 'from-amber-500 to-yellow-500',
    hoverColor: 'hover:from-amber-600 hover:to-yellow-600',
  },
  {
    icon: RoomServiceIcon,
    title: 'Room Service',
    description: 'Feel your home Dining',
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-600 hover:to-pink-600',
  },
  {
    icon: DisinfectionIcon,
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

