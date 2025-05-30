import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PriceUnitsFilter = () => {
  const t = useTranslations('dataManagement.prices.units')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[unit]" label={t('unit')} className="mb-10" />
    </>
  )
}
