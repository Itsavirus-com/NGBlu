'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientContactForm from '../../_components/EndClientContactForm'
import useEndClientContactForm from '../../_hooks/end-client-contact-form.hook'

export default function NewEndClientContact({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.endClients.contacts')

  const { methods, onSubmit } = useEndClientContactForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newContact')} />
      <EndClientContactForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
