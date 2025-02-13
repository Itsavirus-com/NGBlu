'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceTypeForm from '../components/price-type-form.hook'
import PriceTypeForm from '../components/PriceTypeForm'

export default function NewPriceType() {
  const t = useTranslations('dataManagement.prices.types')
  const { methods, onSubmit } = usePriceTypeForm()

  return (
    <>
      <PageTitle title={t('newPriceType')} />
      <PriceTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
