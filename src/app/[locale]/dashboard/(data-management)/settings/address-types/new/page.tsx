'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useAddressTypeForm from '../components/address-type-form.hook'
import AddressTypeForm from '../components/AddressTypeForm'

export default function NewAddressType() {
  const t = useTranslations('dataManagement.addressTypes')
  const { methods, onSubmit } = useAddressTypeForm()

  return (
    <>
      <PageTitle title={t('newAddressType')} />
      <AddressTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
