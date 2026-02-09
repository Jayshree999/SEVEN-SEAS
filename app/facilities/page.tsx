'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import FloatingGoldParticles from '@/components/FloatingGoldParticles'
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
        color: 'from-orange-500 to-red-500',
        items: [
            '24-hour access',
            'Cardio equipment',
            'Free weights',
            'Modern exercise machines',
            'Personal training available',
            'Massage chair',
            'Fitness programs'
        ]
    },
    dining: {
        icon: UtensilsCrossed,
        title: 'Dining Services',
        color: 'from-amber-500 to-yellow-500',
        items: [
            'Salt Restaurant - International cuisine',
            'Indian specialties',
            'Mediterranean flavors',
            'Local dishes',
            'Halal options',
            'Vegetarian menu',
            'Special diet meals on request',
            'Kids\' meals available',
            'Breakfast buffet options',
            '24-hour room service',
            'Bar and lounge',
            'Coffee house',
            'Pool bar service',
            'Wine and champagne service',
            'À la carte dining'
        ]
    },
    business: {
        icon: Briefcase,
        title: 'Business Facilities',
        color: 'from-gray-600 to-gray-800',
        items: [
            'Fully equipped business center',
            'Meeting rooms',
            'Banquet facilities',
            'Fax and photocopying services',
            'High-speed internet',
            'Printing services',
            'Professional event planning'
        ]
    },
    internet: {
        icon: Wifi,
        title: 'Internet & Connectivity',
        color: 'from-green-500 to-emerald-500',
        items: [
            'Free WiFi in all areas',
            'High-speed connection',
            'Business-grade internet'
        ]
    },
    parking: {
        icon: Car,
        title: 'Parking',
        color: 'from-slate-500 to-zinc-600',
        items: [
            'Private parking on site (reservation needed)',
            'AED 20 per day',
            'Valet parking service',
            'CCTV surveillance',
            'Secure parking garage'
        ]
    },
    frontDesk: {
        icon: Clock,
        title: '24-Hour Front Desk',
        color: 'from-purple-500 to-violet-500',
        items: [
            'Concierge service',
            'Baggage storage',
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
            'Laundry service',
            'Dry cleaning',
            'Ironing service',
            'Ironing facilities in rooms',
            'Shoe shine service'
        ]
    },
    safety: {
        icon: Shield,
        title: 'Safety & Security',
        color: 'from-red-600 to-orange-600',
        items: [
            'Fire extinguishers',
            'CCTV cameras',
            'Smoke alarms',
            'Security alarm',
            'Key card access',
            '24-hour security',
            'In-room safes',
            'First aid kits',
            'Safety deposit boxes'
        ]
    },
    accessibility: {
        icon: Accessibility,
        title: 'Accessibility',
        color: 'from-indigo-500 to-blue-600',
        items: [
            'Wheelchair accessible',
            'Elevator access',
            'Bathroom emergency cords',
            'Lowered sinks',
            'Toilets with grab rails',
            'Facilities for disabled guests',
            'Accessible rooms available'
        ]
    },
    roomAmenities: {
        icon: Bed,
        title: 'In-Room Amenities',
        color: 'from-emerald-600 to-green-600',
        items: [
            'Air conditioning',
            'Heating',
            'Soundproofing',
            'Free WiFi',
            'Desk workspace',
            'Sitting area',
            'Wardrobes/closets',
            'Walk-in closet (select rooms)',
            'City views',
            'Sockets near bed',
            'Tea/Coffee maker',
            'Minibar',
            'In-room safe',
            'Telephone'
        ]
    },
    bathroom: {
        icon: Bath,
        title: 'Bathroom Features',
        color: 'from-sky-500 to-blue-500',
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
            'Premium towels',
            'Shower caps',
            'Toothbrush and toothpaste'
        ]
    },
    media: {
        icon: Monitor,
        title: 'Media & Technology',
        color: 'from-violet-500 to-purple-500',
        items: [
            'Flat-screen TV',
            'Satellite channels',
            'Alarm clock',
            'Electric kettle',
            'Telephone'
        ]
    },
    general: {
        icon: Globe,
        title: 'General Amenities',
        color: 'from-rose-500 to-pink-500',
        items: [
            'Non-smoking rooms',
            'Designated smoking areas',
            'Family rooms',
            'Interconnected rooms',
            'Hardwood/parquet floors',
            'Carpeted rooms',
            'Fireplace (select rooms)',
            'Dining area in rooms',
            'Heating',
            'Private check-in/check-out',
            'Express check-in/check-out',
            'Invoices provided'
        ]
    },
    languages: {
        icon: Users,
        title: 'Languages Spoken',
        color: 'from-amber-600 to-orange-500',
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
    const heroSectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: heroSectionRef,
        offset: ['start start', 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    return (
        <main className=\"min-h-screen bg-white overflow-hidden\">
            <Navigation />
            <Breadcrumbs />

    {/* Ultra-Premium Hero Section with Parallax */ }
    <section ref={heroSectionRef} className=\"relative h-screen flex items-center justify-center overflow-hidden\">
    {/* Floating Gold Particles */ }
                <FloatingGoldParticles />
                
                <motion.div style={{ y, opacity }} className=\"absolute inset-0 z-0\">
        < div className =\"absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900\" />

    {/* Noise Texture */ }
    <div className=\"absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]\" />

    {/* Multiple Floating Orbs with enhanced animations */ }
    <motion.div
        className=\"absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]\"
    animate = {{
        scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
                x: [0, 50, 0],
                    y: [0, 30, 0],
                        }
}
transition = {{
    duration: 8, repeat: Infinity, ease: \"easeInOut\" }}
        />
        <motion.div
            className=\"absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]\"
    animate = {{
        scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
                x: [0, -40, 0],
                    y: [0, -50, 0],
                        }
}
transition = {{
    duration: 10, repeat: Infinity, delay: 1, ease: \"easeInOut\" }}
        />
        <motion.div
            className=\"absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-[120px]\"
    animate = {{
        scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
                x: [0, 60, 0],
                        }
}
transition = {{
    duration: 12, repeat: Infinity, delay: 2, ease: \"easeInOut\" }}
        />

        {/* Animated gradient overlay */ }
        < motion.div
    className =\"absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-purple-900/10\"
    animate = {{
        x: ['-100%', '100%'],
                        }
}
transition = {{
    duration: 15,
        repeat: Infinity,
            ease: 'linear',
                        }}
                    />
                </motion.div >

    <div className=\"relative z-20 text-center px-6 max-w-6xl mx-auto\">
        < motion.div
initial = {{ opacity: 0, y: 50 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.8, ease: luxuryEasing }}
                    >
    {/* Icon with enhanced animations */ }
    < motion.div
initial = {{ scale: 0, rotate: -180 }}
animate = {{ scale: 1, rotate: 0 }}
transition = {{ duration: 1, type: 'spring', bounce: 0.4 }}
className =\"inline-flex mb-8\"
    >
    <motion.div
        className=\"w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/50\"
animate = {{
    boxShadow: [
        '0 25px 50px -12px rgba(251, 191, 36, 0.5)',
        '0 25px 50px -12px rgba(251, 191, 36, 0.8)',
        '0 25px 50px -12px rgba(251, 191, 36, 0.5)',
    ]
}}
transition = {{ duration: 2, repeat: Infinity }}
                            >
    <Sparkles className=\"w-10 h-10 text-white\" />
                            </motion.div >
                        </motion.div >

    {/* Title */ }
    < motion.h1
className =\"text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-[0_0_60px_rgba(251,191,36,0.6)]\"
style = {{ fontFamily: 'var(--font-playfair)' }}
initial = {{ opacity: 0, y: 30 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.8, delay: 0.2, ease: luxuryEasing }}
                        >
    World - Class Facilities
                        </motion.h1 >

    <motion.p
        className=\"text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-3xl mx-auto\"
initial = {{ opacity: 0 }}
animate = {{ opacity: 1 }}
transition = {{ duration: 0.8, delay: 0.4 }}
                        >
    Experience luxury amenities designed for your comfort and convenience
                        </motion.p >

    {/* Underline */ }
    < motion.div
className =\"flex items-center justify-center gap-3\"
initial = {{ scale: 0 }}
animate = {{ scale: 1 }}
transition = {{ duration: 0.6, delay: 0.6 }}
                        >
    <div className=\"h-px w-24 bg-gradient-to-r from-transparent to-amber-400\" />
        < div className =\"h-1.5 w-32 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/50\" />
            < div className =\"h-px w-24 bg-gradient-to-l from-transparent to-amber-400\" />
                        </motion.div >
                    </motion.div >
                </div >

    {/* Scroll Indicator */ }
    < motion.div
className =\"absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30\"
animate = {{ y: [0, 10, 0] }}
transition = {{ duration: 2, repeat: Infinity }}
                >
    <div className=\"w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2\">
        < motion.div
className =\"w-1 h-3 bg-white/70 rounded-full\"
animate = {{ y: [0, 12, 0] }}
transition = {{ duration: 1.5, repeat: Infinity }}
                        />
                    </div >
                </motion.div >
            </section >

    {/* Facilities Grid with enhanced animations */ }
    < section className =\"py-24 md:py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden\">
{/* Background decor */ }
<div className=\"absolute inset-0 overflow-hidden pointer-events-none\">
    < motion.div
className =\"absolute top-0 left-1/3 w-96 h-96 bg-amber-300/10 rounded-full blur-[120px]\"
animate = {{
    scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
}}
transition = {{ duration: 10, repeat: Infinity }}
                    />
    < motion.div
className =\"absolute bottom-0 right-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-[120px]\"
animate = {{
    scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2]
}}
transition = {{ duration: 12, repeat: Infinity, delay: 1 }}
                    />
                </div >

    <div className=\"container mx-auto max-w-7xl relative z-10\">
{
    Object.entries(facilities).map(([key, facility], index) => {
        const Icon = facility.icon
        return (
            <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                    once: true, margin: \"-100px\" }}
                                transition = {{ duration: 0.6, delay: index * 0.05, ease: luxuryEasing
    }}
className =\"mb-16 last:mb-0\"
    >
    <motion.div
        className=\"bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden group\"
whileHover = {{
    scale: 1.01,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
}}
transition = {{ duration: 0.3 }}
                                >
    {/* Gradient overlay on hover */ }
    < motion.div
className =\"absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500\"
    />

    <div className=\"relative z-10\">
        < div className =\"flex items-center gap-6 mb-8\">
            < motion.div
className = {`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${facility.color} flex items-center justify-center shadow-lg`}
whileHover = {{ rotate: 360, scale: 1.1 }}
transition = {{
    duration: 0.6, ease: \"easeInOut\" }}
        >
        <Icon className=\"w-10 h-10 text-white\" />
                                            </motion.div >
        <h2
            className=\"text-3xl md:text-4xl font-bold text-gray-900\"
    style = {{ fontFamily: 'var(--font-playfair)' }
}
                                            >
    { facility.title }
                                            </h2 >
                                        </div >

    <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">
{
    facility.items.map((item, itemIndex) => (
        <motion.div
            key={itemIndex}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.4,
                delay: itemIndex * 0.03,
                ease: luxuryEasing
            }}
            whileHover={{ x: 5, scale: 1.02 }}
            className=\"flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50/50 transition-colors duration-300\"
    >
    <motion.div
        className=\"flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 mt-2\"
                                                        whileHover = {{ scale: 1.5 }}
                                                    />
    < span className =\"text-gray-700 font-medium leading-relaxed\">
{ item }
                                                    </span >
                                                </motion.div >
                                            ))}
                                        </div >
                                    </div >
                                </motion.div >
                            </motion.div >
                        )
                    })}
                </div >
            </section >

    <Footer />
        </main >
    )
}
