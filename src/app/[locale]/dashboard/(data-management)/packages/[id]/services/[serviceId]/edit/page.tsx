'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import usePackageServiceForm from '../../../_hooks/package-service-form.hook'
import { PackageServiceForm } from '../../../components/PackagesServiceForm'

export default function UpdatePackageService({
  params,
}: {
  params: { id: number; serviceId: number }
}) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isLoading } = usePackageServiceForm(
    Number(params.id),
    Number(params.serviceId)
  )

  return (
    <>
      <PageTitle title={t('updatePackageService')} />
      {isLoading ? <Loading /> : <PackageServiceForm methods={methods} onSubmit={onSubmit} />}
    </>
  )
}
