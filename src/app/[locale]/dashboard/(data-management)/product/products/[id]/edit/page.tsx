'use client'

import { useTranslations } from 'next-intl'

import Loading from '@/components/loading/Loading'
import { PageTitle } from '@/components/page-title'

import ProductForm from '../../_components/ProductForm'
import useProductForm from '../../_hooks/product-form.hook'

export default function UpdateProduct({ params }: { params: { id: string } }) {
  const t = useTranslations('dataManagement.products')
  const { methods, onSubmit, isLoading, handleChange, errorMessageInputType, isSubmitting } =
    useProductForm(Number(params.id))

  return (
    <>
      <PageTitle title={t('updateProduct')} />
      {isLoading ? (
        <Loading />
      ) : (
        <ProductForm
          methods={methods}
          onSubmit={onSubmit}
          handleChange={handleChange}
          errorMessageInputType={errorMessageInputType}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
