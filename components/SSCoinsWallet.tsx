'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchSSCoins, SSCoinsData } from '@/lib/ssCoins'
import { Coins, TrendingUp, Award, Clock, ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react'

const TIER_CONFIG = {
    Bronze: { color: 'from-amber-600 to-yellow-700', badge: 'bg-amber-100 text-amber-800', icon: '🥉', next: 1000 },
    Silver: { color: 'from-gray-400 to-gray-500', badge: 'bg-gray-100 text-gray-700', icon: '🥈', next: 5000 },
    Gold: { color: 'from-yellow-400 to-amber-500', badge: 'bg-yellow-100 text-yellow-800', icon: '🥇', next: 10000 },
    Platinum: { color: 'from-purple-500 to-indigo-600', badge: 'bg-purple-100 text-purple-800', icon: '💎', next: null },
}

function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
    const [display, setDisplay] = useState(0)
    useEffect(() => {
        let start = 0
        const step = value / (duration * 60)
        const timer = setInterval(() => {
            start += step
            if (start >= value) { setDisplay(value); clearInterval(timer) }
            else setDisplay(Math.floor(start))
        }, 1000 / 60)
        return () => clearInterval(timer)
    }, [value, duration])
    return <>{display.toLocaleString()}</>
}

export default function SSCoinsWallet() {
    const [data, setData] = useState<SSCoinsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [showHistory, setShowHistory] = useState(false)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            const result = await fetchSSCoins()
            setData(result)
            setLoading(false)
        }
        load()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Coins className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium mb-1">No SS Coins yet</p>
                <p className="text-sm text-gray-400">Book a stay to start earning • 1 AED = 1 SS Coin</p>
            </div>
        )
    }

    const tier = data.tier as keyof typeof TIER_CONFIG
    const config = TIER_CONFIG[tier]
    const nextTier = ({ Bronze: 'Silver', Silver: 'Gold', Gold: 'Platinum', Platinum: null } as any)[tier]

    return (
        <div className="space-y-5">
            {/* Hero balance card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.color} p-6 text-white shadow-xl`}
            >
                {/* Background decoration */}
                <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full bg-white/5" />
                <div className="absolute -right-4 -bottom-8 w-32 h-32 rounded-full bg-white/5" />

                <div className="relative z-10 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-4 h-4 opacity-70" />
                            <p className="text-sm font-medium text-white/70 uppercase tracking-widest">SS Coins Balance</p>
                        </div>
                        <div className="text-5xl font-black tracking-tight mb-1">
                            <AnimatedCounter value={data.balance} />
                        </div>
                        <p className="text-white/60 text-sm">≈ AED {data.balance.toLocaleString()} value</p>
                    </div>

                    {/* Tier badge */}
                    <div className="flex flex-col items-end gap-2">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${config.badge} backdrop-blur-sm`}>
                            {config.icon} {tier}
                        </div>
                        <p className="text-xs text-white/50">Member Tier</p>
                    </div>
                </div>

                {/* Progress bar to next tier */}
                {nextTier && config.next && (
                    <div className="relative z-10 mt-5">
                        <div className="flex justify-between text-xs text-white/60 mb-1.5">
                            <span>{data.totalEarned.toLocaleString()} earned</span>
                            <span>{config.next.toLocaleString()} for {nextTier}</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${data.progressToNext}%` }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                className="h-2 bg-white rounded-full"
                            />
                        </div>
                        <p className="text-xs text-white/50 mt-1.5 text-right">{data.progressToNext}% to {nextTier}</p>
                    </div>
                )}
                {!nextTier && (
                    <div className="relative z-10 mt-4">
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Star className="w-4 h-4" />
                            <span>Maximum tier reached! You're a Platinum member 🎉</span>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Total Earned', value: data.totalEarned, icon: <TrendingUp className="w-5 h-5 text-green-500" />, color: 'text-green-600' },
                    { label: 'Balance', value: data.balance, icon: <Coins className="w-5 h-5 text-amber-500" />, color: 'text-amber-600' },
                    { label: 'Redeemed', value: data.totalRedeemed, icon: <Award className="w-5 h-5 text-purple-500" />, color: 'text-purple-600' },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                    >
                        <div className="flex items-center gap-2 mb-2">{stat.icon}</div>
                        <p className={`text-xl font-bold ${stat.color}`}>{stat.value.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* How it works */}
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-amber-600" />
                    <h4 className="font-semibold text-amber-900 text-sm">How SS Coins Work</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-800">
                    <div className="flex items-start gap-1.5"><span className="text-amber-500 font-bold">1</span><span>Earn <strong>1 SS Coin</strong> for every AED spent on bookings</span></div>
                    <div className="flex items-start gap-1.5"><span className="text-amber-500 font-bold">2</span><span>Level up: Bronze → Silver → Gold → Platinum</span></div>
                    <div className="flex items-start gap-1.5"><span className="text-amber-500 font-bold">3</span><span>Redeem coins for <strong>discounts</strong> on future bookings (coming soon)</span></div>
                </div>
            </div>

            {/* Tier benefits */}
            <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" /> Tier Benefits
                    </h4>
                </div>
                <div className="divide-y divide-gray-100">
                    {Object.entries(TIER_CONFIG).map(([t, cfg]) => (
                        <div key={t} className={`flex items-center justify-between px-4 py-3 ${t === tier ? 'bg-amber-50' : ''}`}>
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{cfg.icon}</span>
                                <div>
                                    <p className={`text-sm font-semibold ${t === tier ? 'text-amber-800' : 'text-gray-700'}`}>{t}</p>
                                    <p className="text-xs text-gray-400">{cfg.next ? `${cfg.next.toLocaleString()} coins to unlock` : 'Top tier'}</p>
                                </div>
                            </div>
                            {t === tier && <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2.5 py-1 rounded-full">Current</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Transaction history */}
            {data.transactions && data.transactions.length > 0 && (
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <h4 className="font-semibold text-gray-800 text-sm">Transaction History ({data.transactions.length})</h4>
                        </div>
                        {showHistory ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                        {showHistory && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                            >
                                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                                    {data.transactions.map((tx) => (
                                        <div key={tx._id} className="flex items-center justify-between px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'earned' ? 'bg-green-100' : 'bg-purple-100'
                                                    }`}>
                                                    {tx.type === 'earned' ? (
                                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <Coins className="w-4 h-4 text-purple-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{tx.description}</p>
                                                    <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold ${tx.type === 'earned' ? 'text-green-600' : 'text-purple-600'}`}>
                                                {tx.type === 'earned' ? '+' : '-'}{tx.amount.toLocaleString()} SS
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {data.transactions?.length === 0 && (
                <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No transactions yet. Make your first booking to earn coins!</p>
                </div>
            )}
        </div>
    )
}
