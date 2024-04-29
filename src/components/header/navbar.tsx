import clsx from 'clsx'
import Image from 'next/image'

import avatar from '@/assets/images/avatars/300-3.jpg'

import { HeaderUserMenu } from './partials/header-user-menu'
import { ThemeModeSwitcher } from './partials/theme-mode-switcher'

const Navbar = () => {
  return (
    <div className="app-navbar flex-shrink-0">
      <div className={clsx('app-navbar-item', 'ms-1 ms-md-4')}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-primary btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', 'ms-1 ms-md-4')}>
        <div
          className={clsx('cursor-pointer symbol', 'symbol-35px show menu-dropdown')}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <Image src={avatar} alt="" />
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  )
}

export { Navbar }
