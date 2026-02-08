'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FileText, Clock, CreditCard, Car, Users, Ban, Sparkles, CheckCircle2, ShieldCheck, Info } from 'lucide-react'

const policies = [
  {
    icon: Clock,
    title: 'Check-in & Check-out',
    details: 'Check-in time is 3:00 PM; check-out time is 12:00 PM.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  {
    icon: FileText,
    title: 'ID Requirement',
    details: 'A valid ID or passport is required at the time of check-in.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100'
  },
  {
    icon: Ban,
    title: 'Pets Policy',
    details: 'Pets are not allowed on the premises.',
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100'
  },
  {
    icon: Ban,
    title: 'Smoking Policy',
    details: 'Smoking inside the room is strictly prohibited; penalties will apply.',
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100'
  },
  {
    icon: CreditCard,
    title: 'Security Deposit',
    details: 'An AED 200 security deposit is required upon check-in.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
  {
    icon: Car,
    title: 'Parking',
    details: 'Parking is available at AED 20 per day.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  {
    icon: Users,
    title: 'Visitors Policy',
    details: 'Visitors are not permitted in guest rooms after 10:00 PM.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100'
  },
]

export default function HotelPolicies() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 md:py-28 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Enhanced Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold tracking-widest uppercase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-3 h-3" />
            <span>Essential Information</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
            Hotel <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Policies</span>
          </h2>

          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8"
            initial={{ width: 0 }}
            animate={headerInView ? { width: 96 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Important details to ensure your stay with us is seamless, comfortable, and memorable.
          </p>
        </motion.div>

        {/* Policies Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {policies.map((policy, index) => (
            <PolicyCard
              key={policy.title}
              policy={policy}
              index={index}
              inView={gridInView}
            />
          ))}
        </div>

        {/* Bottom Design Element */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-400 italic">
            * Policies are subject to change. Please contact the front desk for specific inquiries.
          </p>
        </motion.div>
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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="relative h-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-amber-200/50 hover:-translate-y-2 overflow-hidden">

        {/* Card Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Background Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon Header */}
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3.5 rounded-xl ${policy.bg} ${policy.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ring-1 ring-inset ${policy.border}`}>
              <Icon className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
              <Info className="w-5 h-5 text-gray-300" />
            </div>
          </div>

          <h3
            className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {policy.title}
          </h3>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4 flex-grow">
            {policy.details}
          </p>

          <div className="pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 group-hover:text-amber-600 transition-colors">
              <ShieldCheck className="w-4 h-4" />
              <span>Hotel Regulation</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

