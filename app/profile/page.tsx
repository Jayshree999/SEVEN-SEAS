'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { updateProfile, getCurrentUserProfile, toggleWatchlist, getUserBookings, type UserProfile, type Booking, type UserBookings } from '@/lib/user'
import { uploadImageToCloudinary } from '@/lib/cloudinary'
import { fetchProperties, type Property, makeRoomSlug } from '@/lib/api'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import SSCoinsWallet from '@/components/SSCoinsWallet'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

type TabType = 'bookings' | 'saved' | 'history' | 'rewards'

export default function ProfilePage() {
  const { user: authUser, isAuth, loading: authLoading, logout, refreshUser } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [activeTab, setActiveTab] = useState<TabType>('bookings')
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [bookings, setBookings] = useState<UserBookings | null>(null)
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!authLoading && !isAuth) {
      router.push('/login')
      return
    }

    if (isAuth && authUser) {
      loadUserProfile()
    }
  }, [isAuth, authLoading, authUser, router])

  // Reload bookings when switching to bookings or history tabs
  useEffect(() => {
    if ((activeTab === 'bookings' || activeTab === 'history') && isAuth && !loading && !bookings) {
      loadBookings()
    }
  }, [activeTab, isAuth, loading, bookings])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      const response = await getCurrentUserProfile()
      // Backend returns: { data: { user: {...}, watchlist: [...], bookings: {...} } }
      const profile = response.data?.user
      if (profile && typeof profile === 'object' && 'fullName' in profile && 'email' in profile) {
        const userProfile = profile as UserProfile
        setUserProfile(userProfile)
        setFormData({
          fullName: userProfile.fullName || '',
          email: userProfile.email || '',
          phone: userProfile.phone || '',
          location: userProfile.location || '',
        })
      }

      // Load bookings from profile response first
      if (response.data?.bookings) {
        setBookings(response.data.bookings)
      } else {
        // If not in profile response, fetch separately
        await loadBookings()
      }

      // Load favorite properties if watchlist exists
      const watchlist = response.data?.watchlist || profile?.property || []
      if (watchlist && watchlist.length > 0) {
        const propertyIds = watchlist.map((item: any) =>
          typeof item === 'string' ? item : (item._id || item.id)
        )
        loadFavoriteProperties(propertyIds)
      }
    } catch (error: any) {
      console.error('Error loading profile:', error)
      const errorMessage = error.message || 'Failed to load profile'
      setError(errorMessage)

      if (errorMessage.includes('Session expired') || errorMessage.includes('Please log in')) {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } finally {
      setLoading(false)
    }
  }

  const loadBookings = async () => {
    try {
      const allBookings = await getUserBookings()

      // Organize bookings by status
      const organizedBookings: UserBookings = {
        completed: allBookings.filter((b: Booking) => b.status === 'Completed'),
        hosting: allBookings.filter((b: Booking) => b.status === 'Hosting'),
        fail: allBookings.filter((b: Booking) => b.status === 'Fail'),
        pending: allBookings.filter((b: Booking) => b.status === 'Pending'),
        ConfirmedBookings: allBookings.filter((b: Booking) => b.status === 'Confirmed'),
      }

      setBookings(organizedBookings)
    } catch (error: any) {
      console.error('Error loading bookings:', error)
      // Don't throw error, just log it - bookings are optional
      setBookings({
        completed: [],
        hosting: [],
        fail: [],
        pending: [],
        ConfirmedBookings: [],
      })
    }
  }

  const loadFavoriteProperties = async (propertyIds: string[]) => {
    try {
      const allProperties = await fetchProperties({ limit: 100 })
      const favorites = allProperties.data?.properties?.filter((prop: Property) =>
        propertyIds.includes(prop._id || prop.id || '')
      ) || []
      setFavoriteProperties(favorites)
    } catch (error) {
      console.error('Error loading favorite properties:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setIsUploading(true)
    setError('')

    try {
      const imageUrl = await uploadImageToCloudinary(file)
      await updateProfile({ profileImg: imageUrl })

      if (userProfile) {
        setUserProfile({ ...userProfile, profileImg: imageUrl })
      }
      if (authUser) {
        const updatedUser = { ...authUser, profileImg: imageUrl }
        localStorage.setItem('ss_hotel_user', JSON.stringify(updatedUser))
        refreshUser()
      }

      setSuccess('Profile picture updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error: any) {
      setError(error.message || 'Failed to upload profile picture')
    } finally {
      setIsUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSaveProfile = async () => {
    setError('')
    setSuccess('')

    try {
      const updated = await updateProfile(formData)
      const userData = updated.data?.user || updated.data
      if (userData) {
        setUserProfile(userData as UserProfile)
        setIsEditing(false)
        setSuccess('Profile updated successfully!')
        setTimeout(() => setSuccess(''), 3000)

        if (authUser) {
          const updatedUser = { ...authUser, ...userData }
          localStorage.setItem('ss_hotel_user', JSON.stringify(updatedUser))
          refreshUser()
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update profile')
    }
  }

  const handleRemoveFavorite = async (propertyId: string) => {
    try {
      await toggleWatchlist(propertyId, 'unsave')
      await loadUserProfile()
      setSuccess('Removed from favorites')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error: any) {
      setError(error.message || 'Failed to remove favorite')
    }
  }

  const handleCancelEdit = () => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.fullName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
      })
    }
    setIsEditing(false)
    setError('')
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // Calculate statistics
  const savedCount = favoriteProperties.length
  const activeBookings = [
    ...(bookings?.hosting || []),
    ...(bookings?.ConfirmedBookings || []),
    ...(bookings?.pending || [])
  ]
  const pastStays = bookings?.completed || []

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!isAuth || !authUser || !userProfile) {
    return null
  }

  const displayUser = userProfile || authUser
  const profileImage = displayUser.profileImg

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Picture */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={displayUser.fullName || 'Profile'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500 text-white text-4xl font-bold">
                        {displayUser.fullName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                    title="Change profile picture"
                  >
                    {isUploading ? (
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {displayUser.fullName || 'User'}
                  </h1>
                  <p className="text-amber-100 mb-4">{displayUser.email}</p>
                  {displayUser.role && (
                    <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium capitalize">
                      {displayUser.role}
                    </span>
                  )}
                </div>

                {/* Edit Button */}
                <div>
                  {!isEditing ? (
                    <motion.button
                      onClick={() => setIsEditing(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      Edit Profile
                    </motion.button>
                  ) : (
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleSaveProfile}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                      >
                        Save
                      </motion.button>
                      <motion.button
                        onClick={handleCancelEdit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-white text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <AnimatePresence>
              {(error || success) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mx-6 mt-4 p-3 rounded-lg ${error ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'
                    }`}
                >
                  {error || success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Form */}
            <div className="px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{displayUser.fullName || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{displayUser.email || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{displayUser.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      placeholder="City, Country"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{displayUser.location || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Saved Properties</p>
                  <p className="text-3xl font-bold text-amber-600">{savedCount}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                  <p className="text-3xl font-bold text-amber-600">{activeBookings.length}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Past Stays</p>
                  <p className="text-3xl font-bold text-amber-600">{pastStays.length}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs and Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-white rounded-t-2xl">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'bookings' as TabType, label: 'Bookings', icon: '🏨' },
                  { id: 'saved' as TabType, label: 'Saved', icon: '❤️' },
                  { id: 'history' as TabType, label: 'History', icon: '🕐' },
                  { id: 'rewards' as TabType, label: 'SS Coins', icon: '🪙' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap rounded-t-lg ${activeTab === tab.id
                      ? 'text-white bg-gradient-to-r from-amber-500 to-yellow-600 shadow-md'
                      : 'text-gray-600 hover:text-amber-600'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'bookings' && (
                  <motion.div
                    key="bookings"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Active Bookings</h3>
                    {activeBookings.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-gray-500 text-lg mb-2">No active bookings</p>
                        <Link href="/rooms">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                          >
                            Browse Rooms
                          </motion.button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activeBookings.map((booking: Booking) => (
                          <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  {booking.property?.title || booking.property?.name || 'Property'}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                  <div>
                                    <span className="font-medium">Check-in:</span> {formatDate(booking.checkIn)}
                                  </div>
                                  <div>
                                    <span className="font-medium">Check-out:</span> {formatDate(booking.checkOut)}
                                  </div>
                                  {booking.nights && (
                                    <div>
                                      <span className="font-medium">Nights:</span> {booking.nights}
                                    </div>
                                  )}
                                  {booking.rent && (
                                    <div>
                                      <span className="font-medium">Total:</span> AED {booking.rent}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                  booking.status === 'Hosting' ? 'bg-blue-100 text-blue-800' :
                                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                                  }`}>
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'saved' && (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Saved Properties</h3>
                    {favoriteProperties.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <p className="text-gray-500 text-lg mb-2">No saved properties</p>
                        <p className="text-gray-400 mb-4">Start exploring rooms and save your favorites!</p>
                        <Link href="/rooms">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                          >
                            Browse Rooms
                          </motion.button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteProperties.map((property) => (
                          <motion.div
                            key={property._id || property.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <Link href={EXTERNAL_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                              <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-amber-300 transition-all cursor-pointer">
                                {property.photos && Array.isArray(property.photos) && property.photos.length > 0 && (
                                  <div className="relative h-48 overflow-hidden">
                                    <img
                                      src={typeof property.photos[0] === 'string' ? property.photos[0] : property.photos[0].url}
                                      alt={property.name || 'Property'}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>
                                )}
                                <div className="p-4">
                                  <h3 className="font-semibold text-gray-800 mb-2">{property.name || property.title || 'Property'}</h3>
                                  {property.price && (
                                    <p className="text-amber-600 font-bold">AED {property.price} / night</p>
                                  )}
                                </div>
                              </div>
                            </Link>
                            <button
                              onClick={() => handleRemoveFavorite(property._id || property.id || '')}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              title="Remove from favorites"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'history' && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Past Stays</h3>
                    {pastStays.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500 text-lg mb-2">No past stays</p>
                        <p className="text-gray-400 mb-4">Your completed bookings will appear here</p>
                        <Link href="/rooms">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                          >
                            Browse Rooms
                          </motion.button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pastStays.map((booking: Booking) => (
                          <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  {booking.property?.title || booking.property?.name || 'Property'}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                  <div>
                                    <span className="font-medium">Check-in:</span> {formatDate(booking.checkIn)}
                                  </div>
                                  <div>
                                    <span className="font-medium">Check-out:</span> {formatDate(booking.checkOut)}
                                  </div>
                                  {booking.nights && (
                                    <div>
                                      <span className="font-medium">Nights:</span> {booking.nights}
                                    </div>
                                  )}
                                  {booking.rent && (
                                    <div>
                                      <span className="font-medium">Total:</span> AED {booking.rent}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                  Completed
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'rewards' && (
                  <motion.div
                    key="rewards"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">SS Coins — Loyalty Rewards</h3>
                    <SSCoinsWallet />
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
