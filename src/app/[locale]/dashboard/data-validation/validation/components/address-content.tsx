import { useTranslations } from 'next-intl'

import { ContentProps } from './dynamic-drawer.type'
import { TextWithLabel } from './text-with-label'

export const AddressContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.validation')

  return (
    <>
      <TextWithLabel label={t('address.addressName')} value={data.address.addressName} />
      <TextWithLabel label={t('address.addressType')} value={data.addressType.addressType} />
      <TextWithLabel label={t('address.streetName')} value={data.address.streetname} />
      <TextWithLabel label={t('address.houseNumber')} value={data.address.housenumber} />
      <TextWithLabel
        label={t('address.houseNumberSuffix')}
        value={data.address.housenumberSuffix}
      />
      <TextWithLabel label={t('address.apartmentNumber')} value={data.address.appartmentNumber} />
      <TextWithLabel label={t('address.area')} value={data.address.area} />
      <TextWithLabel label={t('address.county')} value={data.address.county} />
      <TextWithLabel label={t('address.city')} value={data.address.city} />
      <TextWithLabel label={t('address.country')} value={data.address.country.name} />
      <TextWithLabel label={t('address.postalCode')} value={data.address.postalcode} />
    </>
  )
}
