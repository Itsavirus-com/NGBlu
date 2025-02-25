'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import microsoftIcon from '@/assets/images/brand-logos/microsoft-5.svg'
import { Button } from '@/components/button/button'
import { FormProvider } from '@/components/forms/form-provider'
import { ControlledInput } from '@/components/forms/input'
import { Link } from '@/navigation'

import { useLogin } from './_hooks/login.hook'

export default function Login() {
  const t = useTranslations('auth.login')
  const { methods, onSubmit } = useLogin()

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="app-container container-fluid">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <div className="text-gray-600">Sign in to InfraOrders 2.0</div>
        </div>

        {/* Microsoft Sign In Button */}
        <div
          onClick={() => signIn('azure-ad')}
          className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100"
        >
          <Image alt="Logo" src={microsoftIcon} width={15} height={15} className="h-15px me-3" />
          {t('signInButton')}
        </div>

        <div className="d-flex align-items-center my-8">
          <hr className="flex-grow-1 border-2" />
          <span className="text-gray-500 text-nowrap px-3">{t('orContinueWith')}</span>
          <hr className="flex-grow-1 border-2" />
        </div>

        {/* Email Input */}
        <ControlledInput
          label={t('email')}
          name="email"
          type="email"
          placeholder="mail@example.com"
          containerClass="mb-6"
          isRequired
        />

        {/* Password Input */}
        <div className="mb-6">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label fw-bold">{t('password')}</label>
            <Link href="/auth/reset-password" className="text-primary">
              {t('forgotPassword')}
            </Link>
          </div>
          <ControlledInput name="password" type="password" isRequired />
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          label={t('signIn')}
          colorClass="primary"
          className="w-100 flex-center "
        />
      </div>
    </FormProvider>
  )
}
