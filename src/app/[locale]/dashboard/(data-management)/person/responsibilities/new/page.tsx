'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ResponsibilityForm from '../_components/ResponsibilityForm'
import useResponsibilityForm from '../_hooks/responsibility-form.hook'

export default function NewPersonResponsibility() {
  const t = useTranslations('dataManagement.personResponsibilities')
  const { methods, onSubmit } = useResponsibilityForm()

  return (
    <>
      <PageTitle title={t('newPersonResponsibility')} />
      <ResponsibilityForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
