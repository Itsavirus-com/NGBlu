'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootCustomerForm } from '../../_components/EnterpriseRootCustomerForm'
import useEnterpriseRootCustomerForm from '../../_hooks/enterprise-root-customer-form.hook'

export default function NewEnterpriseRootCustomer({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.enterpriseRoots.customers')

  const { methods, onSubmit, isSubmitting } = useEnterpriseRootCustomerForm()

  return (
    <>
      <PageTitle title={t('newCustomer')} />
      <EnterpriseRootCustomerForm
        enterpriseRootId={params.id}
        methods={methods}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
