'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import CurrencyForm from '../../_components/CurrencyForm'
import useCurrencyForm from '../../_hooks/currency-form.hook'

export default function UpdateCurrency({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.currencies')
  const { methods, onSubmit, isSubmitting, isLoading } = useCurrencyForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateCurrency')} />
      {isLoading ? (
        <Loading />
      ) : (
        <CurrencyForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
