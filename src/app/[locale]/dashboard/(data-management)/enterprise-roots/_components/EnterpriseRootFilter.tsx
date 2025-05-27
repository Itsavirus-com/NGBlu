import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'

export const EnterpriseRootFilter = () => {
  const t = useTranslations('dataManagement.enterpriseRoots')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[name]" label={t('name')} className="mb-10" />
      <ControlledInput name="filter[ouUnitId]" label={t('organisationUnitId')} className="mb-10" />
      <ControlledInput
        name="filter[enterpriseRootAddressesId]"
        label={t('enterpriseRootAddressId')}
        className="mb-10"
      />
    </>
  )
}
