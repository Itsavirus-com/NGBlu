'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceIntervalForm from '../../components/price-interval-form.hook'
import PriceIntervalForm from '../../components/PriceIntervalForm'

export default function UpdatePriceInterval({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.intervals')
  const { methods, onSubmit } = usePriceIntervalForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceInterval')} />
      <PriceIntervalForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
