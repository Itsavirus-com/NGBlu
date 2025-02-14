'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useCurrencyForm from '../../components/currency-form.hook'
import CurrencyForm from '../../components/CurrencyForm'

export default function UpdateCurrency({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.currencies')
  const { methods, onSubmit } = useCurrencyForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCurrency')} />
      <CurrencyForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
