import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceConfigApi } from '@/services/api/price-config-api'
import { usePriceConfig } from '@/services/swr/use-price-config'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/price-config-form.schema'

export default function usePriceConfigForm(configId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const { data: priceConfig, isLoading, mutate: invalidateCache } = usePriceConfig(configId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceConfig && {
      priceValue: priceConfig?.priceValue,
      priceUnitId: priceConfig?.priceUnitId,
      priceCurrencyId: priceConfig?.priceCurrencyId,
      priceTypeId: priceConfig?.priceTypeId,
      priceIntervalId: priceConfig?.priceIntervalId,
      priceTaxId: priceConfig?.priceTaxId,
    },
  })

  const addNewConfig = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceConfigApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price config created successfully' })
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (configId) {
      return withLoading(() => updateConfig(submitData))
    }

    return withLoading(() => addNewConfig(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
