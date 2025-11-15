'use client'

import { createContext, useContext } from 'react'
import type { GetAuthMe200Data } from '@/api/test-api/models'
import { useGetAuthMe } from '@/api/test-api/api'

interface UserContextValue {
  user: GetAuthMe200Data | null
  isUserReady: boolean
  isLoading: boolean
}

const ignoredPaths = ['/auth/login', '/auth/register']

const UserContext = createContext<UserContextValue | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: userData, isLoading } = useGetAuthMe({
    query: {
      enabled: !ignoredPaths.includes(window.location.pathname),
      retry: false,
    },
  })

  const isUserReady = !isLoading && !!userData?.data

  const user = userData?.data ?? null

  return (
    <UserContext.Provider value={{ user, isUserReady, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
