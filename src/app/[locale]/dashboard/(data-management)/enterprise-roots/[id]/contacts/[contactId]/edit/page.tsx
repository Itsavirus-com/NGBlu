'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import { EnterpriseRootContactFormFields } from '../../../_components/EnterpriseRootContactForm'
import useEnterpriseRootContactForm from '../../../_hooks/enterprise-root-contact-form.hook'

export default function UpdateEnterpriseRootContact({
  params,
}: {
  params: { contactId: string; id: string }
}) {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  const { methods, onSubmit, isLoading, isSubmitting } = useEnterpriseRootContactForm(
    Number(params.contactId)
  )

  return (
    <>
      <PageTitle title={t('updateContact')} />
      {isLoading ? (
        <Loading />
      ) : (
        <EnterpriseRootContactFormFields
          methods={methods}
          enterpriseRootId={params.id}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
