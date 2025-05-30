import { useTranslations } from 'next-intl'

import { ControlledInput } from '@/components/forms/controlled-input/controlled-input'

export const BusinessPartnerProjectFilter = () => {
  const t = useTranslations('dataManagement.businessPartners.projects')

  return (
    <>
      <ControlledInput name="filter[id]" label={t('id')} className="mb-5" />
      <ControlledInput name="filter[projectId]" label={t('projectId')} className="mb-5" />
      <ControlledInput
        name="filter[businesspartnersAddressesId]"
        label={t('businessPartnerAddressId')}
        className="mb-5"
      />
    </>
  )
}
