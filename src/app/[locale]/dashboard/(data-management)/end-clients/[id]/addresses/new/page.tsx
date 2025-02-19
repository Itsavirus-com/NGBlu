'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientAddressForm from '../../_components/EndClientAddressForm'
import useEndClientAddressForm from '../../_hooks/end-client-address-form.hook'

export default function NewEndClientAddress({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.endClients.addresses')

  const { methods, onSubmit } = useEndClientAddressForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newAddress')} />
      <EndClientAddressForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
