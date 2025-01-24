import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productApi } from '@/services/api/product-api'
import { useProduct } from '@/services/swr/use-product'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/product-form.schema'

export default function useProductForm(productId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: product, isLoading } = useProduct(productId)
  const [inputType, setInputType] = useState<'corporateProductOnly' | 'consumerProductOnly' | null>(
    null
  )

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

  const handleChange = (value: 'corporateProductOnly' | 'consumerProductOnly') => {
    setInputType(value)
    methods.setValue('inputType', value)
  }

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
    const submitData = omitNullAndUndefined(data)

    if (productId) {
      return updateProduct(submitData)
    }

    return addNewProduct(submitData)
  }

  useEffect(() => {
    if (productId && inputType === null && !isLoading) {
      setInputType(methods.getValues('inputType') as 'corporateProductOnly' | 'consumerProductOnly')
    }
  }, [productId, inputType, isLoading])

  return { methods, onSubmit, isLoading, handleChange }
}
