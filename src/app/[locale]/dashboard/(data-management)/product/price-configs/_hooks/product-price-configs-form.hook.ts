import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { productPriceConfigApi } from '@/services/api/product-price-config-api'
import { useProductPriceConfig } from '@/services/swr/use-product-price-config'
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
      activeFrom: productPriceConfig?.activeFrom ?? '',
      activeTo: productPriceConfig?.activeTo ?? '',
      productId: productPriceConfig?.productId!,
      priceplanId: productPriceConfig?.enterpriseRootId!,
      enterpriseRootId: productPriceConfig?.enterpriseRootId!,
      businesspartnerId: productPriceConfig?.businesspartnerId,
      inputType: productPriceConfig?.enterpriseRootId ? 'enterpriseRootId' : 'businesspartnerId',
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
    businessPartnerId,
    enterpriseRootId,
    inputType,
    handleChange,
    setFormDateValue,
    onSubmit,
    isLoading,
  }
}
