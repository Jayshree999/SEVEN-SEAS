"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { fetchPropertyById, Property } from "@/lib/api"
import { Loader2, Trash2, ArrowLeft, CreditCard, ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

interface CartItem {
    roomId: string
    quantity: number
    property?: Property
}

export default function CheckoutPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { user, isAuth } = useAuth()
    const [loading, setLoading] = useState(true)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [processing, setProcessing] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialRequests: ""
    })

    useEffect(() => {
        // In a real app, cart should be in a global context or local storage.
        // For this demo, we'll try to parse from URL or just show a fallback if empty
        // Revamped approach: We will read from localStorage if we implemented it there, 
        // but we didn't. So for now let's assume we pass data via a global state mechanism 
        // or just mock it if refreshed. 
        // BETTER: Let's use localStorage in the BookingPage to save the cart, and read it here.

        const savedCart = localStorage.getItem("sevenseas_cart")
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart)
                loadCartDetails(parsed)
            } catch (e) {
                console.error("Failed to parse cart", e)
                setLoading(false)
            }
        } else {
            setLoading(false)
        }

        if (user) {
            // Safe access to user properties with fallback
            const fullName = (user as any).fullName || "";
            const nameParts = fullName.split(" ");

            setFormData(prev => ({
                ...prev,
                firstName: (user as any).firstName || nameParts[0] || "",
                lastName: (user as any).lastName || nameParts.slice(1).join(" ") || "",
                email: (user as any).email || "",
                phone: (user as any).phone || ""
            }))
        }
    }, [user])

    const loadCartDetails = async (cartData: Record<string, number>) => {
        try {
            setLoading(true)
            const items: CartItem[] = []

            for (const [roomId, qty] of Object.entries(cartData)) {
                if (qty > 0) {
                    const property = await fetchPropertyById(roomId)
                    if (property) {
                        items.push({
                            roomId,
                            quantity: qty,
                            property
                        })
                    }
                }
            }

            setCartItems(items)
        } catch (error) {
            console.error("Error loading cart details", error)
            toast.error("Failed to load cart details")
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = (roomId: string) => {
        const newItems = cartItems.filter(item => item.roomId !== roomId)
        setCartItems(newItems)

        // Update local storage
        const newCart: Record<string, number> = {}
        newItems.forEach(item => newCart[item.roomId] = item.quantity)
        localStorage.setItem("sevenseas_cart", JSON.stringify(newCart))

        if (newItems.length === 0) {
            toast.info("Cart is empty")
            router.push("/booking")
        }
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + ((item.property?.price || 0) * item.quantity)
        }, 0)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
            toast.error("Please fill in all required fields")
            return
        }

        setProcessing(true)

        try {
            // Construct the payload for the bulk-booking endpoint
            const bookings = cartItems.flatMap(item => {
                // Create an array of bookings based on quantity
                return Array(item.quantity).fill(null).map(() => ({
                    property: item.roomId,
                    checkIn: new Date().toISOString(), // Default to today/tmrw for now - needs date picker integration
                    checkOut: new Date(Date.now() + 86400000).toISOString(),
                    guest: 2, // Default
                    bookingType: "daily",
                    // Pass user details if needed by backend for guest info
                }))
            })

            const payload = {
                bookings,
                user: user ? { ...user, ...formData } : formData,
                totalAmount: calculateTotal()
            }

            console.log("Submitting order:", payload)

            const authToken = localStorage.getItem('auth_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/bulk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(authToken ? { "Authorization": `Bearer ${authToken}` } : {})
                },
                body: JSON.stringify(payload)
            })

            const data = await response.json()

            if (!response.ok) {
                // Handle specific error messages from backend
                throw new Error(data.message || "Booking failed")
            }

            toast.success("Order placed successfully! Redirecting to payment...")

            // Clear cart
            localStorage.removeItem("sevenseas_cart")

            // Redirect to payment gateway
            if (data.data?.checkoutUrl) {
                window.location.href = data.data.checkoutUrl
            } else {
                router.push("/payment/success") // Fallback
            }

        } catch (error: any) {
            console.error("Checkout error", error)
            toast.error(error.message || "Checkout failed. Please try again.")
        } finally {
            setProcessing(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-gold" />
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50 font-sans">
            <Navigation />

            <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Booking
                </button>

                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Checkout
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Form */}
                    <div className="flex-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-xl font-bold mb-4">Guest Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Special Requests</label>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none h-24"
                                        value={formData.specialRequests}
                                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gold/20 sticky top-32">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-gold" /> Order Summary
                            </h2>

                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 py-4 text-center">Your cart is empty</p>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.roomId} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.property?.photos?.[0] as string || "/default-room.jpg"}
                                                    alt={item.property?.title}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm text-gray-900 truncate">{item.property?.title}</h4>
                                                <div className="text-xs text-gray-500 mb-1">
                                                    {item.quantity} x {item.property?.price} AED
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-sm">{(item.property?.price || 0) * item.quantity} AED</span>
                                                    <button
                                                        onClick={() => handleRemove(item.roomId)}
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>{calculateTotal()} AED</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Taxes & Fees (Included)</span>
                                            <span>0 AED</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                                            <span>Total</span>
                                            <span>{calculateTotal()} AED</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="w-full py-4 bg-black text-white font-bold rounded-lg uppercase tracking-wider hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-5 h-5" /> Pay Now
                                            </>
                                        )}
                                    </button>
                                    <p className="text-xs text-center text-gray-400 mt-2">
                                        Secure Payment via Network International
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
