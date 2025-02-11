import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productTypeApi } from '@/services/api/product-type-api'
import { useProductType } from '@/services/swr/use-product-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useProductTypeForm(productTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: productType, mutate: invalidateCache } = useProductType(productTypeId)

  const schema = yup.object().shape({
    productType: yup
      .string()
      .ensure()
      .required('Product type is required')
      .max(45, 'Product type must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: productType && {
      productType: productType?.productType ?? '',
    },
  })

  const addNewProductType = async (data: InferType<typeof schema>) => {
    try {
      const res = await productTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateProductType = async (data: InferType<typeof schema>) => {
    if (!productTypeId) return

    try {
      const res = await productTypeApi.update(productTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (productTypeId) {
      return updateProductType(submitData)
    }

    return addNewProductType(submitData)
  }

  return { methods, onSubmit }
}
