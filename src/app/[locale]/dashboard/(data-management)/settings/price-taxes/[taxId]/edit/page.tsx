'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PriceTaxForm from '../../_components/PriceTaxForm'
import usePriceTaxForm from '../../_hooks/price-tax-form.hook'

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
