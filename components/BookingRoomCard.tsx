"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Bed, Home, Info, ChevronRight, Check } from "lucide-react"
import { motion } from "framer-motion"

export interface RoomType {
    id: string
    name: string
    image: string
    size: number
    guests: number
    beds: string
    description: string
    price: number
    originalPrice?: number
    breakfastPrice?: number
}

interface BookingRoomCardProps {
    room: RoomType
    quantity: number
    includeBreakfast: boolean
    onQuantityChange: (qty: number) => void
    onBreakfastChange: (include: boolean) => void
    onBookNow: () => void
}

export default function BookingRoomCard({ room, quantity, includeBreakfast, onQuantityChange, onBreakfastChange, onBookNow }: BookingRoomCardProps) {
    const [showMore, setShowMore] = useState(false)

    const currentPrice = room.price + (includeBreakfast ? (room.breakfastPrice || 0) : 0)
    const discountPercent = room.originalPrice && room.originalPrice > room.price
        ? Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)
        : 0

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="md:w-1/3 lg:w-1/4 relative min-h-[240px] md:min-h-0">
                {discountPercent > 0 && (
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
                        {discountPercent}% OFF
                    </div>
                )}
                <Image
                    src={room.image || "/default-room.jpg"}
                    alt={room.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                    {/* Dots for slider indicator (mock) */}
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white/50"></div>
                    <div className="w-2 h-2 rounded-full bg-white/50"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                            {room.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span className="font-bold">{room.guests}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                                <span className="font-bold">{room.size.toFixed(2)} sq mtr</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {room.description}
                    </p>

                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-amber-600 text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                        More Info <ChevronRight className="w-3 h-3" />
                    </button>

                    <div className="flex flex-col gap-3 pt-2">
                        <div className="flex items-center gap-2 text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100 w-fit">
                            <Check className="w-3 h-3" />
                            Best Available Rate
                        </div>

                        {room.breakfastPrice !== undefined && room.breakfastPrice > 0 && (
                            <div
                                onClick={() => onBreakfastChange(!includeBreakfast)}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${includeBreakfast ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-200'}`}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeBreakfast ? 'bg-amber-500 border-amber-500' : 'bg-white border-gray-300'}`}>
                                    {includeBreakfast && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-bold text-gray-900">Add Breakfast</div>
                                    <div className="text-xs text-gray-500">+ AED {room.breakfastPrice} / per night</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pricing & Action Section */}
                <div className="md:w-64 flex flex-col justify-between border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
                    <div className="space-y-1 text-right md:text-left">
                        {room.originalPrice !== undefined && room.originalPrice > 0 && (
                            <div className="text-sm text-gray-400 line-through font-medium">AED {room.originalPrice + (includeBreakfast ? (room.breakfastPrice || 0) : 0)}</div>
                        )}
                        <div className="flex items-baseline justify-end md:justify-start gap-1">
                            <span className="text-sm font-bold text-gray-500">AED</span>
                            <span className="text-2xl font-bold text-gray-900">{currentPrice}</span>
                        </div>
                        <div className="text-xs text-gray-500">Rate per Night</div>
                        <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded inline-block">Tax Inclusive</div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <label className="text-sm font-bold text-gray-700">Room</label>
                            <select
                                value={quantity}
                                onChange={(e) => onQuantityChange(Number(e.target.value))}
                                className="flex-1 p-2 border border-gray-300 rounded font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                                {[0, 1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={onBookNow}
                            className={`w-full py-3 rounded font-bold uppercase tracking-wider transition-all duration-300 ${quantity > 0
                                ? "bg-black text-white hover:bg-gray-800 shadow-lg"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
