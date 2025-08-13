'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ResponsibilityForm from '../../_components/ResponsibilityForm'
import useResponsibilityForm from '../../_hooks/responsibility-form.hook'

export default function UpdatePersonResponsibility({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.personResponsibilities')
  const { methods, onSubmit, isSubmitting } = useResponsibilityForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePersonResponsibility')} />
      <ResponsibilityForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
