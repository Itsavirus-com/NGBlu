'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useContactTypeForm from '../../components/contact-type-form.hook'
import ContactTypeForm from '../../components/ContactTypeForm'

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
