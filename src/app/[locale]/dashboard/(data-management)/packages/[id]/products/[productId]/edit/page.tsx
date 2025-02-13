'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import usePackageProductForm from '../../../_hooks/package-product-form.hook'
import { PackageProductForm } from '../../../components/PackagesProductForm'

export default function UpdatePackageProduct({
  params,
}: {
  params: { id: number; productId: number }
}) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isLoading } = usePackageProductForm(
    Number(params.id),
    Number(params.productId)
  )

  return (
    <>
      <PageTitle title={t('updatePackageProduct')} />
      {isLoading ? <Loading /> : <PackageProductForm methods={methods} onSubmit={onSubmit} />}
    </>
  )
}
