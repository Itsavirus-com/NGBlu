'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import AddressTypeForm from '../../_components/AddressTypeForm'
import useAddressTypeForm from '../../_hooks/address-type-form.hook'

export default function UpdateAddressType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addressTypes')
  const { methods, onSubmit, isSubmitting } = useAddressTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateAddressType')} />
      <AddressTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
