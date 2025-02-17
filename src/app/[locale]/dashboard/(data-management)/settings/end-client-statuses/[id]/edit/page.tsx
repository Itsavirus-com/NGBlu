'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useEndClientStatusForm from '../../components/end-client-status-form.hook'
import EndClientStatusForm from '../../components/EndClientStatusForm'

export default function UpdateEndClientStatus({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.endClientStatuses')
  const { methods, onSubmit } = useEndClientStatusForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateEndClientStatus')} />
      <EndClientStatusForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
