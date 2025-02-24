'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import { PackageProductForm } from '../../_components/PackagesProductForm'
import usePackageProductForm from '../../_hooks/package-product-form.hook'

export default function NewPackageProduct({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isSubmitting } = usePackageProductForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newPackageProduct')} />
      <PackageProductForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  )
}
