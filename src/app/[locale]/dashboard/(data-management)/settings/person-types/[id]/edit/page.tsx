'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePersonTypeForm from '../../components/person-type-form.hook'
import PersonTypeForm from '../../components/PersonTypeForm'

export default function UpdatePersonType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.personTypes')
  const { methods, onSubmit } = usePersonTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updatePersonType')} />
      <PersonTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
