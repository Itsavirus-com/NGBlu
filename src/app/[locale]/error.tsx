'use client'

import * as Sentry from '@sentry/nextjs'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import serverErrorDark from '@/assets/images/misc/500-error-dark.png'
import serverError from '@/assets/images/misc/500-error.png'
import { Link } from '@/navigation'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const t = useTranslations('500')

  useEffect(() => {
    // Report the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-column flex-center text-center p-10">
          <div className="card card-flush  w-lg-650px py-5">
            <div className="card-body py-15 py-lg-20">
              <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">{t('title')}</h1>

              <div className="fw-semibold fs-6 text-gray-500 mb-7">{t('subtitle')}</div>

              <div className="mb-3">
                <Image src={serverError} className="mw-100 theme-light-show" alt="" />
                <Image src={serverErrorDark} className="mw-100 theme-dark-show" alt="" />
              </div>

              <div className="mb-0">
                <Link href="/dashboard" className="btn btn-sm btn-primary">
                  {t('cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
