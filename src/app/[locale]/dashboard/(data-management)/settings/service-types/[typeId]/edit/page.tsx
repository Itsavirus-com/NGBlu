'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useServiceTypeForm from '../../components/service-type-form.hook'
import ServiceTypeForm from '../../components/ServiceTypeForm'

export default function UpdateServiceType({ params }: { params: { typeId: string } }) {
  const t = useTranslations('dataManagement.services.types')
  const { methods, onSubmit } = useServiceTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updateServiceType')} />
      <ServiceTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
