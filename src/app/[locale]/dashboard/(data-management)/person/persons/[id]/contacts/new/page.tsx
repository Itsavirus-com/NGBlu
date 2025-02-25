'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { PersonContactForm } from '../../_components/PersonContactForm'
import usePersonContactForm from '../../_hooks/contact-form.hook'

export default function NewPersonContact() {
  const t = useTranslations('dataManagement.persons.contacts')

  const { methods, handleChange, onSubmit, isSubmitting, handleFilterOrganizationUnit } =
    usePersonContactForm()

  return (
    <>
      <PageTitle title={t('newPersonContact')} />
      <PersonContactForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        handleFilterOrganizationUnit={handleFilterOrganizationUnit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
