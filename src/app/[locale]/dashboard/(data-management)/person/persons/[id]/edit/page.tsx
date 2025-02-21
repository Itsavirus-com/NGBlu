'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import PersonForm from '../../_components/PersonForm'
import usePersonForm from '../../_hooks/person-form.hook'

export default function UpdatePerson({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.persons')
  const { methods, onSubmit, isLoading, isSubmitting } = usePersonForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePerson')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PersonForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
