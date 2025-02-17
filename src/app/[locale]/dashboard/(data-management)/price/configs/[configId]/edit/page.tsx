'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import PriceConfigForm from '../../_components/PriceConfigForm'
import usePriceConfigForm from '../../_hooks/price-config-form.hook'

export default function UpdatePriceConfig({ params }: { params: { configId: number } }) {
  const t = useTranslations('dataManagement.prices.configs')
  const { methods, onSubmit, isLoading } = usePriceConfigForm(Number(params.configId))

  return (
    <>
      <PageTitle title={t('updatePriceConfig')} />
      {isLoading ? <Loading /> : <PriceConfigForm methods={methods} onSubmit={onSubmit} />}
    </>
  )
}
