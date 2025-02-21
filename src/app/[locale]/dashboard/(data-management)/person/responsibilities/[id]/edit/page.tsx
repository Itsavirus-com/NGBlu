'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import ResponsibilityForm from '../../_components/ResponsibilityForm'
import useResponsibilityForm from '../../_hooks/responsibility-form.hook'

export default function UpdatePersonResponsibility({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.personResponsibilities')
  const { methods, onSubmit, isLoading, isSubmitting } = useResponsibilityForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePersonResponsibility')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ResponsibilityForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
