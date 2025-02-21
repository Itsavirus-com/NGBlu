'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PriceIntervalForm from '../_components/PriceIntervalForm'
import usePriceIntervalForm from '../_hooks/price-interval-form.hook'

export default function NewPriceInterval() {
  const t = useTranslations('dataManagement.prices.intervals')
  const { methods, onSubmit, isSubmitting } = usePriceIntervalForm()

  return (
    <>
      <PageTitle title={t('newPriceInterval')} />
      <PriceIntervalForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
