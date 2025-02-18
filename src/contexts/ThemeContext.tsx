'use client'

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'
import { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  mode: ThemeMode
  themeMode: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-bs-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme-mode"
      value={{
        light: 'light',
        dark: 'dark',
        system: 'system',
      }}
    >
      <ThemeProviderContent>{children}</ThemeProviderContent>
    </NextThemesProvider>
  )
}

function ThemeProviderContent({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme, setTheme } = useNextTheme()

  // Get the current theme mode
  const currentTheme = theme === 'system' ? systemTheme : theme

  // Update state when component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider
      value={{
        mode: (theme as ThemeMode) || 'system',
        themeMode: (currentTheme as 'light' | 'dark') || 'light',
        setMode: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
