'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import EndClientContactForm from '../../../_components/EndClientContactForm'
import useEndClientContactForm from '../../../_hooks/end-client-contact-form.hook'

export default function UpdateEndClientContact({
  params,
}: {
  params: { id: string; contactId: string }
}) {
  const t = useTranslations('dataManagement.endClients.contacts')

  const { methods, onSubmit, isLoading } = useEndClientContactForm(
    Number(params.id),
    Number(params.contactId)
  )

  return (
    <>
      <PageTitle title={t('updateContact')} />
      {isLoading ? <Loading /> : <EndClientContactForm methods={methods} onSubmit={onSubmit} />}
    </>
  )
}
