'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
  User, Clock, Luggage, DollarSign, FileText, Shield,
  Sparkles, Shirt, Flame, Droplets, Briefcase, Copy, Users,
  Baby, Car, MapPinned, Bell, Key, Phone, Mail, CreditCard, Utensils
} from 'lucide-react'

const luxuryEasing = [0.22, 1, 0.36, 1]

const services = {
  frontDesk: {
    icon: User,
    title: '24-Hour Front Desk Services',
    color: 'from-blue-500 to-indigo-600',
    description: 'Round-the-clock assistance for all your needs',
    items: [
      '24-hour front desk service',
      'Invoice provided',
      'Secure lockers',
      'Private check-in/check-out',
      'Concierge service',
      'Baggage storage',
      'Tour desk',
      'Currency exchange',
      'Wake-up service/alarm clock',
      'Check-in time: 3:00 PM',
      'Check-out time: 11:30 AM'
    ]
  },
  housekeeping: {
    icon: Sparkles,
    title: 'Cleaning Services',
    color: 'from-teal-500 to-cyan-600',
    description: 'Impeccable cleanliness and attention to detail',
    items: [
      'Daily housekeeping',
      'Suit press (additional charge)',
      'Ironing service (additional charge)',
      'Dry cleaning (additional charge)',
      'Laundry service (additional charge)',
      'Ironing facilities in rooms'
    ]
  },
  business: {
    icon: Briefcase,
    title: 'Business Services',
    color: 'from-purple-500 to-indigo-600',
    description: 'Professional facilities for business travelers',
    items: [
      'Fax/Photocopying services (additional charge)',
      'Fully equipped business center',
      'Meeting and banquet facilities (additional charge)',
      'High-speed WiFi throughout property',
      'Private meeting rooms',
      'Conference facilities',
      'AV equipment available'
    ]
  },
  family: {
    icon: Baby,
    title: 'Entertainment & Family Services',
    color: 'from-pink-500 to-rose-600',
    description: 'Special amenities for families and entertainment',
    items: [
      'Baby safety gates',
      'Kids\' meals available (additional charge)',
      'Kids\' pool area',
      'Family rooms',
      'Interconnected rooms',
      'Evening entertainment',
      'Nightclub/DJ (additional charge)'
    ]
  },
  transportation: {
    icon: Car,
    title: 'Transportation Services',
    color: 'from-amber-500 to-yellow-600',
    description: 'Convenient transport options',
    items: [
      'Car rental service',
      'Private parking on site (reservation needed)',
      'Parking costs AED 20 per day',
      'Valet parking',
      'Secure parking garage',
      'Airport proximity (2.1 km from Dubai International Airport)'
    ]
  },
  concierge: {
    icon: MapPinned,
    title: 'Concierge & Tour Services',
    color: 'from-green-500 to-emerald-600',
    description: 'Expert local knowledge and assistance',
    items: [
      'Professional concierge service',
      'Tour desk with local expertise',
      'Ticket booking assistance',
      'Restaurant reservations',
      'Event planning support',
      'Local attraction recommendations',
      'Transportation arrangements'
    ]
  },
  security: {
    icon: Shield,
    title: 'Safety & Security',
    color: 'from-red-500 to-orange-600',
    description: 'Your safety is our top priority',
    items: [
      'Fire extinguishers',
      'CCTV outside property',
      'CCTV in common areas',
      'Smoke alarms throughout',
      'Security alarm system',
      'Key card access',
      'Key access available',
      '24-hour security personnel',
      'In-room safe'
    ]
  },
  roomService: {
    icon: Bell,
    title: 'Room Service',
    color: 'from-violet-500 to-purple-600',
    description: 'Premium in-room dining and services',
    items: [
      '24-hour room service',
      'Breakfast in room available',
      'In-room dining menus',
      'Special diet meals on request',
      'Tea/Coffee maker in all rooms',
      'Minibar service',
      'Fresh fruit available (additional charge)',
      'Wine/Champagne service (additional charge)'
    ]
  },
  wellness: {
    icon: Sparkles,
    title: 'Beauty & Wellness Services',
    color: 'from-pink-600 to-rose-700',
    description: 'Pamper yourself with premium treatments',
    items: [
      'On-site spa facilities (additional charge)',
      'Full-body massage (additional charge)',
      'Beauty services',
      'Facial treatments',
      'Hair/Beauty salon',
      'Waxing services',
      'Body treatments',
      'Spa packages available'
    ]
  },
  communication: {
    icon: Phone,
    title: 'Communication Services',
    color: 'from-blue-600 to-cyan-600',
    description: 'Stay connected during your stay',
    items: [
      'Free WiFi in all areas',
      'Telephone in rooms',
      'Email assistance',
      'Printing services',
      'Fax services',
      'High-speed internet',
      'Business center computers'
    ]
  },
  special: {
    icon: CreditCard,
    title: 'Special Services',
    color: 'from-indigo-600 to-purple-700',
    description: 'Additional conveniences for your comfort',
    items: [
      'Currency exchange',
      'Invoice provided',
      'Express check-in/check-out',
      'Luggage assistance',
      'Porter service',
      'Newspaper delivery',
      'Shoe shine service',
      'Package receiving',
      'Mail services'
    ]
  },
  dining: {
    icon: Utensils,
    title: 'Breakfast & Dining Services',
    color: 'from-orange-500 to-amber-600',
    description: 'Start your day with exceptional cuisine',
    items: [
      'Continental breakfast available',
      'Buffet breakfast',
      'À la carte breakfast selections',
      'Vegetarian options',
      'Halal dining options',
      'Kids\' meals',
      'Special diet meals on request',
      'On-site restaurant',
      'Bar and lounge',
      'Coffee house'
    ]
  }
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring' }}
              className="inline-flex mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <User className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white drop-shadow-[0_0_60px_rgba(168,85,247,0.6)]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Premium Guest Services
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-3xl mx-auto">
              Exceptional hospitality tailored to exceed your expectations
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-400" />
              <div className="h-1.5 w-32 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full shadow-lg shadow-purple-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-400" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-300/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-300/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEasing }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-600 to-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              Comprehensive Hotel Services
            </h2>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-purple-400" />
              <div className="h-1.5 w-24 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full shadow-lg shadow-purple-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-purple-400" />
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From arrival to departure, we ensure every moment of your stay is exceptional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(services).map(([key, service], index) => (
              <ServiceCard
                key={key}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05, ease: luxuryEasing }}
      whileHover={{ y: -10, scale: 1.01 }}
      className="group relative h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

      <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group-hover:border-purple-200 h-full">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out overflow-hidden rounded-2xl">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-purple-100/30 to-transparent skew-x-12" />
        </div>

        <div className="flex items-start gap-4 mb-4 relative z-10">
          <motion.div
            className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              {service.description}
            </p>
          </div>
        </div>

        <ul className="space-y-2 relative z-10 mt-6">
          {service.items.map((item: string, idx: number) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 + idx * 0.02 }}
              className="flex items-start gap-2 text-gray-700"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
              <span className="font-medium">{item}</span>
            </motion.li>
          ))}
        </ul>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
      </div>
    </motion.div>
  )
}
