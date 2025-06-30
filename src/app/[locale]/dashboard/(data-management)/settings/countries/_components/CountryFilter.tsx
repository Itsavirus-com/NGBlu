import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const CountryFilter = () => {
  const t = useTranslations('dataManagement.countries')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('name')} className="mb-5" />
      <ControlledInput name="filter[iso]" label={t('iso')} className="mb-10" />
    </>
  )
}
