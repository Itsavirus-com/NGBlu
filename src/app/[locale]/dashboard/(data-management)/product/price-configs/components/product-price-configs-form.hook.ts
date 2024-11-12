import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productPriceConfigApi } from '@/services/api/product-price-config-api'
import { useProductPriceConfig } from '@/services/swr/use-product-price-config'
import { InferType } from '@/utils/typescript'

export default function useProductPriceConfigForm(configId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: productPriceConfig } = useProductPriceConfig(configId)

  const schema = yup.object().shape({
    activeFrom: yup.string().ensure().required(),
    activeTo: yup.string().ensure().required(),
    productId: yup.number().required(),
    priceplanId: yup.number().required(),
    enterpriseRootId: yup.number().required(),
    businesspartnerId: yup.number(),
    orgUnitId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: productPriceConfig,
  })

  const addNewConfig = async (data: InferType<typeof schema>) => {
    try {
      const res = await productPriceConfigApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product price config created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateConfig = async (data: InferType<typeof schema>) => {
    if (!configId) return

    try {
      const res = await productPriceConfigApi.update(configId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product price config updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (configId) {
      return updateConfig(data)
    }

    return addNewConfig(data)
  }

  return { methods, onSubmit }
}
