import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import avatar from '@/assets/images/avatars/300-3.jpg'

import { Languages } from './languages'

const HeaderUserMenu: FC = () => {
  const t = useTranslations('common.navbar')
  const { data: session } = useSession()

  return (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-kt-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <Image alt="Logo" src={avatar} />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">{session?.user?.name}</div>
            <a href="#" className="fw-bold text-muted text-hover-primary fs-7">
              {session?.user?.email}
            </a>
          </div>
        </div>
      </div>

      <div className="separator my-2"></div>

      <Languages />

      <div className="menu-item px-5 my-1">
        <Link href="/dashboard/account-profile-settings" className="menu-link px-5">
          {t('account_settings')}
        </Link>
      </div>

      <div className="menu-item px-5" data-kt-menu-trigger="click">
        <div className="menu-link px-5" onClick={() => signOut()}>
          {t('sign_out')}
        </div>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
