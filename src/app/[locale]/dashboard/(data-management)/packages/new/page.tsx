'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PackageForm from '../_components/PackageForm'
import usePackageForm from '../_hooks/package-form.hook'

export default function NewPackage() {
  const t = useTranslations('dataManagement.packages')
  const { methods, onSubmit, isSubmitting } = usePackageForm()

  return (
    <>
      <PageTitle title={t('newPackage')} />
      <PackageForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
