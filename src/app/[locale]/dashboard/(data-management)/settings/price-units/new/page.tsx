'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PriceUnitForm from '../_components/PriceUnitForm'
import usePriceUnitForm from '../_hooks/price-unit-form.hook'

export default function NewPriceUnit() {
  const t = useTranslations('dataManagement.prices.units')
  const { methods, onSubmit, isSubmitting } = usePriceUnitForm()

  return (
    <>
      <PageTitle title={t('newPriceUnit')} />
      <PriceUnitForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
