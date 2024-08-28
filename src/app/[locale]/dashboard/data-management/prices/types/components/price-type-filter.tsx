import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const PriceTypesFilter = () => {
  const t = useTranslations('dataManagement.prices.types')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[type]" label={t('type')} className="mb-10" />
    </>
  )
}
