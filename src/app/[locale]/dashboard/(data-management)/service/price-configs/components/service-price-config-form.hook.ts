import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
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
  const [formDateValue, setFormDateValue] = useState<Date | null>(null)

  const { data: servicePriceConfig } = useServicePriceConfig(configId)

  const schema = yup.object().shape({
    activeFrom: yup.string().ensure(),
    activeTo: yup.string().ensure(),
    serviceId: yup.number().required(),
    priceplanId: yup.number().required(),
    businesspartnerId: yup.number(),
    enterpriseRootId: yup.number().required(),
    orgUnitId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: servicePriceConfig && {
      activeFrom: servicePriceConfig?.activeFrom ?? '',
      activeTo: servicePriceConfig?.activeTo ?? '',
      serviceId: servicePriceConfig?.service?.id!,
      priceplanId: servicePriceConfig?.pricePlan?.id!,
      businesspartnerId: servicePriceConfig?.businesspartnerId,
      enterpriseRootId: servicePriceConfig?.enterpriseRootId!,
      orgUnitId: servicePriceConfig?.orgUnitId,
    },
  })

  // Watch values for enterpriseRootId and businessPartnerId
  const enterpriseRootId = methods.watch('enterpriseRootId')
  const businessPartnerId = methods.watch('businesspartnerId')

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

  return { methods, formDateValue, enterpriseRootId, businessPartnerId, onSubmit, setFormDateValue }
}
