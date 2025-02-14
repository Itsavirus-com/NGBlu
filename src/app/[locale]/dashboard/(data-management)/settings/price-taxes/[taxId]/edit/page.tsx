'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceTaxForm from '../../components/price-tax-form.hook'
import PriceTaxForm from '../../components/PriceTaxForm'

export default function UpdatePriceTax({ params }: { params: { taxId: number } }) {
  const t = useTranslations('dataManagement.prices.taxes')
  const { methods, onSubmit } = usePriceTaxForm(Number(params.taxId))

  return (
    <>
      <PageTitle title={t('updatePriceTax')} />
      <PriceTaxForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
