'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { PersonAddressForm } from '../../../_components/PersonAddressForm'
import usePersonAddressForm from '../../../_hooks/address-form.hook'

export default function UpdatePersonAddress({ params }: { params: { addressId: number } }) {
  const t = useTranslations('dataManagement.persons.addresses')

  const { methods, onSubmit, isSubmitting } = usePersonAddressForm(Number(params.addressId))

  return (
    <>
      <PageTitle title={t('updatePersonAddress')} />
      <PersonAddressForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
