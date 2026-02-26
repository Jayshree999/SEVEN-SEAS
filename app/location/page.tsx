'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
    MapPin, Plane, Train, Building, Building2, Palmtree, UtensilsCrossed,
    Coffee, ShoppingBag, Waves, Star, Navigation2, Clock
} from 'lucide-react'
import Link from 'next/link'

const luxuryEasing = [0.22, 1, 0.36, 1]

const nearbyAttractions = [
    {
        category: 'Airports',
        icon: Plane,
        color: 'from-blue-500 to-cyan-500',
        places: [
            { name: 'Dubai International Airport', distance: '2.1 km', time: '5 min drive' },
            { name: 'Sharjah International Airport', distance: '23 km', time: '20 min drive' },
            { name: 'Al Maktoum International Airport', distance: '58 km', time: '45 min drive' },
        ]
    },
    {
        category: 'Cultural Attractions',
        icon: Building,
        color: 'from-purple-500 to-pink-500',
        places: [
            { name: 'Sharjah Aquarium', distance: '8 km', time: '12 min drive' },
            { name: 'Saeed Al Maktoum House', distance: '9 km', time: '15 min drive' },
            { name: 'Sharjah Heritage Museum', distance: '11 km', time: '18 min drive' },
            { name: 'Museum of Islamic Civilization', distance: '12 km', time: '20 min drive' },
            { name: 'Hareem Al Sultan Exhibition', distance: '17 km', time: '25 min drive' },
        ]
    },
    {
        category: 'Landmarks & Entertainment',
        icon: Building2,
        color: 'from-amber-500 to-yellow-600',
        places: [
            { name: 'Sahara Center', distance: '1.9 mi (3.1 km)', time: '8 min drive' },
            { name: 'Burj Khalifa', distance: '17 km', time: '22 min drive' },
            { name: 'Emaar Square', distance: '17 km', time: '23 min drive' },
            { name: 'Green Planet Dubai', distance: '18 km', time: '24 min drive' },
            { name: 'The Dubai Fountain', distance: '18 km', time: '25 min drive' },
            { name: 'Ras Al Khor Wildlife Sanctuary', distance: '19 km', time: '26 min drive' },
        ]
    },
    {
        category: 'Beaches',
        icon: Waves,
        color: 'from-cyan-500 to-blue-500',
        places: [
            { name: 'Al Mamzar Open Beach', distance: '3.5 km', time: '8 min drive' },
            { name: 'Mamzar Beach', distance: '5 km', time: '10 min drive' },
            { name: 'Al Mamzar Beach Park', distance: '5 km', time: '11 min drive' },
            { name: 'Al Khan Beach', distance: '9 km', time: '15 min drive' },
            { name: 'Al Corniche Beach', distance: '9 km', time: '16 min drive' },
        ]
    },
    {
        category: 'Public Transit',
        icon: Train,
        color: 'from-red-500 to-orange-500',
        places: [
            { name: 'Stadium Metro Station (Train)', distance: '1.2 km', time: '4 min walk' },
            { name: 'Stadium Metro Station (Subway)', distance: '1.2 km', time: '15 min walk' },
            { name: 'Al Qiyadah Metro Station (Train)', distance: '1.2 km', time: '15 min walk' },
            { name: 'Al Qiyadah (Subway)', distance: '1.4 km', time: '17 min walk' },
        ]
    },
    {
        category: 'Restaurants & Cafés',
        icon: UtensilsCrossed,
        color: 'from-green-500 to-emerald-500',
        places: [
            { name: 'Okka Cafe', distance: '150 m', time: '2 min walk' },
            { name: 'Kings Corner Café', distance: '700 m', time: '9 min walk' },
            { name: 'Fursan Al Emarat General Trading', distance: '1.2 km', time: '15 min walk' },
        ]
    },
]

const locationHighlights = [
    {
        icon: MapPin,
        title: 'Prime Location',
        description: 'Strategically located in Al Qiyadah, Dubai - perfect for both business and leisure travelers'
    },
    {
        icon: Plane,
        title: 'Airport Proximity',
        description: 'Just 2.1 km from Dubai International Airport - convenient for international travelers'
    },
    {
        icon: Navigation2,
        title: 'Easy Accessibility',
        description: 'Close to metro stations and major highways for seamless city exploration'
    },
    {
        icon: ShoppingBag,
        title: 'Shopping Nearby',
        description: 'Sahara Center and other shopping destinations within easy reach'
    },
]

export default function LocationPage() {
    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <main className="min-h-screen bg-white">
            <Navigation />
            <Breadcrumbs />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]"
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
                            <div className="w-16 h-16 rounded-none bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                                <MapPin className="w-8 h-8 text-blue-400" />
                            </div>
                        </motion.div>

                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-[0_0_60px_rgba(59,130,246,0.6)]"
                            style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                            Prime Dubai Location
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-3xl mx-auto">
                            Perfectly positioned for exploring the best of Dubai
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-400" />
                            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/50" />
                            <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-400" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Location Highlights */}
            <section className="py-16 md:py-20 px-6 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {locationHighlights.map((highlight, index) => (
                            <motion.div
                                key={highlight.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: luxuryEasing }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-blue-50 mb-6 border border-blue-100">
                                    <highlight.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                                    {highlight.title}
                                </h3>
                                <p className="text-gray-600 font-medium">
                                    {highlight.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nearby Attractions */}
            <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-300/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-300/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: luxuryEasing }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                            Nearby Attractions & Amenities
                        </h2>

                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="h-px w-24 bg-gradient-to-r from-transparent to-blue-400" />
                            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/50" />
                            <div className="h-px w-24 bg-gradient-to-l from-transparent to-blue-400" />
                        </div>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover what's within easy reach of Seven Seas Hotel Dubai
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {nearbyAttractions.map((category, index) => (
                            <AttractionCard
                                key={category.category}
                                category={category}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Walking Score */}
                    <motion.div
                        className="mt-16 bg-[#f8f6f0] rounded-none p-10 md:p-14 border border-blue-100 shadow-sm"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: luxuryEasing }}
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-14 h-14 rounded-none bg-blue-600 flex items-center justify-center shadow-md">
                                <Star className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>Neighborhood Highlights</h3>
                                <p className="text-gray-600">Walking around the neighborhood rating: 7.3/10</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-700 font-medium">
                            Guests loved walking around the neighborhood! Our prime location in Al Qiyadah offers easy access to local amenities, dining options, and public transportation.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function AttractionCard({ category, index }: { category: any, index: number }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const Icon = category.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: luxuryEasing }}
            whileHover={{ y: -8 }}
            className="group relative h-full"
        >
            <div className="relative bg-white rounded-none p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200 group-hover:border-blue-400/50 h-full">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent skew-x-12" />
                </div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <motion.div
                        className={`w-12 h-12 bg-white rounded-none flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-blue-200 transition-colors`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Icon className="w-6 h-6 text-blue-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {category.category}
                    </h3>
                </div>

                <ul className="space-y-3 relative z-10">
                    {category.places.map((place: any, idx: number) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                            className="flex items-start justify-between gap-4 text-gray-700 pb-3 border-b border-gray-100 last:border-0"
                        >
                            <span className="font-semibold">{place.name}</span>
                            <div className="text-right flex-shrink-0">
                                <div className="text-blue-600 font-bold text-sm">{place.distance}</div>
                                {place.time && <div className="text-gray-500 text-xs">{place.time}</div>}
                            </div>
                        </motion.li>
                    ))}
                </ul>

                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    )
}
