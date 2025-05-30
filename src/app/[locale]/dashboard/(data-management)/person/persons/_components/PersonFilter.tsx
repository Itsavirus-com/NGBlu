import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PersonFilter = () => {
  const t = useTranslations('dataManagement.persons')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[firstname]" label={t('firstName')} className="mb-5" />
      <ControlledInput name="filter[lastname]" label={t('lastName')} className="mb-5" />
      <ControlledInput name="filter[department]" label={t('department')} className="mb-5" />
      <ControlledInput name="filter[role]" label={t('role')} className="mb-10" />
    </>
  )
}
