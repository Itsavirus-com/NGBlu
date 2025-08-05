'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { PackageServiceForm } from '../../../_components/PackagesServiceForm'
import usePackageServiceForm from '../../../_hooks/package-service-form.hook'

export default function UpdatePackageService({
  params,
}: {
  params: { id: number; serviceId: number }
}) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isSubmitting } = usePackageServiceForm(
    Number(params.id),
    Number(params.serviceId)
  )

  return (
    <>
      <PageTitle title={t('updatePackageService')} />
      <PackageServiceForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
