'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import usePackageProductForm from '../../_hooks/package-product-form.hook'
import { PackageProductForm } from '../../components/PackagesProductForm'

export default function NewPackageProduct({ params }: { params: { id: number } }) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit } = usePackageProductForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('newPackageProduct')} />
      <PackageProductForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
