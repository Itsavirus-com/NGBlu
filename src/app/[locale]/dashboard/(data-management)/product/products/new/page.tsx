'use client'

import { useTranslations } from 'next-intl'

import { PageTitle } from '@/components/page-title'

import ProductForm from '../_components/ProductForm'
import useProductForm from '../_hooks/product-form.hook'

export default function NewProduct() {
  const t = useTranslations('dataManagement.products')
  const { methods, onSubmit, handleChange, errorMessageInputType, isSubmitting } = useProductForm()

  return (
    <>
      <PageTitle title={t('newProduct')} />
      <ProductForm
        methods={methods}
        onSubmit={onSubmit}
        handleChange={handleChange}
        errorMessageInputType={errorMessageInputType}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
