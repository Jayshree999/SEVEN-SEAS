'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FileText, Clock, CreditCard, Car, Users, Ban } from 'lucide-react'

const policies = [
  {
    icon: Clock,
    title: 'Check-in & Check-out',
    details: 'Check-in time is 2:00 PM; check-out time is 12:00 PM.',
  },
  {
    icon: FileText,
    title: 'ID Requirement',
    details: 'A valid ID or passport is required at the time of check-in.',
  },
  {
    icon: Ban,
    title: 'Pets Policy',
    details: 'Pets are not allowed on the premises.',
  },
  {
    icon: Ban,
    title: 'Smoking Policy',
    details: 'Smoking inside the room is strictly prohibited; penalties will apply.',
  },
  {
    icon: CreditCard,
    title: 'Security Deposit',
    details: 'An AED 200 security deposit is required upon check-in.',
  },
  {
    icon: Car,
    title: 'Parking',
    details: 'Parking is available at AED 20 per day.',
  },
  {
    icon: Users,
    title: 'Visitors Policy',
    details: 'Visitors are not permitted in guest rooms after 10:00 PM.',
  },
]

export default function HotelPolicies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="pt-16 md:pt-20 pb-4 md:pb-6 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            className="flex items-center justify-center gap-3 mb-4"
          >
            <FileText className="w-8 h-8 md:w-10 md:h-10 text-amber-600" />
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              HOTEL POLICY
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Important information to ensure a comfortable and pleasant stay
          </motion.p>
        </div>

        {/* Policies Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {policies.map((policy, index) => (
            <PolicyCard key={policy.title} policy={policy} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PolicyCard({ 
  policy, 
  index, 
  inView 
}: { 
  policy: typeof policies[0]
  index: number
  inView: boolean
}) {
  const Icon = policy.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -15, scale: 1.05 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent group-hover:border-amber-300 bg-white p-6"
    >
      {/* Premium card background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-300/0 via-amber-200/30 to-amber-300/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"></div>
      
      {/* Icon */}
      <div className="relative z-10 mb-4">
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center shadow-lg"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
        >
          <Icon className="w-8 h-8 text-amber-600" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 
          className="text-lg md:text-xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {policy.title}
        </h3>
        
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {policy.details}
        </p>
      </div>

      {/* Premium Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-300/50 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  )
}

