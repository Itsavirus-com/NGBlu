import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const CreditCardTypeFilter = () => {
  const t = useTranslations('dataManagement.creditCardTypes')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[creditcardType]" label={t('type')} className="mb-5" />
    </>
  )
}
