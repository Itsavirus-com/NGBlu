import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { packageProductApi } from '@/services/api/package-product-api'
import { usePackageProduct } from '@/services/swr/use-package-product'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/package-product-form.schema'

export default function usePackageProductForm(id: number, packageProductId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const {
    data: productType,
    isLoading,
    mutate: invalidateCache,
  } = usePackageProduct(Number(id), packageProductId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: productType && {
      packageId: String(id),
      productId: productType?.productId ?? '',
      productPricingConfigId: productType?.productPricingConfigId ?? '',
    },
    defaultValues: {
      packageId: String(id),
      productId: '',
      productPricingConfigId: '',
    },
  })

  const addNewPackageProduct = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageProductApi.new(Number(id), data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package Product created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePackageProduct = async (data: InferType<typeof schema>) => {
    if (!packageProductId) return

    try {
      const res = await packageProductApi.update(Number(id), packageProductId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package Product updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (packageProductId) {
      return updatePackageProduct(submitData)
    }

    return addNewPackageProduct(submitData)
  }

  return { methods, onSubmit, isLoading }
}
