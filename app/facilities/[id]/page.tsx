'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import {
    Calendar, MapPin, Users, Maximize, Check,
    Wifi, Coffee, Projector, Mic, Music, Wind,
    Utensils, Info, ArrowLeft
} from 'lucide-react'

interface Facility {
    _id: string
    title: string
    description: string
    photos: { url: string; category: string }[]
    facility_type: string
    capacity: number
    size: number
    price: number
    defaultPricingType: string
    address?: {
        address?: string
        city?: string
        country?: string
    }
    amenities: string[]
    status: boolean
    hasWiFi: boolean
    hasAirConditioning: boolean
    hasProjector: boolean
    hasSoundSystem: boolean
    hasKitchen: boolean
    isFurnished: boolean
}

export default function FacilityDetailsPage() {
    const { id } = useParams()
    const [facility, setFacility] = useState<Facility | null>(null)
    const [loading, setLoading] = useState(true)
    const [activePhoto, setActivePhoto] = useState(0)

    useEffect(() => {
        if (!id) return

        const fetchFacility = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/v1/facility/${id}`)
                const data = await res.json()
                if (data.success) {
                    setFacility(data.data)
                }
            } catch (error) {
                console.error("Failed to fetch facility details", error)
            } finally {
                setLoading(false)
            }
        }
        fetchFacility()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
        )
    }

    if (!facility) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Facility Not Found</h1>
                <Link href="/facilities">
                    <button className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">Back to Facilities</button>
                </Link>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            {/* Gallery Hero */}
            <div className="relative h-[60vh] md:h-[70vh] bg-black">
                {facility.photos.length > 0 && (
                    <Image
                        src={facility.photos[activePhoto].url}
                        alt={facility.title}
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="container mx-auto text-white">
                        <Link href="/facilities" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Facilities
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                                {facility.facility_type}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-playfair">{facility.title}</h1>
                            <div className="flex flex-wrap gap-6 text-gray-200">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-amber-500" />
                                    <span>Capacity: {facility.capacity} Guests</span>
                                </div>
                                {facility.size && (
                                    <div className="flex items-center gap-2">
                                        <Maximize className="w-5 h-5 text-amber-500" />
                                        <span>{facility.size} sq ft</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-amber-500" />
                                    <span>{facility.address?.city || 'Dubai'}, {facility.address?.country}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-8 right-8 md:right-12 flex gap-2 overflow-x-auto max-w-md pb-2 no-scrollbar">
                    {facility.photos.map((photo, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActivePhoto(idx)}
                            className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === idx ? 'border-amber-500 scale-105' : 'border-white/30 hover:border-white/70'
                                }`}
                        >
                            <Image src={photo.url} alt="Thumbnail" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6 font-playfair">About this Space</h2>
                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                                {facility.description}
                            </p>
                        </section>

                        {/* Features & Amenities */}
                        <section>
                            <h2 className="text-3xl font-bold mb-8 font-playfair">Features & Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                                {facility.hasWiFi && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Wifi className="w-5 h-5" /></div>
                                        <span>High-Speed WiFi</span>
                                    </div>
                                )}
                                {facility.hasAirConditioning && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Wind className="w-5 h-5" /></div>
                                        <span>Air Conditioning</span>
                                    </div>
                                )}
                                {facility.hasProjector && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Projector className="w-5 h-5" /></div>
                                        <span>HD Projector</span>
                                    </div>
                                )}
                                {facility.hasSoundSystem && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Music className="w-5 h-5" /></div>
                                        <span>Premium Sound</span>
                                    </div>
                                )}
                                {facility.hasKitchen && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Utensils className="w-5 h-5" /></div>
                                        <span>Kitchen Access</span>
                                    </div>
                                )}
                                {facility.isFurnished && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Coffee className="w-5 h-5" /></div>
                                        <span>Fully Furnished</span>
                                    </div>
                                )}
                                {facility.amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Check className="w-5 h-5" /></div>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold mb-6 font-playfair border-b pb-4">Booking Details</h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Price</span>
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-amber-700">AED {facility.price.toLocaleString()}</span>
                                        <span className="text-sm text-gray-500 block">per {facility.defaultPricingType.replace('ly', '')}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Cleaning Fee</span>
                                        <span className="font-medium">AED 200</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Setup Fee</span>
                                        <span className="font-medium">AED 150</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-black hover:bg-neutral-800 text-white py-4 text-lg rounded-xl mb-4 font-bold transition-colors">
                                Request to Book
                            </button>

                            <button className="w-full border-2 border-gray-200 hover:border-black py-4 text-lg rounded-xl font-bold transition-all text-gray-800">
                                Contact for Inquiry
                            </button>

                            <div className="mt-6 flex items-start gap-3 bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                                <Info className="w-5 h-5 min-w-[20px]" />
                                <p>You won't be charged yet. We'll check availability and confirm your booking request within 24 hours.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
