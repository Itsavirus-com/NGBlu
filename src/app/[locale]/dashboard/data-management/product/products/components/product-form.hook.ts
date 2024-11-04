import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productApi } from '@/services/api/product-api'
import { useProduct } from '@/services/swr/use-product'
import { InferType } from '@/utils/typescript'

export default function useProductForm(productId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: product } = useProduct(productId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
    description: yup.string().ensure().required(),
    productTypeId: yup.number().required(),
    corporateProductOnly: yup.boolean().required(),
    consumerProductOnly: yup.boolean().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: product,
  })

  const addNewProduct = async (data: InferType<typeof schema>) => {
    try {
      let newData = {
        ...data,
        corporateProductOnly: data.corporateProductOnly ? '1' : '0',
        consumerProductOnly: data.consumerProductOnly ? '1' : '0',
      }
      const res = await productApi.new(newData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateProduct = async (data: InferType<typeof schema>) => {
    if (!productId) return

    try {
      let newData = {
        ...data,
        corporateProductOnly: data.corporateProductOnly ? '1' : '0',
        consumerProductOnly: data.consumerProductOnly ? '1' : '0',
      }
      const res = await productApi.update(productId, newData)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (productId) {
      return updateProduct(data)
    }

    return addNewProduct(data)
  }

  return { methods, onSubmit }
}
