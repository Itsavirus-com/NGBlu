'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePersonTypeForm from '../components/person-type-form.hook'
import PersonTypeForm from '../components/PersonTypeForm'

export default function NewPersonType() {
  const t = useTranslations('dataManagement.personTypes')
  const { methods, onSubmit } = usePersonTypeForm()

  return (
    <>
      <PageTitle title={t('newPersonType')} />
      <PersonTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
