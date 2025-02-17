'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ContactTypeForm from '../_components/ContactTypeForm'
import useContactTypeForm from '../_hooks/contact-type-form.hook'

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
