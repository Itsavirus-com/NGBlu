import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const ServiceTypesFilter = () => {
  const t = useTranslations('dataManagement.services.types')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[service_type]" label={t('type')} className="mb-10" />
    </>
  )
}
