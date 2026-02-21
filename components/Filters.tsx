'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, Users, DollarSign, ArrowUpDown } from 'lucide-react'
import { PropertyFilters } from '@/lib/api'

interface FiltersProps {
    onFilterChange: (filters: PropertyFilters) => void
    onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void
    initialFilters?: PropertyFilters
    initialSortBy?: string
    initialSortOrder?: 'asc' | 'desc'
}



const SORT_OPTIONS = [
    { label: 'Newest Arrivals', sortBy: 'createdAt', sortOrder: 'desc' },
    { label: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
    { label: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
    { label: 'Guest Capacity', sortBy: 'guest_no', sortOrder: 'desc' },
]

export default function Filters({
    onFilterChange,
    onSortChange,
    initialFilters = {},
    initialSortBy = 'createdAt',
    initialSortOrder = 'desc'
}: FiltersProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [filters, setFilters] = useState<PropertyFilters>(initialFilters)
    const [currentSort, setCurrentSort] = useState({ sortBy: initialSortBy, sortOrder: initialSortOrder })

    const handleApply = () => {
        onFilterChange(filters)
        setIsOpen(false)
    }

    const handleReset = () => {
        const resetFilters: PropertyFilters = {}
        setFilters(resetFilters)
        onFilterChange(resetFilters)
        setCurrentSort({ sortBy: 'createdAt', sortOrder: 'desc' })
        onSortChange('createdAt', 'desc')
        setIsOpen(false)
    }

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const option = SORT_OPTIONS.find(opt => opt.label === e.target.value)
        if (option) {
            const newSort = { sortBy: option.sortBy, sortOrder: option.sortOrder as 'asc' | 'desc' }
            setCurrentSort(newSort)
            onSortChange(newSort.sortBy, newSort.sortOrder)
        }
    }


    // Update filters state when initialFilters changes
    useEffect(() => {
        setFilters(initialFilters)
    }, [initialFilters])

    const hasActiveFilters = Object.values(filters).some(v =>
        v !== undefined && v !== null && v !== '' && (Array.isArray(v) ? v.length > 0 : true)
    )

    return (
        <div className="w-full mb-6">
            <div className="flex flex-col md:flex-row gap-4">

                {/* Sorting Select */}
                <div className="relative flex-1">
                    <select
                        value={SORT_OPTIONS.find(opt => opt.sortBy === currentSort.sortBy && opt.sortOrder === currentSort.sortOrder)?.label || 'Newest Arrivals'}
                        onChange={handleSortChange}
                        className="w-full bg-stone-50 border border-gold/20 rounded-xl py-4 pl-4 pr-10 focus:outline-none focus:border-gold/50 transition-all font-bold text-xs uppercase tracking-widest text-charcoal shadow-sm appearance-none cursor-pointer"
                    >
                        {SORT_OPTIONS.map(opt => (
                            <option key={opt.label} value={opt.label}>{opt.label}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                        <ArrowUpDown className="w-4 h-4" />
                    </div>
                </div>

                {/* Filter Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center gap-3 bg-charcoal text-white px-8 py-4 rounded-xl hover:bg-gold transition-all shadow-lg group"
                >
                    <SlidersHorizontal className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="font-bold uppercase tracking-widest text-xs">Advanced Filters</span>
                    {hasActiveFilters && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                    )}
                </button>

                {/* Quick Clear (if filters active) */}
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 transition-colors px-4 group"
                    >
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Clear</span>
                    </button>
                )}
            </div>

            {/* Advanced Filter Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden bg-white rounded-2xl shadow-2xl border border-gold/10"
                    >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Price Range */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gold mb-2">
                                    <DollarSign className="w-4 h-4" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal opacity-60">Price Range (AED)</h4>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice || ''}
                                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                                        className="w-full bg-stone-50 border border-gold/10 rounded-lg p-3 text-sm focus:outline-none focus:border-gold/30"
                                    />
                                    <span className="text-gold opacity-40">—</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice || ''}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                                        className="w-full bg-stone-50 border border-gold/10 rounded-lg p-3 text-sm focus:outline-none focus:border-gold/30"
                                    />
                                </div>
                            </div>

                            {/* Guest Occupancy */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gold mb-2">
                                    <Users className="w-4 h-4" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-charcoal opacity-60">Minimum Occupancy</h4>
                                </div>
                                <div className="space-y-3">
                                    <select
                                        value={filters.guest_no || ''}
                                        onChange={(e) => setFilters({ ...filters, guest_no: e.target.value })}
                                        className="w-full bg-stone-50 border border-gold/10 rounded-lg p-3 text-sm focus:outline-none focus:border-gold/30 accent-gold appearance-none cursor-pointer"
                                    >
                                        <option value="">Any Guests</option>
                                        {[1, 2, 3, 4, 5, 6].map(n => (
                                            <option key={n} value={n.toString()}>{n} {n === 1 ? 'Guest' : 'Guests'}+</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>

                        {/* Action Bar */}
                        <div className="bg-stone-50 px-6 py-4 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Refine your search for the ultimate Dubai sanctuary.</p>
                            <div className="flex gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 sm:flex-none text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-charcoal transition-colors py-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="flex-1 sm:flex-none bg-gold text-white px-12 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gold/10 hover:shadow-gold/20 hover:scale-105 transition-all active:scale-95"
                                >
                                    Reveal Results
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
