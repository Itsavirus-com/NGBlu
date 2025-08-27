'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PersonForm from '../../_components/PersonForm'
import usePersonForm from '../../_hooks/person-form.hook'

export default function UpdatePerson({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.persons')
  const { methods, onSubmit, isSubmitting } = usePersonForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePerson')} />
      <PersonForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
