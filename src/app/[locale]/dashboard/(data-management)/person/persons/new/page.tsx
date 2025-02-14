'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PersonForm from '../_components/PersonForm'
import usePersonForm from '../_hooks/person-form.hook'

export default function NewPerson() {
  const t = useTranslations('dataManagement.persons')
  const { methods, onSubmit } = usePersonForm()

  return (
    <>
      <PageTitle title={t('newPerson')} />
      <PersonForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
