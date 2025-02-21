import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const OrganizationUnitFilter = () => {
  const t = useTranslations('dataManagement.organizationUnits')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('name')} className="mb-10" />
    </>
  )
}
