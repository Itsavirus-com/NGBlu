import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const ServicePriceConfigsFilter = () => {
  const t = useTranslations('dataManagement.services.priceConfig')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[serviceId]" label={t('serviceId')} className="mb-10" />
      <ControlledInput name="filter[pricePlanId]" label={t('pricePlanId')} className="mb-10" />
    </>
  )
}
