import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const ProductPriceConfigsFilter = () => {
  const t = useTranslations('dataManagement.products.priceConfig')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[productId]" label={t('productId')} className="mb-10" />
      <ControlledInput name="filter[priceplanId]" label={t('pricePlanId')} className="mb-10" />
      <ControlledInput name="filter[orgUnitId]" label={t('pricePlanId')} className="mb-10" />
      <ControlledInput
        name="filter[businesspartnerId]"
        label={t('pricePlanId')}
        className="mb-10"
      />
    </>
  )
}
