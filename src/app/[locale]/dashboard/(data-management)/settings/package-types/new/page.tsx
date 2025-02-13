'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePackageTypeForm from '../components/package-type-form.hook'
import PackageTypeForm from '../components/PackageTypeForm'

export default function NewPackageType() {
  const t = useTranslations('dataManagement.packages.types')
  const { methods, onSubmit } = usePackageTypeForm()

  return (
    <>
      <PageTitle title={t('newPackageType')} />
      <PackageTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
