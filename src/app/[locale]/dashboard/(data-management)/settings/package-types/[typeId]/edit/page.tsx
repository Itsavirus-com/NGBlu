'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PackageTypeForm from '../../_components/PackageTypeForm'
import usePackageTypeForm from '../../_hooks/package-type-form.hook'

export default function UpdatePackageType({ params }: { params: { typeId: number } }) {
  const t = useTranslations('dataManagement.packages.types')
  const { methods, onSubmit, isSubmitting } = usePackageTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updatePackageType')} />
      <PackageTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
