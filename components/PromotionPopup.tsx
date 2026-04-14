<<<<<<< HEAD
'use client'

import { useState, useEffect, useRef } from 'react'
=======
'use strict'

'use client'

import React, { useState, useEffect } from 'react'
>>>>>>> 4d8cbf6fa2aced507e794e5ef5cd210b890f02d5
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

<<<<<<< HEAD
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
=======
const PROMOS = [
    {
        id: 1,
        src: '/promo-1.png',
        alt: 'Promotion 1',
        message: 'Hi Seven Seas Hotel! I saw the "Stay Longer Save More" offer on your website and would like to know more about the AED 1,999 single bed offer.'
    },
    {
        id: 2,
        src: '/promo-2.png',
        alt: 'Promotion 2',
        message: 'Hi Seven Seas Hotel! I saw the AED 2,999 offer on your website and would like to know more.'
    },
]

const WHATSAPP_NUMBER = '971569756484'

export default function PromotionPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Show popup after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 3000)
>>>>>>> 4d8cbf6fa2aced507e794e5ef5cd210b890f02d5

        return () => clearTimeout(timer)
    }, [])

<<<<<<< HEAD
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
=======
    useEffect(() => {
        if (!isVisible) return

        // Auto-slide every 5 seconds
        const slideTimer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PROMOS.length)
        }, 5000)

        return () => clearInterval(slideTimer)
    }, [isVisible])

    const handleClose = () => {
        setIsVisible(false)
    }

    const handlePromoClick = () => {
        const message = encodeURIComponent(PROMOS[currentIndex].message);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cursor-pointer"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-auto max-w-[95%] sm:max-w-md max-h-[95vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col cursor-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 z-30 p-1.5 text-white bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-md shadow-lg"
                            aria-label="Close promotion"
                        >
                            <X size={18} />
                        </button>

                        {/* Content Slider */}
                        <div className="relative w-full overflow-hidden cursor-pointer bg-neutral-100" onClick={handlePromoClick}>
                            <div className="relative w-full h-auto min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-auto"
                                    >
                                        <Image
                                            src={PROMOS[currentIndex].src}
                                            alt={PROMOS[currentIndex].alt}
                                            width={1000}
                                            height={1250}
                                            className="w-full h-auto block"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Slider Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {PROMOS.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setCurrentIndex(index)
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'w-6 bg-white shadow-sm' : 'bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA Area */}
                        <div className="p-4 bg-white">
                            <button
                                onClick={handlePromoClick}
                                className="w-full py-3.5 bg-[#B89146] hover:bg-[#A37F3D] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                            >
                                <span className="text-lg">Chat with us on WhatsApp</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    width="22"
                                    height="22"
                                    fill="currentColor"
                                    className="group-hover:scale-110 transition-transform"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
>>>>>>> 4d8cbf6fa2aced507e794e5ef5cd210b890f02d5
            )}
        </AnimatePresence>
    )
}
