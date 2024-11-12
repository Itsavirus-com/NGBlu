import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/input'

export const EndClientProjectFilter = () => {
  const t = useTranslations('dataManagement.endClients.projects')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[projectId]" label={t('projectId')} className="mb-10" />
      <ControlledInput
        name="filter[endclientAddressesId]"
        label={t('addressId')}
        className="mb-10"
      />
    </>
  )
}
