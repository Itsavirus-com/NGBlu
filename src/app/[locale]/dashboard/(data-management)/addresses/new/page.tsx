'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import AddressForm from '../_components/AddressForm'
import useAddressForm from '../_hooks/address-form.hook'

export default function NewAddress() {
  const t = useTranslations('dataManagement.addresses')
  const { methods, onSubmit, isSubmitting, displayMapCoordinates, handleAddressSelect } =
    useAddressForm()

  return (
    <>
      <PageTitle title={t('newAddress')} />
      <AddressForm
        displayMapCoordinates={displayMapCoordinates}
        handleAddressSelect={handleAddressSelect}
        methods={methods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
