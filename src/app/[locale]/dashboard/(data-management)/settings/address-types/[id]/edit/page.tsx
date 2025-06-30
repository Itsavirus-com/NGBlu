'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import AddressTypeForm from '../../_components/AddressTypeForm'
import useAddressTypeForm from '../../_hooks/address-type-form.hook'

export default function UpdateAddressType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addressTypes')
  const { methods, onSubmit, isSubmitting, isLoading } = useAddressTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateAddressType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <AddressTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
