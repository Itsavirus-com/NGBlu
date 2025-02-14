'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceUnitForm from '../../components/price-unit-form.hook'
import PriceUnitForm from '../../components/PriceUnitForm'

export default function UpdatePriceUnit({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.units')
  const { methods, onSubmit } = usePriceUnitForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceUnit')} />
      <PriceUnitForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
