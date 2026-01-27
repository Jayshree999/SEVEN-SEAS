'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'
import { getMyAddonBookings, completeAddonPayment } from '@/lib/addonService'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ArrowLeft, Clock, Calendar, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

function AddonBookingsContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { isAuth, loading: authLoading } = useAuth()
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [processingId, setProcessingId] = useState<string | null>(null)

    useEffect(() => {
        // Handle payment redirects
        const status = searchParams.get('status')
        const bookingId = searchParams.get('bookingId')

        if (status === 'success' && bookingId) {
            toast.success('Payment successful! Your booking is confirmed.')
            // Clear params from URL
            router.replace('/profile/addon-bookings')
        }
    }, [searchParams, router])

    useEffect(() => {
        if (!authLoading && !isAuth) {
            router.push('/login')
            return
        }

        if (isAuth) {
            fetchBookings()
        }
    }, [isAuth, authLoading, router])

    const fetchBookings = async () => {
        try {
            setLoading(true)
            const response = await getMyAddonBookings()
            setBookings(response.data?.bookings || [])
        } catch (error) {
            console.error('Error fetching bookings:', error)
            toast.error('Failed to load your bookings')
        } finally {
            setLoading(false)
        }
    }

    const handlePayment = async (bookingId: string) => {
        try {
            toast.loading('Initiating payment...')
            setProcessingId(bookingId)
            const response = await completeAddonPayment(bookingId)
            if (response.data?.checkoutUrl) {
                toast.dismiss()
                window.location.href = response.data.checkoutUrl
            } else {
                toast.dismiss()
                toast.error('Failed to get payment link')
            }
        } catch (error) {
            toast.dismiss()
            console.error('Payment error:', error)
            toast.error('Failed to initiate payment')
        } finally {
            setProcessingId(null)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-800'
            case 'confirmed': return 'bg-blue-100 text-blue-800'
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            case 'refunded': return 'bg-gray-100 text-gray-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return <CheckCircle className="w-5 h-5" />
            case 'confirmed': return <CheckCircle className="w-5 h-5" />
            case 'pending': return <Clock className="w-5 h-5" />
            case 'cancelled': return <XCircle className="w-5 h-5" />
            default: return <AlertCircle className="w-5 h-5" />
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navigation />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="mb-8 flex items-center gap-4">
                    <button
                        onClick={() => router.push('/profile')}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Experiences</h1>
                        <p className="text-gray-500">Manage your dining reservations and activity bookings</p>
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            You haven't booked any experiences yet. Explore our dining and wellness options to get started.
                        </p>
                        <Link href="/addons">
                            <button className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors shadow-sm hover:shadow-md">
                                Browse Experiences
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        <AnimatePresence>
                            {bookings.map((booking, index) => (
                                <motion.div
                                    key={booking._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                        {/* Image */}
                                        <div className="relative w-full lg:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            {booking.addon?.images?.[0]?.url ? (
                                                <img
                                                    src={booking.addon.images[0].url}
                                                    alt={booking.addon.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Calendar className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                        {booking.addon?.name || 'Unknown Experience'}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {booking.property?.title || 'Seven Seas Hotel'}
                                                    </p>
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium ${getStatusColor(booking.status)}`}>
                                                    {getStatusIcon(booking.status)}
                                                    <span className="capitalize">{booking.status}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                                                    <p className="font-semibold text-gray-900">{formatDate(booking.bookingDate)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {booking.timeSlot ?
                                                            `${booking.timeSlot.startTime} - ${booking.timeSlot.endTime}` :
                                                            'All Day'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Guests/Qty</p>
                                                    <p className="font-semibold text-gray-900">{booking.quantity} Person(s)</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                                                    <p className="font-semibold text-amber-600">
                                                        {booking.addon?.pricing?.currency || 'AED'} {booking.finalAmount}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer / Actions */}
                                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            Booking Ref: <span className="font-mono text-gray-900">{booking._id.slice(-8).toUpperCase()}</span>
                                        </p>

                                        {booking.status === 'pending' && booking.paymentStatus === 'pending' && (
                                            <button
                                                onClick={() => handlePayment(booking._id)}
                                                disabled={processingId === booking._id}
                                                className="px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                            >
                                                {processingId === booking._id ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    'Complete Payment'
                                                )}
                                            </button>
                                        )}

                                        {['confirmed', 'pending'].includes(booking.status.toLowerCase()) && (
                                            <button className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors">
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}

export default function AddonBookingsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        }>
            <AddonBookingsContent />
        </Suspense>
    )
}
