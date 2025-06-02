import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const PriceTaxesFilter = () => {
  const t = useTranslations('dataManagement.prices.taxes')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('name')} className="mb-10" />
    </>
  )
}
