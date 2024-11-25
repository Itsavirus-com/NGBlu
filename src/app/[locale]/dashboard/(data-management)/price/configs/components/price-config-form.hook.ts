import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceConfigApi } from '@/services/api/price-config-api'
import { usePriceConfig } from '@/services/swr/use-price-config'
import { InferType } from '@/utils/typescript'

export default function usePriceConfigForm(configId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: priceConfig } = usePriceConfig(configId)

  const schema = yup.object().shape({
    priceValue: yup.number().typeError('Price value must be a number').required(),
    priceUnitId: yup.number().required(),
    priceCurrencyId: yup.number().required(),
    priceTypeId: yup.number().required(),
    priceIntervalId: yup.number().required(),
    priceTaxId: yup.number().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceConfig,
  })

  const addNewConfig = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceConfigApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price config created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateConfig = async (data: InferType<typeof schema>) => {
    if (!configId) return

    try {
      const res = await priceConfigApi.update(configId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price config updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (configId) {
      return updateConfig(data)
    }

    return addNewConfig(data)
  }

  return { methods, onSubmit }
}
