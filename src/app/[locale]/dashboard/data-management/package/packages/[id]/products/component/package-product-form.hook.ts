import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { packageProductApi } from '@/services/api/package-product-api'
import { usePackageProduct } from '@/services/swr/use-package-product'
import { InferType } from '@/utils/typescript'

export default function usePackageProductForm(id: number, packageProductId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: productType } = usePackageProduct(Number(id), packageProductId)

  const schema = yup.object().shape({
    packageId: yup.string().ensure().required(),
    productId: yup.string().ensure().required(),
    productPricingConfigId: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: productType,
    defaultValues: {
      packageId: String(id),
    },
  })

  const addNewPackageProduct = async (data: InferType<typeof schema>) => {
    try {
      const res = await packageProductApi.new(Number(id), data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Package Product created successfully' })
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
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (packageProductId) {
      return updatePackageProduct(data)
    }

    return addNewPackageProduct(data)
  }

  return { methods, onSubmit }
}
