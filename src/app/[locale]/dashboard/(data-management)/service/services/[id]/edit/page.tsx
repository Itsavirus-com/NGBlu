'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import ServiceForm from '../../_components/ServiceForm'
import useServiceForm from '../../_hooks/service-form.hook'

export default function UpdateService({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.services')
  const { methods, onSubmit, isLoading, handleChange, isSubmitting } = useServiceForm(
    Number(params.id)
  )

  return (
    <>
      <PageTitle title={t('updateService')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ServiceForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
