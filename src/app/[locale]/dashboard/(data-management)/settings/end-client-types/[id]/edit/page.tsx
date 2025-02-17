'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientTypeForm from '../../_components/EndClientTypeForm'
import useEndClientTypeForm from '../../_hooks/end-client-type-form.hook'

export default function UpdateEndClientType({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.endClientTypes')
  const { methods, onSubmit } = useEndClientTypeForm(params?.id)

  return (
    <>
      <PageTitle title={t('updateEndClientType')} />
      <EndClientTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
