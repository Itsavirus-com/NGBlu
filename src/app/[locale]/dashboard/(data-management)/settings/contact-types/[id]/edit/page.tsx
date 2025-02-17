'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ContactTypeForm from '../../_components/ContactTypeForm'
import useContactTypeForm from '../../_hooks/contact-type-form.hook'

export default function UpdateContactType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.contactTypes')
  const { methods, onSubmit } = useContactTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateContactType')} />
      <ContactTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
