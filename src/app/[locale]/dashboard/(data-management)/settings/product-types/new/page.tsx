'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProductTypeForm from '../_components/ProductTypeForm'
import useProductTypeForm from '../_hooks/product-type-form.hook'

export default function NewProductType() {
  const t = useTranslations('dataManagement.products.types')
  const { methods, onSubmit } = useProductTypeForm()

  return (
    <>
      <PageTitle title={t('newProductType')} />
      <ProductTypeForm methods={methods} onSubmit={onSubmit} />
    </>
  )
}
