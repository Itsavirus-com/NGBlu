'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useEndClientTypeForm from '../../components/end-client-type-form.hook'
import EndClientTypeForm from '../../components/EndClientTypeForm'

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
