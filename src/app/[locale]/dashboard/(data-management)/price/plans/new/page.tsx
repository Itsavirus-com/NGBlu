'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PricePlanForm from '../_components/PricePlanForm'
import usePricePlanForm from '../_hooks/price-plan-form.hook'

export default function NewPriceConfig() {
  const t = useTranslations('dataManagement.prices.plans')
  const { methods, handleChange, onSubmit, isSubmitting } = usePricePlanForm()

  return (
    <>
      <PageTitle title={t('newPricePlan')} />
      <PricePlanForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
