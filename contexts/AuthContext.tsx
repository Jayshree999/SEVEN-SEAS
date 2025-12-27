'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { 
  login as loginApi, 
  signup as signupApi, 
  logout as logoutApi,
  getStoredUser,
  isAuthenticated,
  type AuthResponse,
  type LoginCredentials,
  type SignupData,
} from '@/lib/auth'

interface User {
  _id: string
  fullName: string
  email: string
  phone?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
  isAuth: boolean
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user on mount
    if (typeof window !== 'undefined') {
      const storedUser = getStoredUser()
      if (storedUser && isAuthenticated()) {
        setUser(storedUser)
      }
      setLoading(false)
    }
  }, [])

  // Function to refresh user data (can be called from profile page)
  const refreshUser = () => {
    if (typeof window !== 'undefined') {
      const storedUser = getStoredUser()
      if (storedUser && isAuthenticated()) {
        setUser(storedUser)
      }
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: AuthResponse = await loginApi(credentials)
      const userData = response.user || response.data?.user
      if (userData) {
        setUser(userData)
        router.push('/')
      }
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData: SignupData) => {
    try {
      const response: AuthResponse = await signupApi(userData)
      const userDataFromResponse = response.user || response.data?.user
      if (userDataFromResponse) {
        setUser(userDataFromResponse)
        // Redirect to profile page after successful registration
        router.push('/profile')
      }
    } catch (error) {
      throw error
    }
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
        logout,
        isAuth: !!user,
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

