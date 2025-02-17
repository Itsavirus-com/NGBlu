'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useAddressTypeForm from '../../components/address-type-form.hook'
import AddressTypeForm from '../../components/AddressTypeForm'

export default function UpdateAddressType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addressTypes')
  const { methods, onSubmit } = useAddressTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateAddressType')} />
      <AddressTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
