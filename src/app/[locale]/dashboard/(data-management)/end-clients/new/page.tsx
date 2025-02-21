'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import EndClientForm from '../_components/EndClientForm'
import useEndClientForm from '../_hooks/end-client-form.hook'

export default function NewEndClient() {
  const t = useTranslations('dataManagement.endClients')
  const { methods, onSubmit, isDisplayCompanyInfo, setIsDisplayCompanyInfo, isSubmitting } =
    useEndClientForm()

  return (
    <>
      <PageTitle title={t('newEndClient')} />
      <EndClientForm
        methods={methods}
        onSubmit={onSubmit}
        isDisplayCompanyInfo={isDisplayCompanyInfo}
        setIsDisplayCompanyInfo={setIsDisplayCompanyInfo}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
