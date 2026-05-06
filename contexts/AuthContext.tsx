'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import {
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
  getStoredUser,
  isAuthenticated,
  type User,
  type LoginCredentials,
  type SignupData,
} from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  googleLogin: (credential: string) => Promise<void>
  logout: () => void
  isAuth: boolean
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const storedUser = getStoredUser()
      if (storedUser && isAuthenticated()) {
        setUser(storedUser)
      }
      setLoading(false)
    }
  }, [isMounted])

  const refreshUser = () => {
    if (typeof window !== 'undefined') {
      const storedUser = getStoredUser()
      if (storedUser && isAuthenticated()) {
        setUser(storedUser)
      }
    }
  }

  const login = async (credentials: LoginCredentials) => {
    const response = await loginApi(credentials)
    if (response.user) {
      setUser(response.user)
      router.push('/')
    }
  }

  const signup = async (userData: SignupData) => {
    const response = await signupApi(userData)
    if (response.user) {
      setUser(response.user)
      router.push('/')
    }
  }

  // Google login is not supported — kept for interface compatibility
  const googleLogin = async (_credential: string) => {
    throw new Error('Google login is not supported. Please use email & password.')
  }

  const logout = () => {
    logoutApi()
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        googleLogin,
        logout,
        isAuth: isMounted && !!user,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
