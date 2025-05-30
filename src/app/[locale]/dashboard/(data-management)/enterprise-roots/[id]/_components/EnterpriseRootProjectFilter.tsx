import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const EnterpriseRootProjectFilter = () => {
  const t = useTranslations('dataManagement.enterpriseRoots.projects')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[projectId]" label={t('projectId')} className="mb-5" />
      <ControlledInput
        name="filter[enterpriseRootAddressesId]"
        label={t('addressId')}
        className="mb-5"
      />
    </>
  )
}
