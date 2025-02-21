'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PriceConfigForm from '../_components/PriceConfigForm'
import usePriceConfigForm from '../_hooks/price-config-form.hook'

export default function NewPriceConfig() {
  const t = useTranslations('dataManagement.prices.configs')
  const { methods, onSubmit, isSubmitting } = usePriceConfigForm()

  return (
    <>
      <PageTitle title={t('newPriceConfig')} />
      <PriceConfigForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
