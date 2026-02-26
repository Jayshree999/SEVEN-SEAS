'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Custom Premium SVG Icons
const SmartKeyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="8" y="16" width="48" height="32" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="22" width="12" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 26C40 26 42 27.5 42 29.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 24C47 24 50 26.5 50 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="38" r="1.5" fill="currentColor" />
      <circle cx="46" cy="38" r="1.5" fill="currentColor" />
      <circle cx="52" cy="38" r="1.5" fill="currentColor" />
    </g>
  </svg>
)

const StorageLuggageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="12" y="24" width="40" height="28" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 24V18C24 15.7909 25.7909 14 28 14H36C38.2091 14 40 15.7909 40 18V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="28" y="34" width="8" height="10" rx="1.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="38" r="2" fill="currentColor" />
      <path d="M32 40L32 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="28" x2="20" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="44" y1="28" x2="44" y2="48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
)

const RoomServiceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M48 34C48 24.0589 40.8366 16 32 16C23.1634 16 16 24.0589 16 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
      <circle cx="32" cy="14" r="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="32" cy="34" rx="20" ry="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="38" x2="54" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 38L10 42C10 44 11 46 13 46H51C53 46 54 44 54 42L52 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 22C26 20 25 18 25 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M32 20C32 18 31 16 31 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M38 22C38 20 37 18 37 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </g>
  </svg>
)

const DisinfectionIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M32 10L14 18C14 18 12 28 14 38C16 48 32 54 32 54C32 54 48 48 50 38C52 28 50 18 50 18L32 10Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 16L20 22C20 22 19 29 20 36C21 43 32 48 32 48C32 48 43 43 44 36C45 29 44 22 44 22L32 16Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 32L30 36L38 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 22L50 24L52 22L50 20L48 22Z" fill="currentColor" />
      <path d="M14 30L15.5 31.5L17 30L15.5 28.5L14 30Z" fill="currentColor" opacity="0.8" />
    </g>
  </svg>
)

const smartFeatures = [
  {
    icon: SmartKeyIcon,
    title: 'Smart Key',
    description: 'Touch-free access to your room',
  },
  {
    icon: StorageLuggageIcon,
    title: 'Secure Storage',
    description: 'Digital lockers for your valuables',
  },
  {
    icon: RoomServiceIcon,
    title: 'In-Room Dining',
    description: 'Service at your fingertips',
  },
  {
    icon: DisinfectionIcon,
    title: 'Hygiene Promise',
    description: 'Certified sanitization standards',
  },
]

const luxuryEasing = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: luxuryEasing,
    }
  }
}

export default function SmartFeatures() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 md:py-32 lg:py-40 px-4 sm:px-6 relative overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-50/50 rounded-full blur-[100px] opacity-60" />

        {/* Floating ambient light effects */}
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-200/20 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: luxuryEasing }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-amber-600 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Modern Comforts</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            SMART FEATURES
          </h2>
          <div className="h-[1px] w-24 bg-amber-500/50 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the perfect blend of traditional hospitality and modern innovation
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {smartFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index,
}: {
  feature: typeof smartFeatures[0]
  index: number
}) {
  const Icon = feature.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -15, scale: 1.02 }}
      transition={{ duration: 0.4, ease: luxuryEasing }}
      className="group relative"
    >
      <div className="relative h-full p-10 bg-white rounded-none border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden">

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent skew-x-12" />
        </div>

        {/* Hover Border Gradient */}
        <div className="absolute inset-0 border border-transparent group-hover:border-amber-400/30 rounded-none transition-colors duration-500 pointer-events-none" />

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-amber-100/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-150" />
          <motion.div
            className="relative w-24 h-24 rounded-none border border-gray-100 flex items-center justify-center bg-transparent group-hover:bg-amber-50/20 transition-all duration-700"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <Icon className="w-10 h-10 text-gray-400 group-hover:text-amber-600 transition-colors duration-500" />
          </motion.div>
        </div>

        {/* Content */}
        <h3
          className="text-xl font-bold text-black mb-4 group-hover:text-amber-600 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {feature.title}
        </h3>

        <p className="text-gray-500 font-light leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}
