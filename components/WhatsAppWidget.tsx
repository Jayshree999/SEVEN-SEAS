'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.451 0 .074 5.377.071 11.977c0 2.11.548 4.17 1.588 6.01L0 24l6.177-1.62a11.745 11.745 0 005.868 1.57h.004c6.598 0 11.976-5.377 11.979-11.978a11.815 11.815 0 00-3.535-8.413z" />
    </svg>
)

const contacts = [
    {
        name: 'Reservations',
        title: 'Seven Seas Hotel',
        phone: '971551009152',
        message: "Hello! I saw your website and would like to make a reservation.",
    },
]

export default function WhatsAppWidget() {
    const [isVisible, setIsVisible] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Contact Panel */}
                        <AnimatePresence>
                            {showPanel && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.85, y: 10 }}
                                    className="bg-white rounded-2xl shadow-2xl border border-emerald-500/20 overflow-hidden w-[220px] relative mb-2"
                                >
                                    <button
                                        onClick={() => setShowPanel(false)}
                                        className="absolute top-2 right-2 bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white rounded-full p-1 transition-colors z-10"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>

                                    <div className="bg-emerald-600 px-4 py-3">
                                        <p className="text-white text-xs font-bold uppercase tracking-widest">Seven Seas Hotel</p>
                                        <p className="text-emerald-100 text-[10px] mt-0.5">Chat with our team</p>
                                    </div>

                                    <div className="divide-y divide-gray-100">
                                        {contacts.map((contact) => (
                                            <a
                                                key={contact.name}
                                                href={`https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.message)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors group"
                                            >
                                                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                                                    <WhatsAppIcon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="text-charcoal text-xs font-bold leading-tight">{contact.name}</p>
                                                    <p className="text-gray-400 text-[10px]">{contact.title}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main Button */}
                        <motion.button
                            onClick={() => setShowPanel((prev) => !prev)}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative group"
                        >
                            {/* Pulse Effect */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 rounded-full bg-emerald-500 z-0"
                            />

                            <div className="relative z-10 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/40 group-hover:bg-emerald-600 transition-colors">
                                <WhatsAppIcon className="w-8 h-8 text-white" />
                            </div>
                        </motion.button>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
