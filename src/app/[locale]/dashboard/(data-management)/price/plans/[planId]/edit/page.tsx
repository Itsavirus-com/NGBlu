'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PricePlanForm from '../../_components/PricePlanForm'
import usePricePlanForm from '../../_hooks/price-plan-form.hook'

export default function UpdatePricePlan({ params }: { params: { planId: number } }) {
  const t = useTranslations('dataManagement.prices.plans')
  const { methods, handleChange, onSubmit, isSubmitting } = usePricePlanForm(Number(params?.planId))

  return (
    <>
      <PageTitle title={t('updatePricePlan')} />
      <PricePlanForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
