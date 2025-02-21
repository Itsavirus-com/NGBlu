'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { EnterpriseRootContactFormFields } from '../../_components/EnterpriseRootContactForm'
import useEnterpriseRootContactForm from '../../_hooks/enterprise-root-contact-form.hook'
export default function NewEnterpriseRootContact({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.enterpriseRoots.contacts')

  const { methods, onSubmit, isSubmitting } = useEnterpriseRootContactForm()

  return (
    <>
      <PageTitle title={t('newContact')} />
      <EnterpriseRootContactFormFields
        methods={methods}
        enterpriseRootId={params.id}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
