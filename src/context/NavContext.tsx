'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type NavContextType = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const NavContext = createContext<NavContextType | undefined>(undefined)

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('about')

  useEffect(() => {
    const path = pathname.split('/')[1] || 'about'
    setActiveTab(path)
  }, [pathname])

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => {
  const context = useContext(NavContext)
  if (!context) throw new Error('useNav must be used within a NavProvider')
  return context
}
