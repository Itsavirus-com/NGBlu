'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useEndClientStatusForm from '../components/end-client-status-form.hook'
import EndClientStatusForm from '../components/EndClientStatusForm'

export default function NewEndClientStatus() {
  const t = useTranslations('dataManagement.endClientStatuses')
  const { methods, onSubmit } = useEndClientStatusForm()

  return (
    <>
      <PageTitle title={t('newEndClientStatus')} />
      <EndClientStatusForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
