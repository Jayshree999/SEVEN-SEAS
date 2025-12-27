'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface DatePickerProps {
  label: string
  value: string
  onChange: (date: string) => void
  minDate?: string
  maxDate?: string
  pricePerNight?: number
  onClose?: () => void
  blockedDates?: string[] // Array of blocked dates in YYYY-MM-DD format
  dailyPrices?: Array<{ date: string; price: number }> // Array of daily prices
  propertyId?: string
}

export default function DatePicker({ 
  label, 
  value, 
  onChange, 
  minDate, 
  maxDate,
  pricePerNight = 500,
  onClose,
  blockedDates = [],
  dailyPrices = [],
  propertyId
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
      setCurrentMonth(new Date(value))
    }
  }, [value])

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const formatDate = (date: Date | null): string => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const isDateBlocked = (date: Date): boolean => {
    const dateStr = formatDate(date)
    return blockedDates.includes(dateStr)
  }

  const getDatePrice = (date: Date): number => {
    const dateStr = formatDate(date)
    const dailyPrice = dailyPrices.find(dp => dp.date === dateStr)
    return dailyPrice?.price || pricePerNight
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: Array<{ 
      date: Date
      isCurrentMonth: boolean
      isSelected: boolean
      isDisabled: boolean
      isBlocked: boolean
      price: number
    }> = []

    // Previous month's days
    const prevMonth = new Date(year, month - 1, 0)
    const prevMonthDays = prevMonth.getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i)
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: false,
        isDisabled: true,
        isBlocked: false,
        price: pricePerNight,
      })
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateStr = formatDate(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const isBlocked = isDateBlocked(date)
      const isDisabled = 
        (minDate && dateStr < minDate) || 
        (maxDate && dateStr > maxDate) ||
        date < today ||
        isBlocked

      days.push({
        date,
        isCurrentMonth: true,
        isSelected: selectedDate ? formatDate(selectedDate) === dateStr : false,
        isDisabled,
        isBlocked,
        price: getDatePrice(date),
      })
    }

    // Next month's days to fill the grid
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day)
      days.push({
        date,
        isCurrentMonth: false,
        isSelected: false,
        isDisabled: true,
        isBlocked: false,
        price: pricePerNight,
      })
    }

    return days
  }

  const handleDateClick = (date: Date, isDisabled: boolean, isBlocked: boolean) => {
    if (isDisabled || isBlocked) return
    setSelectedDate(date)
    onChange(formatDate(date))
    setIsOpen(false)
    onClose?.()
  }

  const handleReset = () => {
    setSelectedDate(null)
    onChange('')
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const days = getDaysInMonth(currentMonth)
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
  const nextMonthDays = getDaysInMonth(nextMonth)

  return (
    <div className="relative" ref={calendarRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border-2 rounded-lg text-left flex items-center justify-between transition-all ${
          value ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-amber-400'
        } focus:outline-none focus:ring-2 focus:ring-amber-500`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={value ? 'text-gray-900 font-medium' : 'text-gray-500'}>
            {value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select date'}
          </span>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
              onClick={() => {
                setIsOpen(false)
                onClose?.()
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '100%' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed z-50 left-1/2 -translate-x-1/2 bottom-0 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-gray-200 p-4 sm:p-6 w-[calc(100vw-1rem)] sm:w-[95vw] sm:max-w-[850px] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Select {label.toLowerCase()}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Pick your {label.toLowerCase()}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {value && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg font-medium text-[10px] sm:text-xs transition-colors flex items-center gap-1 touch-manipulation"
                    >
                      <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </motion.button>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      onClose?.()
                    }}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              </div>

              {/* Two Month Calendar Grid - Single on mobile, two on desktop */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 xl:gap-8">
                {/* Current Month */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={goToPreviousMonth}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </motion.button>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg px-2 text-center">{getMonthName(currentMonth)}</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={goToNextMonth}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </motion.button>
                  </div>
                  
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-center text-[10px] sm:text-xs font-bold text-gray-600 py-1 sm:py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                    {days.slice(0, 42).map((day, index) => (
                      <motion.button
                        key={index}
                        whileHover={!day.isDisabled && !day.isBlocked ? { scale: 1.05 } : {}}
                        whileTap={!day.isDisabled && !day.isBlocked ? { scale: 0.95 } : {}}
                        onClick={() => handleDateClick(day.date, day.isDisabled, day.isBlocked)}
                        disabled={day.isDisabled || day.isBlocked}
                        className={`
                          relative p-1 sm:p-1.5 md:p-2 text-[11px] sm:text-xs md:text-sm rounded-md sm:rounded-lg transition-all min-h-[50px] sm:min-h-[55px] md:min-h-[60px] lg:min-h-[70px] flex flex-col items-center justify-center touch-manipulation
                          ${day.isBlocked
                            ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-200'
                            : day.isDisabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : day.isSelected
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold shadow-lg scale-105 z-10'
                            : day.isCurrentMonth
                            ? 'text-gray-900 hover:bg-amber-50 hover:border-amber-200 border border-transparent active:bg-amber-100'
                            : 'text-gray-400'
                          }
                        `}
                      >
                        <span className={`${day.isSelected ? 'text-white' : ''} font-semibold text-xs sm:text-sm`}>
                          {day.date.getDate()}
                        </span>
                        {day.isCurrentMonth && !day.isDisabled && (
                          <span className={`text-[8px] sm:text-[9px] md:text-[10px] mt-0.5 font-medium leading-tight ${
                            day.isBlocked 
                              ? 'text-red-500 line-through' 
                              : day.isSelected 
                              ? 'text-white/90' 
                              : 'text-gray-600'
                          }`}>
                            {day.price.toLocaleString()} AED
                          </span>
                        )}
                        {day.isBlocked && (
                          <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full"></span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Next Month - Hidden on mobile, shown on desktop */}
                <div className="hidden xl:block w-full">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentMonth(nextMonth)}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </motion.button>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg px-2 text-center">{getMonthName(nextMonth)}</h4>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 1))}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </motion.button>
                  </div>
                  
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-center text-[10px] sm:text-xs font-bold text-gray-600 py-1 sm:py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                    {nextMonthDays.slice(0, 42).map((day, index) => (
                      <motion.button
                        key={index}
                        whileHover={!day.isDisabled && !day.isBlocked ? { scale: 1.05 } : {}}
                        whileTap={!day.isDisabled && !day.isBlocked ? { scale: 0.95 } : {}}
                        onClick={() => handleDateClick(day.date, day.isDisabled, day.isBlocked)}
                        disabled={day.isDisabled || day.isBlocked}
                        className={`
                          relative p-1 sm:p-1.5 md:p-2 text-[11px] sm:text-xs md:text-sm rounded-md sm:rounded-lg transition-all min-h-[50px] sm:min-h-[55px] md:min-h-[60px] lg:min-h-[70px] flex flex-col items-center justify-center touch-manipulation
                          ${day.isBlocked
                            ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-200'
                            : day.isDisabled
                            ? 'text-gray-300 cursor-not-allowed'
                            : day.isSelected
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold shadow-lg scale-105 z-10'
                            : day.isCurrentMonth
                            ? 'text-gray-900 hover:bg-amber-50 hover:border-amber-200 border border-transparent active:bg-amber-100'
                            : 'text-gray-400'
                          }
                        `}
                      >
                        <span className={`${day.isSelected ? 'text-white' : ''} font-semibold text-xs sm:text-sm`}>
                          {day.date.getDate()}
                        </span>
                        {day.isCurrentMonth && !day.isDisabled && (
                          <span className={`text-[8px] sm:text-[9px] md:text-[10px] mt-0.5 font-medium leading-tight ${
                            day.isBlocked 
                              ? 'text-red-500 line-through' 
                              : day.isSelected 
                              ? 'text-white/90' 
                              : 'text-gray-600'
                          }`}>
                            {day.price.toLocaleString()} AED
                          </span>
                        )}
                        {day.isBlocked && (
                          <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full"></span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-600">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-lg bg-amber-500 flex-shrink-0"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-lg bg-red-50 border border-red-200 flex-shrink-0"></div>
                  <span>Blocked</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-lg bg-gray-100 flex-shrink-0"></div>
                  <span>Available</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
