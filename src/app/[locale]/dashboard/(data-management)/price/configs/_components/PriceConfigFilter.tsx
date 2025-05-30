import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PriceConfigFilter = () => {
  const t = useTranslations('dataManagement.prices.configs')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-10" />
    </>
  )
}
