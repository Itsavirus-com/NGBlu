'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootAddressForm } from '../../../_components/EnterpriseRootAddressForm'
import useEnterpriseRootAddressForm from '../../../_hooks/enterprise-root-address-form.hook'

export default function UpdateEnterpriseRoot({
  params,
}: {
  params: { addressId: string; id: string }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  const { methods, onSubmit, isSubmitting } = useEnterpriseRootAddressForm(Number(params.addressId))

  return (
    <>
      <PageTitle title={t('updateAddress')} />
      <EnterpriseRootAddressForm
        methods={methods}
        onSubmit={onSubmit}
        enterpriseRootId={params.id}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
