'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientStatusForm from '../../_components/EndClientStatusForm'
import useEndClientStatusForm from '../../_hooks/end-client-status-form.hook'

export default function UpdateEndClientStatus({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.endClientStatuses')
  const { methods, onSubmit, isSubmitting } = useEndClientStatusForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateEndClientStatus')} />
      <EndClientStatusForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
