'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ServiceForm from '../../_components/ServiceForm'
import useServiceForm from '../../_hooks/service-form.hook'

export default function UpdateService({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.services')
  const { methods, onSubmit, handleChange, isSubmitting } = useServiceForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateService')} />
      <ServiceForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
