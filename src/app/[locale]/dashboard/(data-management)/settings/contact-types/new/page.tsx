'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useContactTypeForm from '../components/contact-type-form.hook'
import ContactTypeForm from '../components/ContactTypeForm'

export default function NewContactType() {
  const t = useTranslations('dataManagement.contactTypes')
  const { methods, onSubmit } = useContactTypeForm()

  return (
    <>
      <PageTitle title={t('newContactType')} />
      <ContactTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
