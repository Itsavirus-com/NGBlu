import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const UserFilter = () => {
  const t = useTranslations('dataManagement.users')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[displayName]" label={t('displayName')} className="mb-5" />
      <ControlledInput name="filter[email]" label={t('email')} className="mb-10" />
    </>
  )
}
