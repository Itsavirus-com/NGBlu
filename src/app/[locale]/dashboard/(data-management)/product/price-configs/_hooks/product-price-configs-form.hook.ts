import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { DEFAULT_DATE_TIME_END, DEFAULT_DATE_TIME_START } from '@/constants/dateTime'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productPriceConfigApi } from '@/services/api/product-price-config-api'
import { useProductPriceConfig } from '@/services/swr/use-product-price-config'
import { combineDateTime } from '@/utils/dateTime'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/product-price-configs.schema'

export default function useProductPriceConfigForm(configId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const [formDateValue, setFormDateValue] = useState<Date | null>(null)

  const {
    data: productPriceConfig,
    isLoading,
    mutate: invalidateCache,
  } = useProductPriceConfig(configId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      activeFromDate: '',
      activeFromTime: DEFAULT_DATE_TIME_START,
      activeToDate: '',
      activeToTime: DEFAULT_DATE_TIME_END,
      productId: 0,
      priceplanId: 0,
      enterpriseRootId: 0,
      businesspartnerId: 0,
      orgUnitId: 0,
    },
    values: productPriceConfig && {
      activeFromDate: productPriceConfig?.activeFrom
        ? format(new Date(productPriceConfig.activeFrom.replace(' ', 'T')), 'yyyy-MM-dd')
        : '',
      activeFromTime: productPriceConfig?.activeFrom ?? DEFAULT_DATE_TIME_START,
      activeToDate: productPriceConfig?.activeTo
        ? format(new Date(productPriceConfig.activeTo.replace(' ', 'T')), 'yyyy-MM-dd')
        : '',
      activeToTime: productPriceConfig?.activeTo ?? DEFAULT_DATE_TIME_END,
      productId: productPriceConfig?.productId!,
      priceplanId: productPriceConfig?.enterpriseRootId!,
      enterpriseRootId: productPriceConfig?.enterpriseRootId!,
      businesspartnerId: productPriceConfig?.businesspartnerId,
      orgUnitId: productPriceConfig?.orgUnitId,
      inputType: productPriceConfig?.businesspartnerId ? 'businesspartnerId' : 'enterpriseRootId',
    },
  })

  const errorMessageInputType = methods.formState.errors.inputType?.message

  const handleChange = (value: 'businesspartnerId' | 'enterpriseRootId') => {
    methods.setValue('inputType', value)
    methods.setValue('businesspartnerId', 0)
    methods.setValue('enterpriseRootId', 0)
    methods.setValue('orgUnitId', null)
  }

  const addNewConfig = async (data: InferType<typeof schema>) => {
    try {
      const res = await productPriceConfigApi.new(
        data as Omit<InferType<typeof schema>, 'inputType'>
      )

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product price config created successfully' })
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
      const res = await productPriceConfigApi.update(
        configId,
        data as Omit<InferType<typeof schema>, 'inputType'>
      )

      if (res.ok) {
        showToast({ variant: 'success', body: 'Product price config updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const activeFrom = combineDateTime(data?.activeFromDate ?? '', data?.activeFromTime ?? '')
    const activeTo = combineDateTime(data?.activeToDate ?? '', data?.activeToTime ?? '', 59)

    const submitData = omitNullAndUndefined({
      activeFrom,
      activeTo,
      productId: data.productId,
      orgUnitId: data.orgUnitId,
      businesspartnerId: data.businesspartnerId,
      enterpriseRootId: data.enterpriseRootId,
      priceplanId: data.priceplanId,
    }) as any

    if (configId) {
      return updateConfig(submitData)
    }

    return addNewConfig(submitData)
  }

  return {
    methods,
    formDateValue,
    handleChange,
    setFormDateValue,
    onSubmit,
    isLoading,
    errorMessageInputType,
  }
}
