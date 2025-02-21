'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PackageTypeForm from '../_components/PackageTypeForm'
import usePackageTypeForm from '../_hooks/package-type-form.hook'

export default function NewPackageType() {
  const t = useTranslations('dataManagement.packages.types')
  const { methods, onSubmit, isSubmitting } = usePackageTypeForm()

  return (
    <>
      <PageTitle title={t('newPackageType')} />
      <PackageTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
