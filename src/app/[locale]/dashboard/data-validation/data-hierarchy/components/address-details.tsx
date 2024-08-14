import { useTranslations } from 'next-intl'

import { AddressDetailsProps } from './address-details.type'
import { TextWithLabel } from './text-with-label'

export const AddressDetails = ({ address, addressType }: AddressDetailsProps) => {
  const t = useTranslations('data_validation.data_hierarchy.address')

  return (
    <>
      <TextWithLabel className="mt-5" label={t('addressName')} value={address?.addressName} />
      {addressType && <TextWithLabel label={t('addressType')} value={addressType.addressType} />}
      <TextWithLabel label={t('streetName')} value={address?.streetname} />
      <TextWithLabel label={t('houseNumber')} value={address?.housenumber} />
      <TextWithLabel label={t('houseNumberSuffix')} value={address?.housenumberSuffix} />
      <TextWithLabel label={t('apartmentNumber')} value={address?.appartmentNumber} />
      <TextWithLabel label={t('area')} value={address?.area} />
      <TextWithLabel label={t('county')} value={address?.county} />
      <TextWithLabel label={t('city')} value={address?.city} />
      <TextWithLabel label={t('country')} value={address?.country?.name} />
      <TextWithLabel label={t('postalCode')} value={address?.postalcode} />
    </>
  )
}
