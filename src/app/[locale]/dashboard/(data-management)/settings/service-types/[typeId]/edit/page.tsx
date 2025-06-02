'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import ServiceTypeForm from '../../_components/ServiceTypeForm'
import useServiceTypeForm from '../../_hooks/service-type-form.hook'

export default function UpdateServiceType({ params }: { params: { typeId: string } }) {
  const t = useTranslations('dataManagement.services.types')
  const { methods, onSubmit, isSubmitting, isLoading } = useServiceTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updateServiceType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ServiceTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
