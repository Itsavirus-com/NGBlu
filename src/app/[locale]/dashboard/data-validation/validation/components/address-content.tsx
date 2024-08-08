import { useTranslations } from 'next-intl'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'

export const AddressContent = ({ data }: ContentProps) => {
  const t = useTranslations('data_validation.validation')

  return <AddressDetails address={data.address} addressType={data.addressType} />
}
