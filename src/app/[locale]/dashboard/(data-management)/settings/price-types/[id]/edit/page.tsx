'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PriceTypeForm from '../../_components/PriceTypeForm'
import usePriceTypeForm from '../../_hooks/price-type-form.hook'

export default function UpdatePriceType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.types')
  const { methods, onSubmit, isSubmitting } = usePriceTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceType')} />
      <PriceTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
