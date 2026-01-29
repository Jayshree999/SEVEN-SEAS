'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Calendar, MapPin, Users, Maximize, ArrowRight, Star } from 'lucide-react'

// Types for Facility (matching backend structure)
interface Facility {
    _id: string
    title: string
    description: string
    photos: { url: string; category: string }[]
    facility_type: string
    capacity: number
    size: number
    price: number
    defaultPricingType: 'daily' | 'monthly' | 'yearly'
    address?: {
        address?: string
        city?: string
        country?: string
    }
    amenities: string[]
}

export default function FacilitiesPage() {
    const [facilities, setFacilities] = useState<Facility[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                // Determine API URL and Organization
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
                const organization = process.env.NEXT_PUBLIC_ORGANIZATION || 'sevenseas';

                const res = await fetch(`${apiUrl}/api/v1/facility`, {
                    headers: {
                        'x-organisation': organization
                    }
                });
                const data = await res.json()
                if (data.success) {
                    setFacilities(data.data.facilities)
                }
            } catch (error) {
                console.error("Failed to fetch facilities", error)
            } finally {
                setLoading(false)
            }
        }
        fetchFacilities()
    }, [])

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <Image
                    src="/hero2.jpg" // Placeholder or dynamic
                    alt="Our Facilities"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="max-w-4xl px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair"
                        >
                            World-Class Facilities
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-200"
                        >
                            Experience elegance and luxury in our premium event spaces and conference halls.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Facilities List */}
            <section className="py-20 px-4 md:px-12 bg-gray-50">
                <div className="container mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {facilities.map((facility, index) => (
                                <motion.div
                                    key={facility._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="relative h-80 overflow-hidden">
                                        <Image
                                            src={facility.photos[0]?.url || '/placeholder.jpg'}
                                            alt={facility.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-amber-900">
                                            {facility.facility_type}
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair group-hover:text-amber-700 transition-colors">
                                            {facility.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 mb-6 text-gray-600 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4 text-amber-600" />
                                                <span>Up to {facility.capacity} Guests</span>
                                            </div>
                                            {facility.size && (
                                                <div className="flex items-center gap-1">
                                                    <Maximize className="w-4 h-4 text-amber-600" />
                                                    <span>{facility.size} sq ft</span>
                                                </div>
                                            )}
                                            {facility.address?.city && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4 text-amber-600" />
                                                    <span>{facility.address.city}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-gray-600 mb-8 line-clamp-3">
                                            {facility.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t pt-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider">Starting from</span>
                                                <span className="text-xl font-bold text-amber-700">
                                                    AED {facility.price.toLocaleString()}
                                                    <span className="text-sm font-normal text-gray-500"> / {facility.defaultPricingType}</span>
                                                </span>
                                            </div>
                                            <Link href={`/facilities/${facility._id}`}>
                                                <button className="bg-black hover:bg-neutral-800 text-white rounded-full px-6 py-2 flex items-center transition-colors">
                                                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}
