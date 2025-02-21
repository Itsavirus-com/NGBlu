'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import { PackageProductForm } from '../../../_components/PackagesProductForm'
import usePackageProductForm from '../../../_hooks/package-product-form.hook'

export default function UpdatePackageProduct({
  params,
}: {
  params: { id: number; productId: number }
}) {
  const t = useTranslations('dataManagement.packages')

  const { methods, onSubmit, isLoading, isSubmitting } = usePackageProductForm(
    Number(params.id),
    Number(params.productId)
  )

  return (
    <>
      <PageTitle title={t('updatePackageProduct')} />
      {isLoading ? (
        <Loading />
      ) : (
        <PackageProductForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
