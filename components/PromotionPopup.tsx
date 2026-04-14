'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

const OFFERS = [
    {
        id: 'single-twin-bed',
        image: '/promo-1.png',
        alt: 'Single and Twin Bed Offer - 1999/3999',
        message: "Hello! I'm interested in the Single Bed (1,999) and Twin Bed (3,999) offer at Seven Seas Hotel Dubai. Can you help me with more information?",
    },
    {
        id: 'offer-2999',
        image: '/promo-2.png',
        alt: 'Special Offer - 2999',
        message: "Hello! I'm interested in the 2,999 offer at Seven Seas Hotel Dubai. Can you provide more details?",
    },
]

export default function PromotionPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentOfferIndex, setCurrentOfferIndex] = useState(0)
    const [isMounted, setIsMounted] = useState(false)
    const rotationDone = useRef(false)

    useEffect(() => {
        setIsMounted(true)
        if (rotationDone.current) return
        rotationDone.current = true

        // Handle rotation logic
        const lastIndex = localStorage.getItem('promo_offer_index')
        const nextIndex = lastIndex !== null ? (parseInt(lastIndex) + 1) % OFFERS.length : 0
        
        console.log('Rotation Logic:', { lastIndex, nextIndex })
        
        setCurrentOfferIndex(nextIndex)
        localStorage.setItem('promo_offer_index', nextIndex.toString())

        // Show popup on every refresh with a slight delay
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    if (!isMounted) return null

    const offer = OFFERS[currentOfferIndex]
    const whatsappUrl = `https://wa.me/971551009136?text=${encodeURIComponent(offer.message)}`

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 2 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                        className="relative w-full max-w-2xl bg-charcoal rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)] border border-gold/30"
                    >
                        {/* Premium Glow Effect */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-pulse" />

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-5 z-20 bg-black/50 text-white hover:bg-gold hover:text-charcoal p-2.5 rounded-full transition-all duration-500 hover:rotate-90 group shadow-lg"
                            aria-label="Close popup"
                        >
                            <X className="w-6 h-6 transition-transform group-hover:scale-110" />
                        </button>

                        {/* Banner Image Container */}
                        <a 
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative aspect-[4/5] sm:aspect-square w-full group cursor-pointer overflow-hidden"
                        >
                            <Image
                                src={offer.image}
                                alt={offer.alt}
                                fill
                                className="object-contain transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />
                            
                            {/* Dynamic Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            
                            {/* Premium Overlay Elements */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            
                            {/* Interactive CTA */}
                            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8 flex justify-center">
                                <motion.span 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative translate-y-0"
                                >
                                    <span className="absolute inset-0 bg-gold blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <span className="relative bg-charcoal text-gold border-2 border-gold px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all duration-300 group-hover:bg-gold group-hover:text-charcoal flex items-center gap-3">
                                        <span>Inquire Now</span>
                                        <span className="w-2 h-2 rounded-full bg-gold group-hover:bg-charcoal animate-ping" />
                                    </span>
                                </motion.span>
                            </span>
                        </a>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
