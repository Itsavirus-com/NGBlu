import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import avatar from '@/assets/images/avatars/300-3.jpg'
import { passwordVerificationUtils } from '@/utils/password-verification'

import { Languages } from './languages'

const HeaderUserMenu: FC = () => {
  const router = useRouter()
  const t = useTranslations('common.navbar')
  const { data: session } = useSession()

  const handleSignOut = () => {
    // Clear all sensitive data from localStorage before signing out
    passwordVerificationUtils.clearVerification()
    // Set a flag to indicate intentional logout
    sessionStorage.setItem('intentional_logout', 'true')
    signOut({ redirect: false })
    router.push('/auth/login')
  }

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
            <a
              href="#"
              className="fw-bold text-muted text-hover-primary fs-7 text-truncate d-block"
              style={{ maxWidth: '180px' }}
            >
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
        <div className="menu-link px-5" onClick={handleSignOut}>
          {t('sign_out')}
        </div>
      </div>
    </div>
  )
}

export { HeaderUserMenu }
