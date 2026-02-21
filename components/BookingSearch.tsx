"use client"

import { useState } from "react"
import { Calendar, Users, Tag, Search } from "lucide-react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

interface BookingSearchProps {
    onSearch: (params: any) => void
    initialValues?: {
        checkIn?: Date
        checkOut?: Date
        guests?: number
        rooms?: number
        promoCode?: string
    }
}

export default function BookingSearch({ onSearch, initialValues }: BookingSearchProps) {
    const [checkIn, setCheckIn] = useState<Date | undefined>(initialValues?.checkIn)
    const [checkOut, setCheckOut] = useState<Date | undefined>(initialValues?.checkOut)
    const [guests, setGuests] = useState(initialValues?.guests || 2)
    const [rooms, setRooms] = useState(initialValues?.rooms || 1)
    const [promoCode, setPromoCode] = useState(initialValues?.promoCode || "")
    const [isGuestOpen, setIsGuestOpen] = useState(false)

    const handleSearch = () => {
        onSearch({
            checkIn,
            checkOut,
            guests,
            rooms,
            promoCode
        })
    }

    // Helper to format date for display
    const formatDate = (date?: Date) => {
        if (!date) return "Select Date"
        return format(date, "dd-MM-yyyy")
    }

    // Helper to standard HTML date string
    const toInputDate = (date?: Date) => {
        if (!date) return ""
        return format(date, "yyyy-MM-dd")
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 border border-gray-100">
            {/* Check In */}
            <div className="flex-1 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check in</label>
                <div className="relative">
                    <input
                        type="date"
                        className="w-full text-gray-900 font-bold focus:outline-none cursor-pointer" // Simple native picker for now
                        value={toInputDate(checkIn)}
                        min={toInputDate(new Date())}
                        onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                    {/* Custom Overlay for better interaction if needed, but native is reliable */}
                </div>
                <div className="text-xs text-gray-400 mt-1">Flexible Dates</div>
            </div>

            {/* Check Out */}
            <div className="flex-1 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check out</label>
                <div className="relative">
                    <input
                        type="date"
                        className="w-full text-gray-900 font-bold focus:outline-none cursor-pointer"
                        value={toInputDate(checkOut)}
                        min={checkIn ? toInputDate(checkIn) : toInputDate(new Date())}
                        onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                </div>
            </div>

            {/* Room & Guests */}
            <div className="flex-1 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4 relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Room</label>
                <button
                    onClick={() => setIsGuestOpen(!isGuestOpen)}
                    className="w-full text-left font-bold text-gray-900 flex items-center justify-between"
                >
                    <span className="truncate">{rooms} Room, {guests} Adult</span>
                    <Users className="w-4 h-4 text-gray-400" />
                </button>

                <AnimatePresence>
                    {isGuestOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Rooms</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">-</button>
                                        <span className="w-4 text-center font-bold">{rooms}</span>
                                        <button onClick={() => setRooms(Math.min(10, rooms + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">+</button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Adults</span>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">-</button>
                                        <span className="w-4 text-center font-bold">{guests}</span>
                                        <button onClick={() => setGuests(Math.min(20, guests + 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">+</button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsGuestOpen(false)}
                                    className="w-full py-2 bg-black text-white rounded-lg text-sm font-bold"
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Promo Code */}
            <div className="flex-1 w-full md:w-auto pb-2 md:pb-0 md:pr-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">PromoCode</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Promo"
                        className="w-full font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                    />
                </div>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto">
                <button
                    onClick={handleSearch}
                    className="w-full md:w-auto px-8 py-4 bg-gold hover:bg-amber-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                    <span>Search</span>
                </button>
            </div>
        </div>
    )
}
