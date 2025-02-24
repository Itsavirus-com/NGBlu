'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import PriceUnitForm from '../../_components/PriceUnitForm'
import usePriceUnitForm from '../../_hooks/price-unit-form.hook'

export default function UpdatePriceUnit({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.units')
  const { methods, onSubmit, isSubmitting, isLoading } = usePriceUnitForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceUnit')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PriceUnitForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
