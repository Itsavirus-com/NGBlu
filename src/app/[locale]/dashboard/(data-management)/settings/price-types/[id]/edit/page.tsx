'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import PriceTypeForm from '../../_components/PriceTypeForm'
import usePriceTypeForm from '../../_hooks/price-type-form.hook'

export default function UpdatePriceType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.types')
  const { methods, onSubmit, isSubmitting, isLoading } = usePriceTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PriceTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
