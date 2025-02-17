'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientTypeForm from '../_components/EndClientTypeForm'
import useEndClientTypeForm from '../_hooks/end-client-type-form.hook'

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
