import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PackageProductFilter = () => {
  const t = useTranslations('dataManagement.packages')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[packageId]" label={t('packageId')} className="mb-10" />
      <ControlledInput name="filter[productId]" label={t('productId')} className="mb-10" />
      <ControlledInput
        name="filter[productPricingConfigId]"
        label={t('productPricingConfigId')}
        className="mb-10"
      />
    </>
  )
}
