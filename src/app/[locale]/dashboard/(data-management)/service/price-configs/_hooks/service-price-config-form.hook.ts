import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DEFAULT_DATE_TIME_END, DEFAULT_DATE_TIME_START } from '@/constants/dateTime'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { servicePriceConfigApi } from '@/services/api/service-price-config-api'
import { useServicePriceConfig } from '@/services/swr/use-service-price-config'
import { combineDateTime } from '@/utils/dateTime'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/service-price-config-form.schema'

export default function useServicePriceConfigForm(configId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const [formDateValue, setFormDateValue] = useState<Date | null>(null)

  const {
    data: servicePriceConfig,
    isLoading,
    mutate: invalidateCache,
  } = useServicePriceConfig(configId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      activeFromDate: '',
      activeFromTime: DEFAULT_DATE_TIME_START,
      activeToDate: '',
      activeToTime: DEFAULT_DATE_TIME_END,
      serviceId: 0,
      priceplanId: 0,
      businesspartnerId: 0,
      enterpriseRootId: 0,
      orgUnitId: 0,
    },

    values: servicePriceConfig && {
      activeFromDate: servicePriceConfig?.activeFrom
        ? format(new Date(servicePriceConfig.activeFrom.replace(' ', 'T')), 'yyyy-MM-dd')
        : '',
      activeFromTime: servicePriceConfig?.activeFrom ?? DEFAULT_DATE_TIME_START,
      activeToDate: servicePriceConfig?.activeTo
        ? format(new Date(servicePriceConfig.activeTo.replace(' ', 'T')), 'yyyy-MM-dd')
        : '',
      activeToTime: servicePriceConfig?.activeTo ?? DEFAULT_DATE_TIME_END,
      serviceId: servicePriceConfig?.service?.id!,
      priceplanId: servicePriceConfig?.pricePlan?.id!,
      businesspartnerId: servicePriceConfig?.businesspartnerId,
      enterpriseRootId: servicePriceConfig?.enterpriseRootId!,
      orgUnitId: servicePriceConfig?.orgUnitId,
      inputType: servicePriceConfig?.businesspartnerId ? 'businesspartnerId' : 'enterpriseRootId',
    },
  })

  // Watch values for enterpriseRootId and businessPartnerId
  const enterpriseRootId = methods.watch('enterpriseRootId')
  const businessPartnerId = methods.watch('businesspartnerId')
  const errorMessageInputType = methods.formState.errors.inputType?.message

  const handleChange = (value: 'businesspartnerId' | 'enterpriseRootId') => {
    // setInputType(value)
    methods.setValue('inputType', value)
    methods.setValue('businesspartnerId', 0)
    methods.setValue('enterpriseRootId', 0)
    methods.setValue('orgUnitId', null)
  }

  const addNewConfig = async (data: InferType<typeof schema>) => {
    try {
      const res = await servicePriceConfigApi.new(
        data as Omit<InferType<typeof schema>, 'inputType'>
      )

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service price config created successfully' })
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
      const res = await servicePriceConfigApi.update(
        configId,
        data as Omit<InferType<typeof schema>, 'inputType'>
      )

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service price config updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const activeFrom = combineDateTime(data?.activeFromDate ?? '', data?.activeFromTime ?? '')
    const activeTo = combineDateTime(data?.activeToDate ?? '', data?.activeToTime ?? '', 59)

    const submitData = omitNullAndUndefined({
      activeFrom,
      activeTo,
      serviceId: data.serviceId,
      priceplanId: data.priceplanId,
      businesspartnerId: data.businesspartnerId,
      enterpriseRootId: data.enterpriseRootId,
      orgUnitId: data.orgUnitId,
    }) as any

    if (configId) {
      return updateConfig(submitData)
    }

    return addNewConfig(submitData)
  }

  return {
    methods,
    formDateValue,
    enterpriseRootId,
    businessPartnerId,
    handleChange,
    onSubmit,
    setFormDateValue,
    isLoading,
    errorMessageInputType,
  }
}
