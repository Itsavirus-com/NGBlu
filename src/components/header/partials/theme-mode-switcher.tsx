'use client'

import clsx from 'clsx'

import { KTIcon } from '@/components/kt-icon/kt-icon'

type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const ThemeModeSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'fs-1',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  const calculatedMode: string = 'light'
  const switchMode = (mode: string) => null

  return (
    <>
      <a
        href="#"
        className={clsx('btn btn-icon ', toggleBtnClass)}
        data-kt-menu-trigger={menuTrigger}
        data-kt-menu-attach="parent"
        data-kt-menu-placement={menuPlacement}
      >
        {calculatedMode === 'dark' && (
          <KTIcon iconName="moon" className={clsx('theme-light-hide', toggleBtnIconClass)} />
        )}

        {calculatedMode === 'light' && (
          <KTIcon iconName="night-day" className={clsx('theme-dark-hide', toggleBtnIconClass)} />
        )}
      </a>

      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"
        data-kt-menu="true"
      >
        <div className="menu-item px-3 my-0">
          <a
            href="#"
            className={clsx('menu-link px-3 py-2', { active: true })}
            onClick={() => switchMode('light')}
          >
            <span className="menu-icon" data-kt-element="icon">
              <KTIcon iconName="night-day" className="fs-1" />
            </span>
            <span className="menu-title">Light</span>
          </a>
        </div>

        <div className="menu-item px-3 my-0">
          <a href="#" className={clsx('menu-link px-3 py-2')} onClick={() => switchMode('dark')}>
            <span className="menu-icon" data-kt-element="icon">
              <KTIcon iconName="moon" className="fs-1" />
            </span>
            <span className="menu-title">Dark</span>
          </a>
        </div>

        <div className="menu-item px-3 my-0">
          <a href="#" className={clsx('menu-link px-3 py-2')} onClick={() => switchMode('system')}>
            <span className="menu-icon" data-kt-element="icon">
              <KTIcon iconName="screen" className="fs-1" />
            </span>
            <span className="menu-title">System</span>
          </a>
        </div>
      </div>
    </>
  )
}

export { ThemeModeSwitcher }
