'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceTypeForm from '../../components/price-type-form.hook'
import PriceTypeForm from '../../components/PriceTypeForm'

export default function UpdatePriceType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.prices.types')
  const { methods, onSubmit } = usePriceTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePriceType')} />
      <PriceTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
