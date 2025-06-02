'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import ContactTypeForm from '../../_components/ContactTypeForm'
import useContactTypeForm from '../../_hooks/contact-type-form.hook'

export default function UpdateContactType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.contactTypes')
  const { methods, onSubmit, isSubmitting, isLoading } = useContactTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateContactType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ContactTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
