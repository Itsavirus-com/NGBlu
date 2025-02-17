'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import useProductTypeForm from '../components/product-type-form.hook'
import ProductTypeForm from '../components/ProductTypeForm'

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
