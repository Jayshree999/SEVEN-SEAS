'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Building2, Utensils, Sparkles } from 'lucide-react'
import Image from 'next/image'

const DEFAULT_WHATSAPP_NUMBER = '971569756484'

const PROMOTIONS = [
    {
        id: 'long-term-rentals',
        badge: 'Long-Term Stay',
        title: 'Long-Term Rentals',
        price: '1 BHK & Luxury Rooms',
        image: '/promo-long-term.jpg',
        alt: 'Seven Seas Hotel Long-Term Rentals - 1 BHK Hotel Apartment & Luxury Rooms',
        icon: Building2,
        whatsappNumber: '971569756484',
        whatsappMessage: 'Hi Seven Seas Hotel! I saw your Long-Term Rentals offer (1 BHK & Rooms) on your website and would like to know more.'
    },
    {
        id: 'meals',
        badge: 'Food & Meals',
        title: 'Long Stay Food Meals',
        price: 'Starting from AED 300',
        image: '/promo-meals.jpg',
        alt: 'Long Stay Food Meals - Fresh Meals Every Day starting from AED 300',
        icon: Utensils,
        whatsappNumber: '971569756484',
        whatsappMessage: 'Hi Seven Seas Hotel! I saw your Long Stay Food Meals offer (Starting from AED 300) on your website and would like to know more.'
    },
    {
        id: 'staycation',
        badge: 'Staycation',
        title: 'Staycation Offer',
        price: 'Starting from AED 100',
        image: '/promo-staycation.jpg',
        alt: 'Seven Seas Hotel Staycation Offer - Room Only starting from AED 100 with breakfast & half board options',
        icon: Sparkles,
        whatsappNumber: '971551009152',
        whatsappMessage: 'Hi Seven Seas Hotel! I saw your Staycation Offer (Starting from AED 100) on your website and would like to know more.'
    }
]

export default function PromotionPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const isDismissed = localStorage.getItem('promo_dismissed')
        if (isDismissed) {
            const dismissedAt = parseInt(isDismissed)
            const now = new Date().getTime()
            const twentyFourHours = 24 * 60 * 60 * 1000
            
            if (now - dismissedAt < twentyFourHours) {
                return
            }
        }

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        localStorage.setItem('promo_dismissed', new Date().getTime().toString())
    }

    const handlePromoClick = (index: number) => {
        const promo = PROMOTIONS[index]
        const number = promo.whatsappNumber || DEFAULT_WHATSAPP_NUMBER
        const message = encodeURIComponent(promo.whatsappMessage)
        const url = `https://wa.me/${number}?text=${message}`
        window.open(url, '_blank')
        handleClose()
    }

    const nextPromo = () => {
        setActiveIndex((prev) => (prev + 1) % PROMOTIONS.length)
    }

    const prevPromo = () => {
        setActiveIndex((prev) => (prev - 1 + PROMOTIONS.length) % PROMOTIONS.length)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md cursor-pointer overflow-y-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-[96%] sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[94vh] my-auto bg-neutral-900 border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col cursor-auto overflow-hidden text-white"
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 z-30 p-2 text-white/90 bg-black/60 hover:bg-black/90 hover:text-white rounded-full transition-all backdrop-blur-md shadow-lg border border-white/10"
                            aria-label="Close promotion"
                        >
                            <X size={20} />
                        </button>

                        <div className="pt-3.5 px-4 sm:pt-4 sm:px-6 text-center border-b border-white/10 pb-2.5 bg-gradient-to-b from-neutral-800 to-neutral-900">
                            <span className="inline-block px-3 py-0.5 bg-[#B89146]/20 border border-[#B89146]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full mb-1">
                                Exclusive Special Offers
                            </span>
                            <h3 className="text-lg sm:text-2xl font-bold text-amber-100 font-serif">
                                Seven Seas Hotel Promotions
                            </h3>
                        </div>

                        <div className="flex md:hidden items-center justify-center gap-1.5 p-2 bg-neutral-950/60 border-b border-white/5 overflow-x-auto">
                            {PROMOTIONS.map((promo, idx) => {
                                const Icon = promo.icon
                                const isActive = activeIndex === idx
                                return (
                                    <button
                                        key={promo.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                                            isActive
                                                ? 'bg-[#B89146] text-white shadow-md'
                                                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
                                        }`}
                                    >
                                        <Icon size={13} />
                                        <span>{promo.badge}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(94vh-155px)]">
                            <div className="hidden md:grid md:grid-cols-3 gap-3.5 lg:gap-4">
                                {PROMOTIONS.map((promo, idx) => (
                                    <div
                                        key={promo.id}
                                        onClick={() => handlePromoClick(idx)}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        className="group relative flex flex-col bg-neutral-800/50 rounded-xl sm:rounded-2xl overflow-hidden border border-amber-500/20 hover:border-[#B89146] transition-all duration-300 hover:shadow-xl hover:shadow-[#B89146]/10 cursor-pointer"
                                    >
                                        <div className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-neutral-950/80 flex items-center justify-center">
                                            <Image
                                                src={promo.image}
                                                alt={promo.alt}
                                                fill
                                                sizes="(max-width: 1024px) 33vw, 380px"
                                                className="object-contain group-hover:scale-[1.03] transition-transform duration-500 p-1"
                                                priority
                                            />
                                        </div>
                                        <div className="p-3 bg-neutral-900/95 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-xs lg:text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                                                    {promo.title}
                                                </h4>
                                                <p className="text-[11px] lg:text-xs text-amber-200/80 font-medium truncate">
                                                    {promo.price}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handlePromoClick(idx)
                                                }}
                                                className="px-2.5 py-1.5 bg-[#B89146] hover:bg-[#A37F3D] text-white text-[11px] lg:text-xs font-semibold rounded-lg transition-colors shadow flex items-center gap-1 shrink-0"
                                            >
                                                <span>Book Now</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="block md:hidden">
                                <div className="relative w-full rounded-xl overflow-hidden bg-neutral-950 border border-amber-500/20 shadow-lg">
                                    <div 
                                        onClick={() => handlePromoClick(activeIndex)}
                                        className="relative w-full aspect-[4/5] cursor-pointer"
                                    >
                                        <Image
                                            src={PROMOTIONS[activeIndex].image}
                                            alt={PROMOTIONS[activeIndex].alt}
                                            fill
                                            sizes="95vw"
                                            className="object-contain p-1"
                                            priority
                                        />
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            prevPromo()
                                        }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10 shadow-lg"
                                        aria-label="Previous promotion"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            nextPromo()
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10 shadow-lg"
                                        aria-label="Next promotion"
                                    >
                                        <ChevronRight size={20} />
                                    </button>

                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                                        {PROMOTIONS.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={`h-1.5 rounded-full transition-all ${
                                                    activeIndex === idx ? 'w-6 bg-[#B89146]' : 'w-1.5 bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-2.5 p-3 bg-neutral-900/90 rounded-xl border border-white/10 flex items-center justify-between">
                                    <div className="min-w-0 flex-1 pr-2">
                                        <h4 className="text-sm font-semibold text-white truncate">
                                            {PROMOTIONS[activeIndex].title}
                                        </h4>
                                        <p className="text-xs text-amber-200/80 font-medium truncate">
                                            {PROMOTIONS[activeIndex].price}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handlePromoClick(activeIndex)}
                                        className="px-3.5 py-1.5 bg-[#B89146] hover:bg-[#A37F3D] text-white text-xs font-semibold rounded-lg transition-colors shadow flex items-center gap-1 shrink-0"
                                    >
                                        <span>Book Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 sm:p-3.5 bg-neutral-950 border-t border-white/10">
                            <button
                                onClick={() => handlePromoClick(activeIndex)}
                                className="w-full py-2.5 sm:py-3 bg-[#B89146] hover:bg-[#A37F3D] active:scale-[0.99] text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
                            >
                                <span>Chat with us on WhatsApp</span>
                                <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="group-hover:scale-110 transition-transform"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
