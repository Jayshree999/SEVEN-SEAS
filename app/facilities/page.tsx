'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
    Sparkles, Waves, Heart, Dumbbell, UtensilsCrossed, Briefcase,
    Wifi, Car, Shield, Clock, Globe, Accessibility, Coffee, Wine,
    Shirt, Camera, Users, Baby, Ban, Key, Bath, Wind, Bed, Monitor
} from 'lucide-react'

const luxuryEasing = [0.22, 1, 0.36, 1]

const facilities = {
    pool: {
        icon: Waves,
        title: 'Rooftop Swimming Pool',
        color: 'from-blue-500 to-cyan-500',
        items: [
            'Open all year round',
            'All ages welcome',
            'Stunning rooftop location with city views',
            'Swimming pool toys available',
            'Pool bar service',
            'Beach chairs and loungers',
            'Beach umbrellas',
            'Kids\' pool area',
            'Locker rooms available'
        ]
    },
    spa: {
        icon: Heart,
        title: 'Spa & Wellness Center',
        color: 'from-pink-500 to-rose-500',
        items: [
            'Full-body massage therapy',
            'Hand, head, foot, neck & back massage',
            'Spa/Wellness packages',
            'Spa lounge & relaxation area',
            'Steam room facilities',
            'Light therapy treatments',
            'Body wrap services',
            'Body scrub treatments',
            'Waxing services',
            'Professional facial treatments',
            'Beauty services',
            'Hot tub/Jacuzzi',
            'Sauna'
        ]
    },
    fitness: {
        icon: Dumbbell,
        title: 'Fitness Center',
        color: 'from-orange-500 to-amber-500',
        items: [
            'State-of-the-art equipment',
            'Cardio machines',
            'Free weights',
            'Massage chair',
            'Open 24/7 for guests',
            'Towel service',
            'Water stations'
        ]
    },
    dining: {
        icon: UtensilsCrossed,
        title: 'Dining & Food Services',
        color: 'from-amber-500 to-yellow-600',
        items: [
            'On-site restaurant with international cuisine',
            'Indian, Mediterranean & local dishes',
            'Bar & lounge',
            'Coffee house on site',
            'Breakfast in room service',
            'Continental, buffet & à la carte breakfast',
            'Vegetarian options available',
            'Halal dining options',
            'Special diet meals on request',
            'Kids\' meals available',
            'Fresh fruit selection',
            'Wine & champagne service',
            'Minibar in rooms',
            'Tea/Coffee maker in all rooms',
            '24-hour room service'
        ]
    },
    business: {
        icon: Briefcase,
        title: 'Business Facilities',
        color: 'from-indigo-500 to-purple-500',
        items: [
            'Fully equipped business center',
            'Meeting & banquet facilities',
            'High-speed WiFi throughout',
            'Fax & photocopying services',
            'Private meeting rooms',
            'Conference facilities',
            'AV equipment available'
        ]
    },
    connectivity: {
        icon: Wifi,
        title: 'Internet & Connectivity',
        color: 'from-purple-500 to-pink-500',
        items: [
            'Free WiFi in all areas',
            'High-speed internet access',
            'Business center with computers',
            'WiFi in rooms',
            'WiFi in public areas'
        ]
    },
    parking: {
        icon: Car,
        title: 'Parking',
        color: 'from-gray-600 to-gray-700',
        items: [
            'Private parking on site',
            'Reservation required',
            'AED 20 per day',
            'Valet parking service',
            'Secure parking garage',
            'CCTV surveillance'
        ]
    },
    frontDesk: {
        icon: Clock,
        title: 'Front Desk Services',
        color: 'from-blue-600 to-indigo-600',
        items: [
            '24-hour front desk',
            'Invoice provided',
            'Secure lockers',
            'Private check-in/check-out',
            'Concierge service',
            'Baggage storage',
            'Tour desk',
            'Currency exchange',
            'Wake-up service',
            'Check-in: 3:00 PM',
            'Check-out: 11:30 AM'
        ]
    },
    cleaning: {
        icon: Sparkles,
        title: 'Cleaning Services',
        color: 'from-teal-500 to-cyan-500',
        items: [
            'Daily housekeeping',
            'Suit press service',
            'Ironing service',
            'Dry cleaning',
            'Laundry service'
        ]
    },
    safety: {
        icon: Shield,
        title: 'Safety & Security',
        color: 'from-red-500 to-orange-500',
        items: [
            'Fire extinguishers',
            'CCTV outside property',
            'CCTV in common areas',
            'Smoke alarms',
            'Security alarm',
            'Key card access',
            '24-hour security',
            'In-room safe'
        ]
    },
    accessibility: {
        icon: Accessibility,
        title: 'Accessibility Features',
        color: 'from-green-500 to-emerald-500',
        items: [
            'Bathroom emergency cord',
            'Lowered sink',
            'Toilet with grab rails',
            'Wheelchair accessible',
            'Entire unit wheelchair accessible',
            'Upper floors accessible by elevator',
            'Facilities for disabled guests'
        ]
    },
    roomAmenities: {
        icon: Bed,
        title: 'Room Amenities',
        color: 'from-purple-600 to-indigo-600',
        items: [
            'Air conditioning',
            'Private bathroom in all rooms',
            'City views',
            'Family rooms available',
            'Interconnected rooms',
            'Soundproof rooms',
            'Socket near the bed',
            'Walk-in closet',
            'Wardrobe or closet',
            'Alarm clock',
            'Sitting area',
            'Desk workspace',
            'Fireplace in select rooms',
            'Dining area'
        ]
    },
    bathroom: {
        icon: Bath,
        title: 'Bathroom Features',
        color: 'from-cyan-500 to-blue-500',
        items: [
            'Private bathroom',
            'Bathtub',
            'Shower',
            'Bidet',
            'Toilet',
            'Free toiletries',
            'Bathrobe',
            'Hairdryer',
            'Slippers',
            'Toilet paper',
            'Towels provided',
            'Premium linens'
        ]
    },
    media: {
        icon: Monitor,
        title: 'Media & Technology',
        color: 'from-red-600 to-pink-600',
        items: [
            'Flat-screen TV',
            'Telephone',
            'Premium channels',
            'Free WiFi'
        ]
    },
    general: {
        icon: Wind,
        title: 'General Amenities',
        color: 'from-slate-500 to-gray-600',
        items: [
            'Designated smoking area (smoking not allowed in rooms)',
            'Heating system',
            'Hardwood or parquet floors',
            'Carpeted areas',
            'Elevator access',
            'Car rental service',
            'Hair/Beauty salon',
            'Ironing facilities',
            'Non-smoking rooms available',
            'Evening entertainment',
            'Nightclub/DJ (additional charge)'
        ]
    },
    languages: {
        icon: Globe,
        title: 'Languages Spoken',
        color: 'from-violet-500 to-purple-600',
        items: [
            'Arabic',
            'English',
            'French',
            'Gujarati',
            'Hindi',
            'Malayalam',
            'Marathi',
            'Burmese',
            'Punjabi',
            'Russian',
            'Tamil',
            'Filipino',
            'Urdu'
        ]
    }
}

export default function FacilitiesPage() {
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <main className="min-h-screen bg-white">
            <Navigation />
            <Breadcrumbs />

            {/* Premium Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

                    {/* Floating Orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.15, 0.25, 0.15],
                        }}
                        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    />
                </div>

                <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: luxuryEasing }}
                    >
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, type: 'spring' }}
                            className="inline-flex mb-8"
                        >
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/50">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-[0_0_60px_rgba(251,191,36,0.6)]"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                            World-Class Facilities
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-3xl mx-auto">
                            Experience luxury amenities designed for your comfort and convenience
                        </p>

                        {/* Underline */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="h-1.5 w-32 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50" />
                            <div className="h-px w-24 bg-gradient-to-l from-transparent to-amber-400" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Facilities Grid */}
            <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {Object.entries(facilities).map(([key, facility], index) => (
                            <FacilityCard
                                key={key}
                                facility={facility}
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

function FacilityCard({ facility, index }: { facility: any, index: number }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const Icon = facility.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.05, ease: luxuryEasing }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="group relative h-full"
        >
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${facility.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

            {/* Card */}
            <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group-hover:border-amber-200 h-full">
                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out overflow-hidden rounded-2xl">
                    <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-100/30 to-transparent skew-x-12" />
                </div>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${facility.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {facility.title}
                    </h3>
                </div>

                {/* Items List */}
                <ul className="space-y-2 relative z-10">
                    {facility.items.map((item: string, idx: number) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.05 + idx * 0.02 }}
                            className="flex items-start gap-2 text-gray-700"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                        </motion.li>
                    ))}
                </ul>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
            </div>
        </motion.div>
    )
}
