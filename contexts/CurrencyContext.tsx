'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface CurrencyOption {
    code: string
    symbol: string
    name: string
    flag: string
}

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
    { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
    { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦' },
    { code: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
]

interface CurrencyContextValue {
    currency: CurrencyOption
    setCurrency: (currency: CurrencyOption) => void
    convertPrice: (aedAmount: number) => number
    formatPrice: (aedAmount: number, compact?: boolean) => string
    isLoading: boolean
    exchangeRates: Record<string, number>
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

const DEFAULT_RATES: Record<string, number> = {
    AED: 1,
    USD: 0.2723,
    EUR: 0.2503,
    GBP: 0.2146,
    INR: 22.89,
    SAR: 1.0216,
    QAR: 0.9914,
    KWD: 0.0836,
    SGD: 0.3645,
    JPY: 41.23,
    CAD: 0.3782,
    AUD: 0.4261,
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<CurrencyOption>(SUPPORTED_CURRENCIES[0])
    const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(DEFAULT_RATES)
    const [isLoading, setIsLoading] = useState(false)

    // Load saved currency on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('ss_currency')
            if (saved) {
                const found = SUPPORTED_CURRENCIES.find(c => c.code === saved)
                if (found) setCurrencyState(found)
            }
        } catch { }
    }, [])

    // Fetch live exchange rates (free API, no key needed)
    useEffect(() => {
        const fetchRates = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(
                    'https://open.er-api.com/v6/latest/AED',
                    { next: { revalidate: 3600 } } as RequestInit
                )
                if (response.ok) {
                    const data = await response.json()
                    if (data.rates) {
                        setExchangeRates(data.rates)
                    }
                }
            } catch {
                // Fallback to default rates silently
            } finally {
                setIsLoading(false)
            }
        }
        fetchRates()
    }, [])

    const setCurrency = useCallback((newCurrency: CurrencyOption) => {
        setCurrencyState(newCurrency)
        try {
            localStorage.setItem('ss_currency', newCurrency.code)
        } catch { }
    }, [])

    const convertPrice = useCallback(
        (aedAmount: number): number => {
            if (!aedAmount || aedAmount <= 0) return 0
            const rate = exchangeRates[currency.code] ?? DEFAULT_RATES[currency.code] ?? 1
            return aedAmount * rate
        },
        [currency.code, exchangeRates]
    )

    const formatPrice = useCallback(
        (aedAmount: number, compact = false): string => {
            if (!aedAmount || aedAmount <= 0) return ''
            const converted = convertPrice(aedAmount)
            const sym = currency.symbol

            // Locale formatting
            const locale = currency.code === 'INR' ? 'en-IN' :
                currency.code === 'JPY' ? 'ja-JP' : 'en-US'
            const formatted = new Intl.NumberFormat(locale, {
                minimumFractionDigits: currency.code === 'JPY' || currency.code === 'KWD' ? 0 : 0,
                maximumFractionDigits: currency.code === 'KWD' ? 3 : currency.code === 'JPY' ? 0 : 0,
            }).format(converted)

            // Symbols that go before the number
            const prefix = ['$', '£', '€', '¥', '₹', 'S$', 'C$', 'A$']
            if (prefix.some(p => sym === p)) {
                return `${sym}${formatted}`
            }
            return `${sym} ${formatted}`
        },
        [convertPrice, currency]
    )

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice, isLoading, exchangeRates }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (!context) throw new Error('useCurrency must be used within CurrencyProvider')
    return context
}
