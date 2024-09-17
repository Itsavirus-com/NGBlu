import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const ContactFilter = () => {
  const t = useTranslations('dataManagement.persons.contacts')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-10" />
    </>
  )
}
