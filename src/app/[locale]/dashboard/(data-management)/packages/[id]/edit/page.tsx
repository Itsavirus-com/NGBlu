'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import PackageForm from '../../_components/PackageForm'
import usePackageForm from '../../_hooks/package-form.hook'

export default function UpdatePackage({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isSubmitting } = usePackageForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updatePackage')} />
      <PackageForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
