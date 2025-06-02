import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const EndClientContactFilter = () => {
  const t = useTranslations('dataManagement.endClients.contacts')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[contactInfoId]" label={t('contactInfoId')} className="mb-10" />
      <ControlledInput
        name="filter[responsibilityId]"
        label={t('responsibilityId')}
        className="mb-10"
      />
    </>
  )
}
