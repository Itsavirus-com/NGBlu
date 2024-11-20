import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { servicePriceConfigApi } from '@/services/api/service-price-config-api'
import { useServicePriceConfig } from '@/services/swr/use-service-price-config'
import { InferType } from '@/utils/typescript'

export default function useServicePriceConfigForm(configId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: servicePriceConfig } = useServicePriceConfig(configId)

  const schema = yup.object().shape({})

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: servicePriceConfig,
  })

  const addNewConfig = async (data: InferType<typeof schema>) => {
    try {
      const res = await servicePriceConfigApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service price config created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateConfig = async (data: InferType<typeof schema>) => {
    if (!configId) return

    try {
      const res = await servicePriceConfigApi.update(configId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service price config updated successfully' })
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
