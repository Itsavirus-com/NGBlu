import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PriceIntervalsFilter = () => {
  const t = useTranslations('dataManagement.prices.intervals')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('name')} className="mb-10" />
    </>
  )
}
