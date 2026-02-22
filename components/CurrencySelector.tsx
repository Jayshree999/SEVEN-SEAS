'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useCurrency, SUPPORTED_CURRENCIES } from '@/contexts/CurrencyContext'

export default function CurrencySelector() {
    const { currency, setCurrency } = useCurrency()
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on click outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(v => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
                aria-label="Select currency"
            >
                <Globe className="w-3.5 h-3.5 opacity-70" />
                <span className="hidden sm:inline">{currency.flag}</span>
                <span className="font-semibold tracking-wide">{currency.code}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 z-[200] bg-[#0f1623] border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[220px]"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-white/10">
                            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">Select Currency</p>
                        </div>

                        {/* Currency list */}
                        <div className="max-h-72 overflow-y-auto py-1.5">
                            {SUPPORTED_CURRENCIES.map((c) => (
                                <button
                                    key={c.code}
                                    onClick={() => {
                                        setCurrency(c)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${c.code === currency.code
                                            ? 'bg-amber-500/10 text-amber-400'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="text-base w-6 text-center">{c.flag}</span>
                                    <span className="font-semibold w-10 text-left">{c.code}</span>
                                    <span className="text-white/40 flex-1 text-left text-xs">{c.name}</span>
                                    {c.code === currency.code && (
                                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer note */}
                        <div className="px-4 py-2.5 border-t border-white/10">
                            <p className="text-[10px] text-white/25 text-center">Prices converted from AED</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
