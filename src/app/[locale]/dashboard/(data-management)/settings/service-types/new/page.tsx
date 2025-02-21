'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ServiceTypeForm from '../_components/ServiceTypeForm'
import useServiceTypeForm from '../_hooks/service-type-form.hook'

export default function NewServiceType() {
  const t = useTranslations('dataManagement.services.types')
  const { methods, onSubmit, isSubmitting } = useServiceTypeForm()

  return (
    <>
      <PageTitle title={t('newServiceType')} />
      <ServiceTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
