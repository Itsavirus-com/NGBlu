'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import { PackageServiceForm } from '../../../_components/PackagesServiceForm'
import usePackageServiceForm from '../../../_hooks/package-service-form.hook'

export default function UpdatePackageService({
  params,
}: {
  params: { id: number; serviceId: number }
}) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isLoading, isSubmitting } = usePackageServiceForm(
    Number(params.id),
    Number(params.serviceId)
  )

  return (
    <>
      <PageTitle title={t('updatePackageService')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PackageServiceForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
