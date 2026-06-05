'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import CurrencySelector from '@/components/CurrencySelector'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

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

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ROOMS', href: '/rooms' },
    { name: 'DINING', href: '/dining' },
    { name: 'MEHFIL BALLROOM', href: '/mehfil-ballroom', hasDropdown: true, dropdownKey: 'mehfil' },
    { name: 'ENTERTAINMENT', href: '/entertainment' },
    { name: 'WELLNESS', href: '/wellness' },
    { name: 'OFFERS & MORE', href: '/offers-and-more' },
    { name: 'ABOUT US', href: '/about-us' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-black/80 backdrop-blur-xl shadow-2xl py-2 border-b border-white/10'
        : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px] py-4 border-b border-white/5'
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

      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-2 xl:px-4 relative z-10">
        <div className="flex items-center justify-between min-h-[50px] sm:min-h-[52px]">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image
                src="/logo.png"
                alt="Seven Seas Hotel Dubai"
                width={180}
                height={50}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0 xl:space-x-2">
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
                      className="relative group cursor-pointer px-1 py-1 xl:px-2 xl:py-1.5 border border-transparent hover:border-white/10"
                      whileHover={{ y: -1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Hover background glow */}
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-white text-[11px] xl:text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:text-amber-400 relative z-10 flex items-center gap-1.5 whitespace-nowrap">
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
                        className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full"
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </motion.div>

                    <AnimatePresence>
                      {((item.dropdownKey === 'mehfil' && isMehfilDropdownOpen) ||
                        (item.dropdownKey === 'offers' && isOffersDropdownOpen) ||
                        (item.dropdownKey === 'experiences' && isExperiencesDropdownOpen)) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-none shadow-2xl border border-gray-100 py-2 z-50 text-gray-900"
                          >
                            <div className="relative z-10">
                              {(item.dropdownKey === 'mehfil' ? mehfilSubmenu : []).map((subItem, subIndex) => (
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
                                    transition={{ delay: subIndex * 0.05 }}
                                    className="px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-700 hover:text-amber-600 hover:bg-gray-50 transition-all duration-300 mx-0 rounded-none border-l-2 border-transparent hover:border-amber-500"
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
                  item.isExternal ? (
                    <a href={item.href}>
                      <motion.div
                        className="relative group px-1 py-1 xl:px-2 xl:py-1.5 border border-transparent hover:border-white/10"
                        whileHover={{ y: -1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        <span className="text-white text-[11px] xl:text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all duration-300 group-hover:text-amber-400 relative z-10 whitespace-nowrap">
                          {item.name}
                        </span>
                        <motion.div
                          className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full"
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                      </motion.div>
                    </a>
                  ) : (
                  <Link href={item.href}>
                    <motion.div
                      className="relative group px-1 py-1 xl:px-2 xl:py-1.5 border border-transparent hover:border-white/10"
                      whileHover={{ y: -1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Hover background glow */}
                      <motion.div
                        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <span className="text-white text-[11px] xl:text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all duration-300 group-hover:text-amber-400 relative z-10 whitespace-nowrap">
                        {item.name}
                      </span>
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full"
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </motion.div>
                  </Link>
                  )
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Currency Selector */}
            <CurrencySelector />
            {isMounted && isAuth ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                >
                  {user?.profileImg ? (
                    <img
                      src={user.profileImg}
                      alt={user.fullName || 'User'}
                      className="w-7 h-7 rounded-none object-cover border border-amber-500"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-none bg-amber-600 flex items-center justify-center text-white font-bold text-[10px] tracking-tighter">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
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
                      className="absolute right-0 mt-2 w-48 bg-white rounded-none shadow-2xl border border-gray-100 py-2 z-50"
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
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-xs xl:text-sm font-semibold text-amber-600 hover:text-amber-700 border-2 border-amber-600 hover:border-amber-700 rounded-lg transition-all"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
            <a href={EXTERNAL_BOOKING_URL}>
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 py-1.5 xl:px-4 xl:py-2 text-[10px] font-bold tracking-[0.1em] xl:tracking-[0.2em] text-white bg-transparent hover:bg-white transition-all duration-300 rounded-none border border-white/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>BOOK NOW</span>
                </span>
              </motion.button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden w-12 h-12 flex items-center justify-center rounded-none bg-transparent border border-white/20 transition-all relative group min-w-[48px] min-h-[48px]"
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
            {/* Subtle border shine */}
            <motion.div
              className="absolute inset-0 rounded-none border border-white/10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
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
            className="lg:hidden bg-[#0a0a0a]/95 border-t border-amber-900/30 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6 relative z-10">
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
                        className="flex items-center justify-between w-full text-white text-base sm:text-lg font-medium uppercase py-3 min-h-[48px] border-b border-white/5"
                      >
                        <span className="tracking-widest">{item.name}</span>
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
                              className="ml-4 mt-2 space-y-3 pl-4 border-l border-white/10"
                            >
                              {(item.dropdownKey === 'mehfil' ? mehfilSubmenu : []).map((subItem) => (
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
                                  className="block text-gray-400 text-sm hover:text-amber-400 transition-colors py-1"
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
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-white text-base sm:text-lg font-medium uppercase py-3 min-h-[48px] flex items-center border-b border-white/5 tracking-widest hover:text-amber-400 transition-colors"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-white text-base sm:text-lg font-medium uppercase py-3 min-h-[48px] flex items-center border-b border-white/5 tracking-widest hover:text-amber-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      )}
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
                      className="w-full mb-2 px-6 py-4 bg-amber-600 text-white font-bold tracking-widest uppercase rounded-none text-xs"
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
                    className="w-full px-6 py-4 bg-red-600 text-white font-bold tracking-widest uppercase rounded-none text-xs"
                  >
                    Sign Out
                  </motion.button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full mb-2 px-6 py-4 border border-amber-600 text-amber-600 font-bold tracking-widest uppercase rounded-none text-xs"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </div>
              )}
              <a href={EXTERNAL_BOOKING_URL} className="w-full" onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 px-6 py-5 bg-white text-black font-bold text-xs tracking-[0.3em] uppercase rounded-none min-h-[52px]"
                >
                  BOOK NOW
                </motion.button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

