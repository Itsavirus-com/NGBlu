'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import { EnterpriseRootCustomerForm } from '../../../_components/EnterpriseRootCustomerForm'
import useEnterpriseRootCustomerForm from '../../../_hooks/enterprise-root-customer-form.hook'

export default function UpdateEnterpriseRootCustomer({
  params,
}: {
  params: { id: number; customerId: number }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const { methods, onSubmit, isLoading, isSubmitting } = useEnterpriseRootCustomerForm(
    params.customerId
  )

  return (
    <>
      <PageTitle title={t('updateCustomer')} />
      {isLoading ? (
        <Loading />
      ) : (
        <EnterpriseRootCustomerForm
          enterpriseRootId={params.id}
          methods={methods}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
