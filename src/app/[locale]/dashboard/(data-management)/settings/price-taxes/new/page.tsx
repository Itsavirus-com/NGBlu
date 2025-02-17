'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PriceTaxForm from '../_components/PriceTaxForm'
import usePriceTaxForm from '../_hooks/price-tax-form.hook'

export default function NewPriceTax() {
  const t = useTranslations('dataManagement.prices.taxes')
  const { methods, onSubmit } = usePriceTaxForm()

  return (
    <>
      <PageTitle title={t('newPriceTax')} />
      <PriceTaxForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
