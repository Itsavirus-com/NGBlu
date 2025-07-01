'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'
import { KTIcon } from '@/components/kt-icon/KtIcon'

import './SecurityEnforcementBanner.style.scss'

export function SecurityEnforcementBanner() {
  const t = useTranslations('dashboard.security')
  const router = useRouter()

  const handleStartSetup = () => {
    router.push('/dashboard/account-profile-settings')
  }

  return (
    <div
      className="alert alert-warning d-flex align-items-center mb-4 mt-5 security-banner"
      role="alert"
    >
      <KTIcon iconName="shield-cross" className="text-warning fs-2x me-3" />
      <div className="flex-grow-1">
        <h4 className="alert-heading mb-1 text-dark">{t('totpEnforcement.title')}</h4>
        <p className="mb-2 text-dark">{t('totpEnforcement.description')}</p>
        <small className="text-dark">{t('totpEnforcement.subtitle')}</small>
      </div>
      <Button
        onClick={handleStartSetup}
        className="ms-3 security-button"
        colorClass="success"
        label={t('totpEnforcement.setupButton')}
      />
    </div>
  )
}
