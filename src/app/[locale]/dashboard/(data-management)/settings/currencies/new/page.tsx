'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import CurrencyForm from '../_components/CurrencyForm'
import useCurrencyForm from '../_hooks/currency-form.hook'

export default function NewCurrency() {
  const t = useTranslations('dataManagement.prices.currencies')
  const { methods, onSubmit, isSubmitting } = useCurrencyForm()

  return (
    <>
      <PageTitle title={t('newCurrency')} />
      <CurrencyForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
