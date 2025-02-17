'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useEndClientTypeForm from '../components/end-client-type-form.hook'
import EndClientTypeForm from '../components/EndClientTypeForm'

export default function NewEndClientType() {
  const t = useTranslations('dataManagement.endClientTypes')
  const { methods, onSubmit } = useEndClientTypeForm()

  return (
    <>
      <PageTitle title={t('newEndClientType')} />
      <EndClientTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
