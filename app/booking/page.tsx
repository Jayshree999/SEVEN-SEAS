"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import BookingSearch from "@/components/BookingSearch"
import BookingRoomCard, { RoomType } from "@/components/BookingRoomCard"
import { fetchProperties, Property } from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Helper to map API property to RoomType
function mapPropertyToRoom(property: Property): RoomType {
    const bedrooms = typeof property.bedrooms === 'string' ? parseInt(property.bedrooms) || 1 : property.bedrooms || 1
    const guests = parseInt(property.guest_no as string) || bedrooms * 2
    const size = property.size || property.area || 0

    // Extract image URL
    let imageUrl = "/default-room.jpg"
    if (property.photos && property.photos.length > 0) {
        if (typeof property.photos[0] === 'object' && 'url' in property.photos[0]) {
            imageUrl = (property.photos[0] as { url: string }).url
        } else if (typeof property.photos[0] === 'string') {
            imageUrl = property.photos[0]
        }
    }

    let beds = '1 King Bed'
    if (property.title?.toLowerCase().includes('twin')) {
        beds = '2 Twin Beds'
    }

    return {
        id: property._id || property.id || '',
        name: property.title || property.name || 'Untitled Room',
        image: imageUrl,
        size: size,
        guests: guests,
        beds: beds,
        description: property.description || "Experience luxury and comfort in our thoughtfully designed rooms.",
        price: property.price || 0,
        originalPrice: property.originalPrice || 0,
        breakfastPrice: property.breakfastPrice || 0
    }
}

export default function BookingPage() {
    const router = useRouter()
    const [rooms, setRooms] = useState<RoomType[]>([])
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState<Record<string, { qty: number, breakfast: boolean }>>({})
    const [showCart, setShowCart] = useState(false)

    useEffect(() => {
        async function loadRooms() {
            try {
                const response = await fetchProperties({ limit: 50, activeStatus: true })
                if (response.data?.properties) {
                    setRooms(response.data.properties.map(mapPropertyToRoom))
                }
            } catch (error) {
                console.error("Failed to load rooms", error)
                toast.error("Failed to load room availability")
            } finally {
                setLoading(false)
            }
        }
        loadRooms()
    }, [])

    const handleSearch = (params: any) => {
        console.log("Search params:", params)
        toast.info("Updating availability...")
        // In a real app, we would refetch with these params
    }

    const handleQuantityChange = (roomId: string, qty: number) => {
        setCart(prev => ({
            ...prev,
            [roomId]: {
                qty,
                breakfast: prev[roomId]?.breakfast || false
            }
        }))
    }

    const handleBreakfastChange = (roomId: string, breakfast: boolean) => {
        setCart(prev => ({
            ...prev,
            [roomId]: {
                qty: prev[roomId]?.qty || 0,
                breakfast
            }
        }))
    }

    const handleBookNow = (roomId: string) => {
        // If quantity is 0, set to 1
        if ((cart[roomId]?.qty || 0) === 0) {
            handleQuantityChange(roomId, 1)
        }
        setShowCart(true)
        toast.success("Room added to selection")
    }

    const getTotalPrice = () => {
        return Object.entries(cart).reduce((total, [roomId, info]) => {
            const room = rooms.find(r => r.id === roomId)
            if (!room) return total
            const price = room.price + (info.breakfast ? (room.breakfastPrice || 0) : 0)
            return total + (price * info.qty)
        }, 0)
    }

    const getTotalRooms = () => {
        return Object.values(cart).reduce((sum, info) => sum + info.qty, 0)
    }

    const handleProceedToCheckout = () => {
        // Save cart to local storage
        localStorage.setItem("sevenseas_cart", JSON.stringify(cart))

        toast.success(`Proceeding to checkout for ${getTotalRooms()} rooms`)
        router.push("/checkout")
    }

    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <Navigation />

            {/* Hero / Search Section */}
            <div className="bg-charcoal text-white pt-32 pb-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left" style={{ fontFamily: 'var(--font-playfair)' }}>
                        Seven Seas Hotel - Dubai
                    </h1>
                    <BookingSearch onSearch={handleSearch} />
                </div>
            </div>

            {/* Room List */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-gold" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {rooms.map(room => (
                            <BookingRoomCard
                                key={room.id}
                                room={room}
                                quantity={cart[room.id]?.qty || 0}
                                includeBreakfast={cart[room.id]?.breakfast || false}
                                onQuantityChange={(qty) => handleQuantityChange(room.id, qty)}
                                onBreakfastChange={(include) => handleBreakfastChange(room.id, include)}
                                onBookNow={() => handleBookNow(room.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Footer />

            {/* Floating Cart Summary */}
            <AnimatePresence>
                {getTotalRooms() > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 px-4 py-4 md:px-8"
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-black text-white p-3 rounded-full">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-lg">{getTotalRooms()} Rooms Selected</div>
                                    <div className="text-sm text-gray-500">Total: <span className="font-bold text-black">{getTotalPrice().toLocaleString()} AED</span></div>
                                </div>
                            </div>

                            <button
                                onClick={handleProceedToCheckout}
                                className="bg-gold hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg uppercase tracking-wider transition-colors shadow-lg"
                            >
                                Proceed to Book
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
