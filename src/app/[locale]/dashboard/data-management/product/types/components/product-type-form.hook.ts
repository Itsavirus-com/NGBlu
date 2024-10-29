import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productTypeApi } from '@/services/api/product-api'
import { useProductType } from '@/services/swr/use-product-type'
import { InferType } from '@/utils/typescript'

export default function useProductTypeForm(typeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: productType } = useProductType(typeId)

  const schema = yup.object().shape({
    productType: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: productType,
  })

  const addNewProductType = async (data: InferType<typeof schema>) => {
    try {
      const res = await productTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateProductType = async (data: InferType<typeof schema>) => {
    if (!typeId) return

    try {
      const res = await productTypeApi.update(typeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (typeId) {
      return updateProductType(data)
    }

    return addNewProductType(data)
  }

  return { methods, onSubmit }
}
