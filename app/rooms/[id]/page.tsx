'use client'

import { use, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { PropertyInfo } from '@/components/property/PropertyInfo'
import { PropertyAmenities } from '@/components/property/PropertyAmenities'
import { PropertyPolicies } from '@/components/property/PropertyPolicies'
import { PropertyReviews } from '@/components/property/PropertyReviews'
import { fetchPropertyById, Property } from '@/lib/api'
import { getMonthlyRent, getYearlyRent } from '@/lib/booking'
import { MapPin, Star, TrendingUp, Sparkles, Home, Users, Car, Clock, Shield, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface PageProps {
  params: Promise<{ id: string }> | { id: string }
}

// Helper function to format price
const formatPrice = (price: number) => {
  if (!price || price === 0) return null
  // Validate price - if unreasonably high, return null
  if (price > 100000) return null
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const PropertyDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="space-y-8 pt-24">
        <div className="h-[65vh] bg-gray-200 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function PropertyPage({ params }: PageProps) {
  // Handle both Promise and direct object for compatibility
  let resolvedParams: { id: string }
  if (params && typeof params === 'object' && 'then' in params) {
    resolvedParams = use(params as Promise<{ id: string }>)
  } else {
    resolvedParams = params as { id: string }
  }

  const [property, setProperty] = useState<Property | null>(null)
  const [monthlyRent, setMonthlyRent] = useState<number>(0)
  const [yearlyRent, setYearlyRent] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Animation refs
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [amenitiesRef, amenitiesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [bookingRef, bookingInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const fetchedProperty = await fetchPropertyById(resolvedParams.id)
        setProperty(fetchedProperty)

        // Load monthly and yearly rent
        if (fetchedProperty?._id) {
          try {
            const monthly = await getMonthlyRent(fetchedProperty._id)
            const yearly = await getYearlyRent(fetchedProperty._id)
            setMonthlyRent(monthly > 0 ? monthly : (fetchedProperty?.monthlyRent || 0))
            setYearlyRent(yearly > 0 ? yearly : (fetchedProperty?.yearlyRent || 0))
          } catch (err) {
            console.error('Error loading rent prices:', err)
            setMonthlyRent(fetchedProperty?.monthlyRent || 0)
            setYearlyRent(fetchedProperty?.yearlyRent || 0)
          }
        } else {
          setMonthlyRent(fetchedProperty?.monthlyRent || 0)
          setYearlyRent(fetchedProperty?.yearlyRent || 0)
        }
      } catch (err: any) {
        console.error('Error loading property:', err)
        setError(err.message || 'Failed to load property details')
      } finally {
        setIsLoading(false)
      }
    }

    loadProperty()
  }, [resolvedParams.id])

  // Show loading state
  if (isLoading) {
    return <PropertyDetailsSkeleton />
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Property</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
              >
                Try Again
              </motion.button>
              <Link
                href="/rooms"
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Browse Rooms
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show not found state if property doesn't exist
  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Property Not Found</h2>
            <p className="text-gray-600 mb-4">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link
                href="/rooms"
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
              >
                Browse Properties
              </Link>
              <Link
                href="/"
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  // Calculate property age (new if less than 30 days old)
  const isNewProperty = property?.createdAt
    ? Date.now() - new Date(property.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000
    : false

  // Booking statistics
  const totalBookings = property?.bookingInfo?.totalBookings || 0
  const isPopular = totalBookings >= 5
  const totalRevenue = property?.bookingInfo?.totalRevenue || 0

  const dailyPrice = formatPrice(property?.price || 0)
  const monthlyPrice = formatPrice(monthlyRent || property?.monthlyRent || 0)
  const yearlyPrice = formatPrice(yearlyRent || property?.yearlyRent || 0)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="mx-auto pt-20 sm:pt-24">
        {/* Gallery Section with Parallax */}
        <motion.div
          style={{ opacity }}
          className="relative"
        >
          {/* Property Type Badges Overlay - Only Popular */}
          <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 flex flex-col gap-2">
            {isPopular && (
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-orange-600/90 backdrop-blur-md text-white font-semibold px-4 py-2 rounded-lg shadow-xl border border-orange-400/50 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Popular
              </motion.span>
            )}
          </div>
          <PropertyGallery images={property?.photos} propertyData={property} />
        </motion.div>

        {/* Main Content Section */}
        <div className="mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 md:py-12 pb-[calc(180px+1rem)] lg:pb-12">
          <div className="grid gap-6 sm:gap-8 lg:gap-x-16 lg:grid-cols-[1fr,400px]">
            {/* Left Column - Property Details */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {/* Property Info */}
              <motion.div
                ref={infoRef}
                initial={{ opacity: 0, y: 30 }}
                animate={infoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <PropertyInfo
                  title={property?.title || property?.name || 'Property'}
                  location={
                    typeof property?.address === 'string'
                      ? property.address
                      : property?.address?.address || property?.city || 'Location not available'
                  }
                  description={property?.description}
                  beds={property?.roomType || property?.category}
                  baths={property?.washRoom}
                  guests={property?.guest_no}
                  size={property?.size}
                  bedrooms={property?.bedrooms}
                  propertyId={property?._id || ''}
                  createdAt={property?.createdAt}
                  price={property?.price}
                  monthlyRent={monthlyRent || property?.monthlyRent}
                  yearlyRent={yearlyRent || property?.yearlyRent}
                  dailyPrices={property?.dailyPrices}
                />
              </motion.div>

              {/* Ultra-Premium Property Details Card */}
              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-white via-slate-50 to-white border-2 border-amber-200/40 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
              >
                {/* Ultra-Premium Property Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                  {property?.size && (
                    <motion.div
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="flex flex-col items-center text-center gap-3 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 border-2 border-amber-200/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-xl">
                        <Home className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-black text-gray-900">{property.size.toLocaleString()}</p>
                        <p className="text-xs sm:text-sm text-gray-600 font-bold uppercase tracking-wider mt-1">sqft</p>
                      </div>
                    </motion.div>
                  )}
                  {property?.guest_no && (
                    <motion.div
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="flex flex-col items-center text-center gap-3 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50 border-2 border-blue-200/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl">
                        <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-black text-gray-900">{property.guest_no}</p>
                        <p className="text-xs sm:text-sm text-gray-600 font-bold uppercase tracking-wider mt-1">Guests</p>
                      </div>
                    </motion.div>
                  )}
                  {property?.parking && (
                    <motion.div
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="flex flex-col items-center text-center gap-3 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-green-50 via-green-100/50 to-green-50 border-2 border-green-200/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-xl">
                        <Car className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-black text-gray-900">{property.parking}</p>
                        <p className="text-xs sm:text-sm text-gray-600 font-bold uppercase tracking-wider mt-1">Parking</p>
                      </div>
                    </motion.div>
                  )}
                  {(property?.Check_in_time || property?.Check_out_time) && (
                    <motion.div
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="flex flex-col items-center text-center gap-3 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-purple-100/50 to-purple-50 border-2 border-purple-200/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-xl">
                        <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-base font-black text-gray-900 leading-tight">
                          {property.Check_in_time || 'N/A'}
                        </p>
                        <p className="text-xs text-gray-500 font-semibold">to</p>
                        <p className="text-sm sm:text-base font-black text-gray-900 leading-tight">
                          {property.Check_out_time || 'N/A'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Ultra-Premium Booking Statistics */}
                {(isPopular || totalBookings > 0) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 }}
                    className="p-6 sm:p-8 bg-gradient-to-r from-amber-50 via-amber-100/60 to-orange-50 rounded-2xl border-2 border-amber-300/50 shadow-xl"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="p-3 sm:p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-2xl flex-shrink-0">
                          <Star className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white drop-shadow-lg" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-lg sm:text-xl font-black text-gray-900">
                            {totalBookings} {totalBookings === 1 ? 'Booking' : 'Bookings'}
                          </p>
                          {totalRevenue > 0 && (
                            <p className="text-sm sm:text-base text-gray-700 font-bold truncate mt-1">
                              Revenue: {totalRevenue.toLocaleString()} AED
                            </p>
                          )}
                        </div>
                      </div>
                      {isPopular && (
                        <motion.span
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-2xl flex-shrink-0 border-2 border-orange-400/50"
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span className="hidden xs:inline tracking-wide">POPULAR</span>
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <div className="border-t border-gray-200"></div>

              {/* Amenities */}
              <motion.div
                ref={amenitiesRef}
                initial={{ opacity: 0, y: 30 }}
                animate={amenitiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <PropertyAmenities amenities={property?.amenities || []} />
              </motion.div>

              {/* Policies */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={amenitiesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <PropertyPolicies data={property} />
              </motion.div>
            </div>

            {/* Right Column - Desktop Booking Card */}
            <div className="w-full lg:w-[400px] relative hidden lg:block">
              <motion.div
                ref={bookingRef}
                initial={{ opacity: 0, x: 30 }}
                animate={bookingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-20"
              >
                <div className="bg-gradient-to-br from-white via-amber-50/20 to-white border-2 border-amber-200/40 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="p-8 sm:p-10">
                    {/* Ultra-Premium Price Section */}
                    <div className="mb-8 pb-8 border-b-2 border-gradient-to-r from-transparent via-amber-300/40 to-transparent">
                      {dailyPrice ? (
                        <>
                          <div className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
                            <span className="text-2xl font-bold text-amber-700">AED</span> {dailyPrice}
                          </div>
                          <div className="text-gray-600 font-bold text-base uppercase tracking-wider">per night</div>
                        </>
                      ) : (
                        <div className="text-3xl font-black text-gray-900 mb-2">Contact for Pricing</div>
                      )}
                    </div>

                    <BookingModal
                      roomId={property?._id || property?.id || resolvedParams.id}
                      roomName={property?.title || property?.name || 'Property'}
                      price={property?.price || 0}
                      monthlyRent={monthlyRent}
                      yearlyRent={yearlyRent}
                      property={property}
                    />

                    {/* Ultra-Premium Trust Badges */}
                    <div className="mt-8 pt-8 border-t-2 border-amber-200/40">
                      <div className="space-y-4">
                        {[
                          { icon: Shield, text: 'Free cancellation', color: 'green' },
                          { icon: CheckCircle2, text: 'No prepayment needed', color: 'blue' },
                          { icon: Star, text: 'Best price guarantee', color: 'amber' },
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={bookingInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            whileHover={{ scale: 1.03, x: 5 }}
                            className={`flex items-center gap-4 text-sm font-bold text-gray-800 p-3 rounded-xl bg-gradient-to-r ${item.color === 'green' ? 'from-green-50 to-green-100/50 border border-green-200/50' :
                                item.color === 'blue' ? 'from-blue-50 to-blue-100/50 border border-blue-200/50' :
                                  'from-amber-50 to-amber-100/50 border border-amber-200/50'
                              } shadow-sm hover:shadow-md transition-all duration-300`}
                          >
                            <div className={`p-2 rounded-lg shadow-lg ${item.color === 'green' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                                item.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                  'bg-gradient-to-br from-amber-500 to-amber-600'
                              }`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span>{item.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Full Width Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-t border-gray-200 my-8 sm:my-12 md:my-16"
          >
            <div id="reviews" className="scroll-mt-20 sm:scroll-mt-24">
              <PropertyReviews propertyId={property?._id} />
            </div>
          </motion.div>

          {/* Full Width Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-t border-gray-200 my-8 sm:my-12 md:my-16"
          >
            <div className="bg-white border-2 border-gray-200 shadow-xl rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 sm:p-3 bg-amber-100 rounded-lg sm:rounded-xl flex-shrink-0">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
                        Where you'll be
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 line-clamp-2">
                        {typeof property?.address === 'string'
                          ? property.address
                          : property?.address?.address || property?.city || 'Dubai, UAE'}
                      </p>
                    </div>
                  </div>
                  {typeof property?.address === 'object' &&
                    property?.address?.latitude &&
                    property?.address?.longitude && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const addr = property.address
                          if (typeof addr === 'object' && addr?.latitude && addr?.longitude) {
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${addr.latitude},${addr.longitude}`,
                              '_blank',
                            )
                          }
                        }}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
                      >
                        <MapPin className="w-4 h-4" />
                        Get Directions
                      </motion.button>
                    )}
                </div>

                <div className="aspect-[16/6] w-full rounded-xl overflow-hidden border-2 border-gray-200 relative shadow-lg">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${typeof property?.address === 'object' && property?.address?.latitude
                      ? property.address.latitude
                      : '3610.178787593566'
                      }!2d${typeof property?.address === 'object' && property?.address?.longitude ? property.address.longitude : '55.2707828'}!3d${typeof property?.address === 'object' && property?.address?.latitude
                        ? property.address.latitude
                        : '25.197197'
                      }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x${typeof property?.address === 'object' && property?.address?.latitude
                        ? property.address.latitude
                        : '0'
                      }%3A0x${typeof property?.address === 'object' && property?.address?.longitude
                        ? property.address.longitude
                        : '0'
                      }!2s${encodeURIComponent(
                        typeof property?.address === 'string'
                          ? property.address
                          : property?.address?.address || 'Dubai',
                      )}!5e0!3m2!1sen!2sae!4v1644856015000!5m2!1sen!2sae&markers=color:amber%7C${typeof property?.address === 'object' && property?.address?.latitude
                        ? property.address.latitude
                        : '25.197197'
                      },${typeof property?.address === 'object' && property?.address?.longitude ? property.address.longitude : '55.2707828'}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  />

                  {/* Custom Marker Overlay */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="relative"
                    >
                      <MapPin className="w-12 h-12 text-amber-600 drop-shadow-2xl" />
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-4 h-4 bg-amber-600 rounded-full animate-ping" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Booking Card - Fixed Bottom */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl safe-area-inset-bottom"
      >
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              {dailyPrice ? (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500">AED</span>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{dailyPrice}</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">per night</p>
                </>
              ) : (
                <p className="text-base sm:text-lg font-bold text-gray-900">Contact for Pricing</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <BookingModal
                roomId={property?._id || property?.id || resolvedParams.id}
                roomName={property?.title || property?.name || 'Property'}
                price={property?.price || 0}
                monthlyRent={monthlyRent}
                yearlyRent={yearlyRent}
                property={property}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <div className="h-[90px] sm:h-[100px] lg:h-0" />

      <Footer />
    </div>
  )
}
