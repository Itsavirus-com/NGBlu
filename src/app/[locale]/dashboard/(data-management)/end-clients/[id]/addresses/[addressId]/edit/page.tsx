'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import EndClientAddressForm from '../../../_components/EndClientAddressForm'
import useEndClientAddressForm from '../../../_hooks/end-client-address-form.hook'

export default function UpdateEndClientAddress({
  params,
}: {
  params: { id: string; addressId: string }
}) {
  const t = useTranslations('dataManagement.endClients.addresses')

  const { methods, onSubmit, isLoading, isSubmitting } = useEndClientAddressForm(
    Number(params.id),
    Number(params.addressId)
  )

  return (
    <>
      <PageTitle title={t('updateAddress')} />
      {isLoading ? (
        <Loading />
      ) : (
        <EndClientAddressForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
