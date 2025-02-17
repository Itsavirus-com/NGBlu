'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useProductTypeForm from '../../components/product-type-form.hook'
import ProductTypeForm from '../../components/ProductTypeForm'

export default function UpdateProductType({ params }: { params: { typeId: string } }) {
  const t = useTranslations('dataManagement.products.types')
  const { methods, onSubmit } = useProductTypeForm(Number(params.typeId))

  return (
    <>
      <PageTitle title={t('updateProductType')} />
      <ProductTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
