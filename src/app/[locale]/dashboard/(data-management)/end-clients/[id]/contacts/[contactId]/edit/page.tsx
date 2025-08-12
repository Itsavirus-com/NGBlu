'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientContactForm from '../../../_components/EndClientContactForm'
import useEndClientContactForm from '../../../_hooks/end-client-contact-form.hook'

export default function UpdateEndClientContact({
  params,
}: {
  params: { id: string; contactId: string }
}) {
  const t = useTranslations('dataManagement.endClients.contacts')

  const { methods, onSubmit, isSubmitting } = useEndClientContactForm(
    Number(params.id),
    Number(params.contactId)
  )

  return (
    <>
      <PageTitle title={t('updateContact')} />
      <EndClientContactForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
