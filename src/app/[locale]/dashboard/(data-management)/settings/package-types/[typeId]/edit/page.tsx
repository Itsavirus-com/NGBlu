'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePackageTypeForm from '../../components/package-type-form.hook'
import PackageTypeForm from '../../components/PackageTypeForm'

export default function UpdatePackageType({ params }: { params: { typeId: number } }) {
  const t = useTranslations('dataManagement.packages.types')
  const { methods, onSubmit } = usePackageTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updatePackageType')} />
      <PackageTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
