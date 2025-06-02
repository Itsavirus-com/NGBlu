'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import { PersonContactForm } from '../../../_components/PersonContactForm'
import usePersonContactForm from '../../../_hooks/contact-form.hook'

export default function UpdatePersonContact({ params }: { params: { contactId: number } }) {
  const t = useTranslations('dataManagement.persons.contacts')

  const { methods, handleChange, onSubmit, isLoading, isSubmitting, handleFilterOrganizationUnit } =
    usePersonContactForm(Number(params.contactId))

  return (
    <>
      <PageTitle title={t('updatePersonContact')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PersonContactForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
          handleFilterOrganizationUnit={handleFilterOrganizationUnit}
        />
      )}
    </>
  )
}
