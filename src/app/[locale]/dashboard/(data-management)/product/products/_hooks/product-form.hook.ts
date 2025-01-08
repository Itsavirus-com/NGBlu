import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productApi } from '@/services/api/product-api'
import { useProduct } from '@/services/swr/use-product'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/product-form.schema'

export default function useProductForm(productId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: product, isLoading } = useProduct(productId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: product && {
      ...product,
      inputType: product.corporateProductOnly
        ? 'corporateProductOnly'
        : product.consumerProductOnly
          ? 'consumerProductOnly'
          : '',
    },
  })

  const addNewProduct = async (data: InferType<typeof schema>) => {
    try {
      let newData = {
        ...data,
        corporateProductOnly: data.inputType === 'corporateProductOnly' ? '1' : '0',
        consumerProductOnly: data.inputType === 'consumerProductOnly' ? '1' : '0',
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
        corporateProductOnly: data.inputType === 'corporateProductOnly' ? '1' : '0',
        consumerProductOnly: data.inputType === 'consumerProductOnly' ? '1' : '0',
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

  return { methods, onSubmit, isLoading }
}
