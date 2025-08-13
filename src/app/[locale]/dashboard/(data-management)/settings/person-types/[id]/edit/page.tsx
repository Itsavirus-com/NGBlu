'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PersonTypeForm from '../../_components/PersonTypeForm'
import usePersonTypeForm from '../../_hooks/person-type-form.hook'

export default function UpdatePersonType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.personTypes')
  const { methods, onSubmit, isSubmitting } = usePersonTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePersonType')} />
      <PersonTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
