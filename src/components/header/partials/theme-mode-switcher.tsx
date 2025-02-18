import clsx from 'clsx'
import { useState } from 'react'

import { KTIcon } from '@/components/kt-icon/kt-icon'
import { useTheme } from '@/contexts/ThemeContext'

type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const ThemeModeSwitcher = ({ toggleBtnClass = '', toggleBtnIconClass = 'fs-1' }: Props) => {
  const { mode, themeMode, setMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const switchMode = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode)
    setIsOpen(false)
  }

  return (
    <div className="position-relative">
      <button
        type="button"
        className={clsx('btn btn-icon', toggleBtnClass)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {themeMode === 'dark' && (
          <KTIcon iconName="moon" className={clsx('theme-light-hide', toggleBtnIconClass)} />
        )}
        {themeMode === 'light' && (
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
              'active btn-active-light-primary': themeMode === 'light',
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
              'active btn-active-light-primary': themeMode === 'dark',
            })}
            style={{ color: 'var(--bs-body-color)' }}
            onClick={() => switchMode('dark')}
          >
            <KTIcon iconName="moon" className="fs-2 me-2" />
            Dark
          </button>

          <button
            type="button"
            className={clsx('btn w-100 text-start', {
              'active btn-active-light-primary': mode === 'system',
            })}
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
