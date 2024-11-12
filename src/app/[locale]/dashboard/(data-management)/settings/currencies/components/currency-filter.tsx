import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const CurrencyFilter = () => {
  const t = useTranslations('dataManagement.prices.currencies')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[currency]" label={t('currency')} className="mb-10" />
    </>
  )
}
