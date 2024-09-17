import { useTranslations } from 'next-intl'

import { AddressDetails } from './address-details'
import { ContentProps } from './dynamic-drawer.type'

export const AddressContent = ({ data }: ContentProps) => {
  const t = useTranslations('dataValidation.dataHierarchy')

  return <AddressDetails address={data.address} addressType={data.addressType} />
}
