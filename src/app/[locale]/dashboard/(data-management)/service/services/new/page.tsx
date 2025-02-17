'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ServiceForm from '../_components/ServiceForm'
import useServiceForm from '../_hooks/service-form.hook'

export default function NewService() {
  const t = useTranslations('dataManagement.services')
  const { methods, onSubmit, handleChange } = useServiceForm()

  return (
    <>
      <PageTitle title={t('newService')} />
      <ServiceForm methods={methods} onSubmit={onSubmit} handleChange={handleChange} />
    </>
  )
}
