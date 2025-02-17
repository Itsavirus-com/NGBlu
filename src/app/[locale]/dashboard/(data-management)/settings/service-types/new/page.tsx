'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useServiceTypeForm from '../components/service-type-form.hook'
import ServiceTypeForm from '../components/ServiceTypeForm'

export default function NewServiceType() {
  const t = useTranslations('dataManagement.services.types')
  const { methods, onSubmit } = useServiceTypeForm()

  return (
    <>
      <PageTitle title={t('newServiceType')} />
      <ServiceTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
