'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceUnitForm from '../components/price-unit-form.hook'
import PriceUnitForm from '../components/PriceUnitForm'

export default function NewPriceUnit() {
  const t = useTranslations('dataManagement.prices.units')
  const { methods, onSubmit } = usePriceUnitForm()

  return (
    <>
      <PageTitle title={t('newPriceUnit')} />
      <PriceUnitForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
