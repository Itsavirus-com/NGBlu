'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePackageServiceForm from '../../_hooks/package-service-form.hook'
import { PackageServiceForm } from '../../components/PackagesServiceForm'

export default function NewPackageService({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit } = usePackageServiceForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newPackageService')} />
      <PackageServiceForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
