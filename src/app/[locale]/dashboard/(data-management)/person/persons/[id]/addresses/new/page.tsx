'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { PersonAddressForm } from '../../_components/PersonAddressForm'
import usePersonAddressForm from '../../_hooks/address-form.hook'

export default function NewPersonAddress() {
  const t = useTranslations('dataManagement.persons.addresses')

  const { methods, onSubmit } = usePersonAddressForm()

  return (
    <>
      <PageTitle title={t('newPersonAddress')} />
      <PersonAddressForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
