import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { servicePriceConfigApi } from '@/services/api/service-price-config-api'
import { useServicePriceConfig } from '@/services/swr/use-service-price-config'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/service-price-config-form.schema'

export default function useServicePriceConfigForm(configId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const [formDateValue, setFormDateValue] = useState<Date | null>(null)
  const [inputType, setInputType] = useState<'businesspartnerId' | 'enterpriseRootId' | null>(null)

  const { data: servicePriceConfig, isLoading } = useServicePriceConfig(configId)

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
      inputType: servicePriceConfig?.enterpriseRootId ? 'enterpriseRootId' : 'businesspartnerId',
    },
  })

  // Watch values for enterpriseRootId and businessPartnerId
  const enterpriseRootId = methods.watch('enterpriseRootId')
  const businessPartnerId = methods.watch('businesspartnerId')

  const handleChange = (value: 'businesspartnerId' | 'enterpriseRootId') => {
    setInputType(value)
    methods.setValue('businesspartnerId', 0)
    methods.setValue('enterpriseRootId', 0)
    methods.setValue('orgUnitId', null)
  }

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
    const submitData = omitNullAndUndefined(data)
    if (configId) {
      return updateConfig(submitData)
    }

    return addNewConfig(submitData)
  }

  useEffect(() => {
    if (configId && inputType === null) {
      setInputType(methods.getValues('inputType') as 'businesspartnerId' | 'enterpriseRootId')
    }
  }, [methods.watch()])

  return {
    methods,
    formDateValue,
    enterpriseRootId,
    businessPartnerId,
    inputType,
    handleChange,
    onSubmit,
    setFormDateValue,
    isLoading,
  }
}
