import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { KTIcon } from '@/components/kt-icon/kt-icon'

type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const ThemeModeSwitcher = ({ toggleBtnClass = '', toggleBtnIconClass = 'fs-1' }: Props) => {
  const [mode, setMode] = useState<string>(() => {
    // Initialize from localStorage or default to 'light'
    return localStorage.getItem('theme-mode') || 'light'
  })
  const [isOpen, setIsOpen] = useState(false)

  const calculateMode = () => {
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return mode
  }

  const switchMode = (newMode: string) => {
    setMode(newMode)
    localStorage.setItem('theme-mode', newMode)

    if (newMode === 'system') {
      const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      document.documentElement.setAttribute('data-bs-theme', systemMode)
    } else {
      document.documentElement.setAttribute('data-bs-theme', newMode)
    }

    setIsOpen(false)
  }

  // Initialize theme on mount and handle system changes
  useEffect(() => {
    // Apply theme immediately on mount
    const currentMode = calculateMode()
    document.documentElement.setAttribute('data-bs-theme', currentMode)

    // Handle system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        const newTheme = e.matches ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [mode]) // Only re-run if mode changes

  const calculatedMode = calculateMode()

  return (
    <div className="position-relative">
      <button
        type="button"
        className={clsx('btn btn-icon', toggleBtnClass)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {calculatedMode === 'dark' && (
          <KTIcon iconName="moon" className={clsx('theme-light-hide', toggleBtnIconClass)} />
        )}
        {calculatedMode === 'light' && (
          <KTIcon iconName="night-day" className={clsx('theme-dark-hide', toggleBtnIconClass)} />
        )}
      </button>

      {isOpen && (
        <div
          className="position-absolute top-100 end-0 mt-2 rounded shadow-sm p-2"
          style={{
            minWidth: '175px',
            zIndex: 105,
            backgroundColor: 'var(--bs-body-bg)',
            border: '1px solid var(--bs-border-color)',
          }}
        >
          <button
            type="button"
            className={clsx('btn w-100 text-start mb-2', {
              'active btn-active-light-primary': calculatedMode === 'light',
            })}
            style={{ color: 'var(--bs-body-color)' }}
            onClick={() => switchMode('light')}
          >
            <KTIcon iconName="night-day" className="fs-2 me-2" />
            Light
          </button>

          <button
            type="button"
            className={clsx('btn w-100 text-start mb-2', {
              'active btn-active-light-primary': calculatedMode === 'dark',
            })}
            style={{ color: 'var(--bs-body-color)' }}
            onClick={() => switchMode('dark')}
          >
            <KTIcon iconName="moon" className="fs-2 me-2" />
            Dark
          </button>

          <button
            type="button"
            className={clsx('btn w-100 text-start')}
            style={{ color: 'var(--bs-body-color)' }}
            onClick={() => switchMode('system')}
          >
            <KTIcon iconName="screen" className="fs-2 me-2" />
            System
          </button>
        </div>
      )}
    </div>
  )
}

export { ThemeModeSwitcher }
