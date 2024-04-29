import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logos/ng-blu.png'
import logoSquare from '@/assets/images/logos/ng-blu.svg'

import { KTIcon } from '../kt-icon/kt-icon'

const SidebarLogo = () => {
  return (
    <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
      <Link href="/dashboard">
        <Image alt="Logo" src={logo} height={40} className="h-40px app-sidebar-logo-default" />

        <Image
          alt="Logo"
          src={logoSquare}
          width={40}
          className="h-40px app-sidebar-logo-minimize"
        />
      </Link>

      <div
        id="kt_app_sidebar_toggle"
        className={clsx(
          'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate'
        )}
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="app-sidebar-minimize"
      >
        <KTIcon iconName="black-left-line" className="fs-3 rotate-180 ms-1" />
      </div>
    </div>
  )
}

export { SidebarLogo }
