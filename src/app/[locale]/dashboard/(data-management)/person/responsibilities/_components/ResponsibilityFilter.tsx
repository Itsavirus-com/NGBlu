import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const PersonResponsibilityFilter = () => {
  const t = useTranslations('dataManagement.personResponsibilities')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[responsibility]" label={t('responsibility')} className="mb-5" />
    </>
  )
}
