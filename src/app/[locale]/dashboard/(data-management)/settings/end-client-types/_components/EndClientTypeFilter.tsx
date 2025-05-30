import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const EndClientTypeFilter = () => {
  const t = useTranslations('dataManagement.endClientTypes')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[type]" label={t('type')} className="mb-10" />
    </>
  )
}
