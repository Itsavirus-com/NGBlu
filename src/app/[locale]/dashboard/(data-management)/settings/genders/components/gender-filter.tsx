import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const GenderFilter = () => {
  const t = useTranslations('dataManagement.genders')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[gender]" label={t('gender')} className="mb-10" />
    </>
  )
}
