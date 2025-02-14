'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import AddressForm from '../../_components/AddressForm'
import useAddressForm from '../../_hooks/address-form.hook'

export default function UpdateAddress({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.addresses')

  const { methods, onSubmit, isLoading, getFormattedAddress, handleLocationSelect } =
    useAddressForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateAddress')} />
      {isLoading ? (
        <Loading />
      ) : (
        <AddressForm
          methods={methods}
          onSubmit={onSubmit}
          getFormattedAddress={getFormattedAddress}
          handleLocationSelect={handleLocationSelect}
        />
      )}
    </>
  )
}
