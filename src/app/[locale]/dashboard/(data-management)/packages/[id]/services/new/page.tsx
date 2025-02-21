'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { PackageServiceForm } from '../../_components/PackagesServiceForm'
import usePackageServiceForm from '../../_hooks/package-service-form.hook'

export default function NewPackageService({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isSubmitting } = usePackageServiceForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newPackageService')} />
      <PackageServiceForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
