import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const PriceUnitsFilter = () => {
  const t = useTranslations('dataManagement.prices.units')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[unit]" label={t('unit')} className="mb-10" />
    </>
  )
}
