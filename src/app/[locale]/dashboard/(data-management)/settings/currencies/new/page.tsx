'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCurrencyForm from '../components/currency-form.hook'
import CurrencyForm from '../components/CurrencyForm'

export default function NewCurrency() {
  const t = useTranslations('dataManagement.prices.currencies')
  const { methods, onSubmit } = useCurrencyForm()

  return (
    <>
      <PageTitle title={t('newCurrency')} />
      <CurrencyForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
