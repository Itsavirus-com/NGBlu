'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceIntervalForm from '../components/price-interval-form.hook'
import PriceIntervalForm from '../components/PriceIntervalForm'

export default function NewPriceInterval() {
  const t = useTranslations('dataManagement.prices.intervals')
  const { methods, onSubmit } = usePriceIntervalForm()

  return (
    <>
      <PageTitle title={t('newPriceInterval')} />
      <PriceIntervalForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
