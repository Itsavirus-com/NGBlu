'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePriceTaxForm from '../components/price-tax-form.hook'
import PriceTaxForm from '../components/PriceTaxForm'

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
