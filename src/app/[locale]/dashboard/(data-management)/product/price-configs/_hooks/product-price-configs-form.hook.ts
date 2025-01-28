import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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
  const [inputType, setInputType] = useState<'businesspartnerId' | 'enterpriseRootId' | null>(null)

  const { data: productPriceConfig, isLoading } = useProductPriceConfig(configId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: productPriceConfig && {
      activeFromDate: productPriceConfig?.activeFrom
        ? format(new Date(productPriceConfig.activeFrom.replace(' ', 'T')), 'yyyy-MM-dd')
        : '',
      activeFromTime: productPriceConfig?.activeFrom,
      activeToDate: productPriceConfig?.activeTo
        ? format(new Date(productPriceConfig.activeTo.replace(' ', 'T')), 'yyyy-MM-dd')
        : '',
      activeToTime: productPriceConfig?.activeTo,
      productId: productPriceConfig?.productId!,
      priceplanId: productPriceConfig?.enterpriseRootId!,
      enterpriseRootId: productPriceConfig?.enterpriseRootId!,
      businesspartnerId: productPriceConfig?.businesspartnerId,
      inputType: productPriceConfig?.businesspartnerId ? 'businesspartnerId' : 'enterpriseRootId',
    },
  })

  const errorMessageInputType = methods.formState.errors.inputType?.message
  // Watch values for enterpriseRootId and businessPartnerId
  const enterpriseRootId = methods.watch('enterpriseRootId')
  const businessPartnerId = methods.watch('businesspartnerId')

  const handleChange = (value: 'businesspartnerId' | 'enterpriseRootId') => {
    setInputType(value)
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const activeFrom = combineDateTime(data?.activeFromDate ?? '', data?.activeFromTime ?? '')
    const activeTo = combineDateTime(data?.activeToDate ?? '', data?.activeToTime ?? '')

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

  useEffect(() => {
    if (configId && inputType === null && !isLoading) {
      const businessPartnerId = methods.getValues('businesspartnerId')
      const enterpriseRootId = methods.getValues('enterpriseRootId')

      if (businessPartnerId) {
        setInputType('businesspartnerId')
      } else if (enterpriseRootId && (!businessPartnerId || businessPartnerId === 0)) {
        setInputType('enterpriseRootId')
      }

      setTimeout(() => {
        methods.setValue('businesspartnerId', productPriceConfig?.businesspartnerId)
        methods.setValue('enterpriseRootId', productPriceConfig?.enterpriseRootId)
        methods.setValue('orgUnitId', productPriceConfig?.orgUnitId)
      }, 1000)
    }
  }, [methods.watch(), isLoading, configId])

  return {
    methods,
    formDateValue,
    businessPartnerId,
    enterpriseRootId,
    inputType,
    handleChange,
    setFormDateValue,
    onSubmit,
    isLoading,
    errorMessageInputType,
  }
}
