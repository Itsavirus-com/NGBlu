'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootAddressForm } from '../../_components/EnterpriseRootAddressForm'
import useEnterpriseRootAddressForm from '../../_hooks/enterprise-root-address-form.hook'

export default function NewEnterpriseRoot({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.enterpriseRoots.addresses')

  const { methods, onSubmit } = useEnterpriseRootAddressForm()

  return (
    <>
      <PageTitle title={t('newAddress')} />

      <EnterpriseRootAddressForm
        methods={methods}
        onSubmit={onSubmit}
        enterpriseRootId={params.id}
      />
    </>
  )
}
