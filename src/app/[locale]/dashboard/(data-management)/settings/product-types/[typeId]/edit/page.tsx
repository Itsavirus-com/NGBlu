'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/loading'
import { PageTitle } from '@/components/page-title'

import ProductTypeForm from '../../_components/ProductTypeForm'
import useProductTypeForm from '../../_hooks/product-type-form.hook'

export default function UpdateProductType({ params }: { params: { typeId: string } }) {
  const t = useTranslations('dataManagement.products.types')
  const { methods, onSubmit, isSubmitting, isLoading } = useProductTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updateProductType')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ProductTypeForm methods={methods} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      )}
    </>
  )
}
