import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PackageServiceFilter = () => {
  const t = useTranslations('dataManagement.packages')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[packageId]" label={t('packageId')} className="mb-10" />
      <ControlledInput name="filter[serviceId]" label={t('serviceId')} className="mb-10" />
      <ControlledInput
        name="filter[servicePricingConfigId]"
        label={t('servicePricingConfigId')}
        className="mb-10"
      />
    </>
  )
}
