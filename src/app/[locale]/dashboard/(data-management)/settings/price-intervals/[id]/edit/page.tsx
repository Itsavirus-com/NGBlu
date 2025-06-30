'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import PriceIntervalForm from '../../_components/PriceIntervalForm'
import usePriceIntervalForm from '../../_hooks/price-interval-form.hook'

export default function UpdatePriceInterval({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.intervals')
  const { methods, onSubmit, isSubmitting, isLoading } = usePriceIntervalForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceInterval')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PriceIntervalForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
