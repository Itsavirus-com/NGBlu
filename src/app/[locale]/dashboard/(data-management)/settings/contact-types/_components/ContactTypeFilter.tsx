import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const ContactTypeFilter = () => {
  const t = useTranslations('dataManagement.contactTypes')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[contactType]" label={t('type')} className="mb-10" />
    </>
  )
}
