'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMehfilDropdownOpen, setIsMehfilDropdownOpen] = useState(false)
  const [isOffersDropdownOpen, setIsOffersDropdownOpen] = useState(false)
  const [isExperiencesDropdownOpen, setIsExperiencesDropdownOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { user, logout, isAuth } = useAuth()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen && !(event.target as Element).closest('.relative')) {
        setIsUserMenuOpen(false)
      }
      if (isMehfilDropdownOpen && !(event.target as Element).closest('.mehfil-dropdown')) {
        setIsMehfilDropdownOpen(false)
      }
      if (isOffersDropdownOpen && !(event.target as Element).closest('.offers-dropdown')) {
        setIsOffersDropdownOpen(false)
      }
      if (isExperiencesDropdownOpen && !(event.target as Element).closest('.experiences-dropdown')) {
        setIsExperiencesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isUserMenuOpen, isMehfilDropdownOpen, isOffersDropdownOpen, isExperiencesDropdownOpen])

  const mehfilSubmenu = [
    { name: 'Meetings', href: '/meetings' },
    { name: 'Weddings', href: '/weddings' },
    { name: 'Events', href: '/events-3' },
    { name: 'Explore Venue', href: '/mehfil-ballroom' },
  ]

  const offersSubmenu = [
    { name: 'About', href: '/about-us' },
    { name: 'Special Offers', href: '/offers-and-more' }
  ]

  const experiencesSubmenu = [
    { name: 'Dining', href: '/dining' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Entertainment', href: '/entertainment' },
    { name: 'Meetings', href: '/meetings' },
    { name: 'Weddings', href: '/weddings' },
    { name: 'Events', href: '/events-3' },
    { name: 'Mehfil Ballroom', href: '/mehfil-ballroom' },
  ]

  const navItems = [
    { name: 'ROOMS', href: '/rooms' },
    { name: 'EXPERIENCES', href: '/experiences', hasDropdown: true, dropdownKey: 'experiences' },
    { name: 'OFFERS & MORE', href: '/offers-and-more', hasDropdown: true, dropdownKey: 'offers' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/98 backdrop-blur-xl shadow-2xl py-1 border-b border-amber-200/30'
        : 'bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-sm py-1.5 border-b border-amber-100/50'
        }`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-50/20 to-amber-50/0"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {!isScrolled && (
          <>
            <motion.div
              className="absolute top-0 left-1/4 w-32 h-32 bg-amber-200/10 rounded-full blur-3xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-0 right-1/4 w-40 h-40 bg-yellow-200/10 rounded-full blur-3xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex items-center justify-between min-h-[50px] sm:min-h-[52px]">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image
                src="/logo.png"
                alt="Seven Seas Hotel Dubai"
                width={180}
                height={50}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.3, type: 'spring', stiffness: 100 }}
                className={`relative ${item.dropdownKey === 'mehfil' ? 'mehfil-dropdown' : item.dropdownKey === 'offers' ? 'offers-dropdown' : item.dropdownKey === 'experiences' ? 'experiences-dropdown' : ''}`}
              >
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (item.dropdownKey === 'mehfil') {
                        setIsMehfilDropdownOpen(true)
                      } else if (item.dropdownKey === 'offers') {
                        setIsOffersDropdownOpen(true)
                      } else if (item.dropdownKey === 'experiences') {
                        setIsExperiencesDropdownOpen(true)
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.dropdownKey === 'mehfil') {
                        setIsMehfilDropdownOpen(false)
                      } else if (item.dropdownKey === 'offers') {
                        setIsOffersDropdownOpen(false)
                      } else if (item.dropdownKey === 'experiences') {
                        setIsExperiencesDropdownOpen(false)
                      }
                    }}
                  >
                    <motion.div
                      className="relative group cursor-pointer px-3 py-2 rounded-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Hover background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-gray-700 text-sm font-semibold tracking-wider uppercase transition-all duration-300 group-hover:text-amber-600 relative z-10 flex items-center gap-1.5">
                        {item.name}
                        <motion.svg
                          className="w-4 h-4"
                          animate={{
                            rotate: (item.dropdownKey === 'mehfil' && isMehfilDropdownOpen) ||
                              (item.dropdownKey === 'offers' && isOffersDropdownOpen) ? 180 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </span>
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full group-hover:w-full"
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </motion.div>

                    <AnimatePresence>
                      {((item.dropdownKey === 'mehfil' && isMehfilDropdownOpen) ||
                        (item.dropdownKey === 'offers' && isOffersDropdownOpen) ||
                        (item.dropdownKey === 'experiences' && isExperiencesDropdownOpen)) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-amber-200 py-2 z-50 overflow-hidden"
                          >
                            {/* Solid gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50" />
                            <div className="relative z-10">
                              {(item.dropdownKey === 'mehfil' ? mehfilSubmenu : item.dropdownKey === 'experiences' ? experiencesSubmenu : offersSubmenu).map((subItem, subIndex) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => {
                                    if (item.dropdownKey === 'mehfil') {
                                      setIsMehfilDropdownOpen(false)
                                    } else if (item.dropdownKey === 'offers') {
                                      setIsOffersDropdownOpen(false)
                                    } else if (item.dropdownKey === 'experiences') {
                                      setIsExperiencesDropdownOpen(false)
                                    }
                                  }}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIndex * 0.05, type: 'spring' }}
                                    whileHover={{ x: 5, scale: 1.02 }}
                                    className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-amber-200 hover:to-yellow-200 hover:text-amber-800 transition-all duration-300 rounded-lg mx-2"
                                  >
                                    {subItem.name}
                                  </motion.div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={item.href}>
                    <motion.div
                      className="relative group px-3 py-2 rounded-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Hover background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-gray-700 text-sm font-semibold tracking-wider uppercase cursor-pointer transition-all duration-300 group-hover:text-amber-600 relative z-10">
                        {item.name}
                      </span>
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full group-hover:w-full"
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isMounted && isAuth ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center text-white font-semibold text-xs">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span>{user?.fullName?.split(' ')[0] || 'User'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-800">{user?.fullName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout()
                          setIsUserMenuOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
            <Link href="/rooms">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)',
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700 transition-all duration-300 rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl border border-amber-400/30"
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {/* Pulsing glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl blur opacity-75"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <span>BOOK NOW</span>
                  <motion.svg
                    className="w-4 h-4"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors relative group min-w-[48px] min-h-[48px]"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3, type: 'spring' }}
            >
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-amber-400/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-gradient-to-b from-white to-amber-50/30 border-t border-amber-200/50 shadow-2xl backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 sm:px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          if (item.dropdownKey === 'mehfil') {
                            setIsMehfilDropdownOpen(!isMehfilDropdownOpen)
                            setIsOffersDropdownOpen(false)
                            setIsExperiencesDropdownOpen(false)
                          } else if (item.dropdownKey === 'offers') {
                            setIsOffersDropdownOpen(!isOffersDropdownOpen)
                            setIsMehfilDropdownOpen(false)
                            setIsExperiencesDropdownOpen(false)
                          } else if (item.dropdownKey === 'experiences') {
                            setIsExperiencesDropdownOpen(!isExperiencesDropdownOpen)
                            setIsMehfilDropdownOpen(false)
                            setIsOffersDropdownOpen(false)
                          }
                        }}
                        className="flex items-center justify-between w-full text-black text-base sm:text-lg font-medium uppercase py-2 min-h-[48px]"
                      >
                        <span>{item.name}</span>
                        <motion.svg
                          className="w-5 h-5"
                          animate={{
                            rotate: (item.dropdownKey === 'mehfil' && isMehfilDropdownOpen) ||
                              (item.dropdownKey === 'offers' && isOffersDropdownOpen) ||
                              (item.dropdownKey === 'experiences' && isExperiencesDropdownOpen) ? 180 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {((item.dropdownKey === 'mehfil' && isMehfilDropdownOpen) ||
                          (item.dropdownKey === 'offers' && isOffersDropdownOpen) ||
                          (item.dropdownKey === 'experiences' && isExperiencesDropdownOpen)) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-2 space-y-2"
                            >
                              {(item.dropdownKey === 'mehfil' ? mehfilSubmenu : item.dropdownKey === 'experiences' ? experiencesSubmenu : offersSubmenu).map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => {
                                    setIsMenuOpen(false)
                                    if (item.dropdownKey === 'mehfil') {
                                      setIsMehfilDropdownOpen(false)
                                    } else if (item.dropdownKey === 'offers') {
                                      setIsOffersDropdownOpen(false)
                                    } else if (item.dropdownKey === 'experiences') {
                                      setIsExperiencesDropdownOpen(false)
                                    }
                                  }}
                                  className="block text-gray-600 text-base hover:text-amber-600 transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ x: 10 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-black text-base sm:text-lg font-medium uppercase py-2 min-h-[48px] flex items-center"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
              {isMounted && isAuth ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-800">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full mb-2 px-6 py-3 bg-amber-600 text-white font-bold uppercase rounded-lg"
                    >
                      My Profile
                    </motion.button>
                  </Link>
                  <motion.button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-red-600 text-white font-bold uppercase rounded-lg"
                  >
                    Sign Out
                  </motion.button>
                </div>
              ) : null}
              <Link href="/rooms" onClick={() => setIsMenuOpen(false)} className="w-full">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 px-6 py-4 sm:py-3 bg-black text-white font-bold text-sm sm:text-base uppercase rounded-lg min-h-[48px]"
                >
                  BOOK NOW
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
