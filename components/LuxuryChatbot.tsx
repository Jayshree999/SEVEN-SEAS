'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, ChevronUp, ChevronDown, Home, MapPin, Calendar, Phone, Mail, Star, Shield, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { EXTERNAL_BOOKING_URL } from '@/lib/constants'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  quickActions?: QuickAction[]
}

interface QuickAction {
  label: string
  action: () => void
  icon?: React.ReactNode
}

const AUTO_REPLIES: Record<string, { text: string; quickActions?: QuickAction[] }> = {
  'hello': {
    text: "Hello! 👋 Welcome to Seven Seas Hotel! I'm your luxury concierge assistant. How can I help you find your perfect stay today?",
    quickActions: [
      { label: 'Browse Rooms', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Home className="w-4 h-4" /> },
      { label: 'View Offers', action: () => window.location.href = '/offers', icon: <Star className="w-4 h-4" /> }
    ]
  },
  'hi': {
    text: "Hi there! 🌟 I'm here to help you discover our luxurious rooms and suites. What brings you here today?",
    quickActions: [
      { label: 'See Rooms', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Home className="w-4 h-4" /> }
    ]
  },
  'help': {
    text: "I'd be delighted to help! I can assist you with:\n\n✨ Finding luxury rooms & suites\n📅 Booking information & availability\n💰 Pricing and special offers\n📍 Hotel amenities & features\n🍽️ Dining options\n📞 Contact & support\n\nWhat would you like to explore?",
    quickActions: [
      { label: 'View All Rooms', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Home className="w-4 h-4" /> },
      { label: 'Contact Us', action: () => window.location.href = '/contact', icon: <Phone className="w-4 h-4" /> }
    ]
  },
  'price': {
    text: "Our luxury rooms and suites offer exceptional value:\n\n💰 Deluxe Rooms: Starting from AED 150/night\n🏖️ Executive Suites: Starting from AED 350/night\n👑 Presidential Suites: Starting from AED 800/night\n\nPrices vary based on:\n• Room type & size\n• View & amenities\n• Season & duration\n• Special packages\n\nWould you like to see rooms in a specific price range?",
    quickActions: [
      { label: 'Browse Rooms', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Home className="w-4 h-4" /> }
    ]
  },
  'booking': {
    text: "Booking with Seven Seas Hotel is seamless:\n\n1️⃣ Browse our luxurious rooms\n2️⃣ Select your preferred dates\n3️⃣ Choose your perfect accommodation\n4️⃣ Complete secure reservation\n\n✨ Benefits:\n• Instant confirmation\n• 24/7 concierge support\n• Flexible cancellation\n• Best price guarantee\n• Free WiFi & parking\n\nReady to find your perfect stay?",
    quickActions: [
      { label: 'Book Now', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Calendar className="w-4 h-4" /> }
    ]
  },
  'availability': {
    text: "I can help you check availability! Our rooms have real-time availability.\n\n📅 To check:\n• Visit our rooms page\n• Select your dates\n• See instant availability\n\nPopular periods:\n• Peak season: Nov - Mar\n• Shoulder season: Apr - May, Sep - Oct\n• Summer: Jun - Aug (Great deals!)\n\nWhich dates are you interested in?",
    quickActions: [
      { label: 'Check Availability', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Calendar className="w-4 h-4" /> }
    ]
  },
  'amenities': {
    text: "Seven Seas Hotel features world-class amenities:\n\n✨ Luxury spa & wellness center\n🏊 Infinity pool with poolside service\n🍽️ Fine dining restaurants\n🍸 Rooftop bar & lounge\n💆 Full-service spa\n🏋️ State-of-the-art fitness center\n🚗 Valet parking\n🛎️ 24/7 concierge service\n📶 High-speed WiFi\n🎮 Entertainment & gaming room\n🌴 Beautiful gardens\n\nWhich amenities matter most to you?",
    quickActions: [
      { label: 'Explore Rooms', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Home className="w-4 h-4" /> }
    ]
  },
  'location': {
    text: "Seven Seas Hotel is located in the heart of Dubai:\n\n📍 Prime location with easy access to:\n• Dubai International Airport (15 min)\n• Dubai Mall & Burj Khalifa (10 min)\n• Dubai Marina & JBR (15 min)\n• Business districts (5 min)\n• Shopping & entertainment (5 min)\n\nOur central location makes it perfect for both business and leisure travelers!",
    quickActions: [
      { label: 'View Location', action: () => window.location.href = '/contact', icon: <MapPin className="w-4 h-4" /> }
    ]
  },
  'contact': {
    text: "We're here to help you 24/7:\n\n📧 Email: info@sevenseashotel.ae\n📱 Phone: +971-55-100-9152\n🌐 Website: www.sevenseashotel.net\n\n📍 Hotel Address:\nSeven Seas Hotel\nDubai, United Arab Emirates\n\nOr chat with us right here anytime! 💬",
    quickActions: [
      { label: 'Contact Page', action: () => window.location.href = '/contact', icon: <Mail className="w-4 h-4" /> },
      { label: 'Call Now', action: () => window.location.href = 'tel:+971551009152', icon: <Phone className="w-4 h-4" /> }
    ]
  },
  'dining': {
    text: "Our dining experiences are exceptional:\n\n🍽️ Fine Dining Restaurant - International cuisine\n🍸 Rooftop Bar - Stunning city views\n☕ Coffee Shop - Fresh pastries & beverages\n🍷 Wine Bar - Premium selection\n🍰 Room Service - Available 24/7\n\nAll our restaurants feature:\n• Fresh, locally sourced ingredients\n• Expert chefs\n• Elegant ambiance\n• Dietary accommodations available\n\nWould you like to make a reservation?",
    quickActions: [
      { label: 'View Dining', action: () => window.location.href = '/restaurant', icon: <Home className="w-4 h-4" /> }
    ]
  },
  'default': {
    text: "Thank you for your message! 🌟 I'm here to help you find the perfect stay at Seven Seas Hotel. I can assist with:\n\n• Room recommendations\n• Booking assistance\n• Hotel amenities\n• Pricing information\n• Special requests\n• Dining reservations\n\nWhat would you like to know?",
    quickActions: [
      { label: 'Browse Rooms', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Home className="w-4 h-4" /> },
      { label: 'Get Help', action: () => window.location.href = '/support', icon: <Shield className="w-4 h-4" /> }
    ]
  }
}

const SUGGESTED_QUESTIONS = [
  { text: 'Show me luxury rooms', icon: <Home className="w-4 h-4" /> },
  { text: 'What are your prices?', icon: <Star className="w-4 h-4" /> },
  { text: 'Check availability', icon: <Calendar className="w-4 h-4" /> },
  { text: 'Hotel amenities', icon: <Sparkles className="w-4 h-4" /> },
  { text: 'Contact information', icon: <Phone className="w-4 h-4" /> },
  { text: 'Dining options', icon: <Mail className="w-4 h-4" /> }
]

export function LuxuryChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: "Hello! 👋 Welcome to Seven Seas Hotel! I'm your luxury concierge assistant. How can I help you find your perfect stay?",
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }, [])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const getAutoReply = (userMessage: string): { text: string; quickActions?: QuickAction[] } => {
    const lowerMessage = userMessage.toLowerCase().trim()

    // Check for keywords
    for (const [keyword, reply] of Object.entries(AUTO_REPLIES)) {
      if (lowerMessage.includes(keyword)) {
        return reply
      }
    }

    // Check for specific patterns
    if (lowerMessage.includes('room') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation') || lowerMessage.includes('suite')) {
      return {
        text: "We have an exclusive collection of luxury rooms and suites! 🏖️\n\nOur portfolio includes:\n• Deluxe rooms with city views\n• Executive suites with separate living areas\n• Presidential suites with premium amenities\n• Family suites perfect for groups\n\nWould you like to see our available rooms?",
        quickActions: [
          { label: 'View Rooms', action: () => window.location.href = EXTERNAL_BOOKING_URL, icon: <Home className="w-4 h-4" /> }
        ]
      }
    }

    if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('rent')) {
      return AUTO_REPLIES.booking
    }

    if (lowerMessage.includes('when') || lowerMessage.includes('date') || lowerMessage.includes('available')) {
      return AUTO_REPLIES.availability
    }

    if (lowerMessage.includes('cost') || lowerMessage.includes('pay') || lowerMessage.includes('rate') || lowerMessage.includes('price')) {
      return AUTO_REPLIES.price
    }

    if (lowerMessage.includes('where') || lowerMessage.includes('area') || lowerMessage.includes('place') || lowerMessage.includes('location')) {
      return AUTO_REPLIES.location
    }

    if (lowerMessage.includes('feature') || lowerMessage.includes('facility') || lowerMessage.includes('service') || lowerMessage.includes('amenit')) {
      return AUTO_REPLIES.amenities
    }

    if (lowerMessage.includes('dining') || lowerMessage.includes('restaurant') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      return AUTO_REPLIES.dining
    }

    return AUTO_REPLIES.default
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const reply = getAutoReply(inputValue)
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: reply.text,
        sender: 'bot',
        timestamp: new Date(),
        quickActions: reply.quickActions
      }
      setMessages(prev => [...prev, botReply])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestedQuestion = (question: { text: string; icon?: React.ReactNode }) => {
    setInputValue(question.text)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const pathname = usePathname()

  if (pathname?.startsWith('/rooms/')) {
    return null
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          onClick={() => {
            setIsOpen(true)
            setIsMinimized(false)
            setTimeout(() => inputRef.current?.focus(), 100)
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 text-white shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] rounded-2xl shadow-2xl border border-gray-200 bg-white transition-all duration-300 overflow-hidden ${isMinimized ? 'h-14 sm:h-16' : 'h-[calc(100vh-8rem)] sm:h-[600px] max-h-[600px]'
            }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-3 sm:p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-md flex-shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 truncate">
                  <span className="truncate">Seven Seas Hotel</span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                </h3>
                <p className="text-white/80 text-[10px] sm:text-xs flex items-center gap-1 truncate">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                  <span className="truncate">Always here to help</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 sm:p-1.5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors"
                aria-label={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? (
                  <ChevronUp className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 sm:p-1.5 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 h-[calc(100vh-20rem)] sm:h-[450px] scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div
                      className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-md ${message.sender === 'user'
                          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                          : 'bg-gray-50 text-gray-900 border border-gray-200'
                          }`}
                      >
                        <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                        <span className="text-[10px] sm:text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                      )}
                    </div>
                    {/* Quick Actions */}
                    {message.sender === 'bot' && message.quickActions && message.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 ml-9 sm:ml-10">
                        {message.quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={action.action}
                            className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 active:bg-amber-200 transition-all duration-200 text-[10px] sm:text-xs font-medium border border-amber-200 shadow-sm active:shadow-md"
                          >
                            <span className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0">{action.icon}</span>
                            <span className="truncate">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-50 rounded-2xl px-4 py-2.5 shadow-md border border-gray-200">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-3 sm:px-4 pb-2">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600" />
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 active:bg-gray-200 transition-all duration-200 border border-gray-200 shadow-sm active:shadow-md font-medium"
                      >
                        <span className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0">{question.icon}</span>
                        <span className="truncate">{question.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 text-sm sm:text-base border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-lg px-4 py-2 h-10 sm:h-11 outline-none bg-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:from-amber-700 active:to-amber-800 text-white shadow-md hover:shadow-lg transition-all duration-300 h-10 sm:h-11 w-10 sm:w-11 p-0 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </>
  )
}


