'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientStatusForm from '../_components/EndClientStatusForm'
import useEndClientStatusForm from '../_hooks/end-client-status-form.hook'

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
