import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { pricePlanApi } from '@/services/api/price-plan-api'
import { usePricePlan } from '@/services/swr/use-price-plan'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/price-plan-form.schema'

export default function usePricePlanForm(planId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: pricePlan, isLoading } = usePricePlan(planId)

  const [inputType, setInputType] = useState<'productId' | 'serviceId' | null>(null)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: pricePlan && {
      name: pricePlan.name,
      productId: pricePlan.productId,
      serviceId: pricePlan.serviceId,
      priceConfigId: pricePlan.priceConfigId,
      isDefault: pricePlan.isDefault,
      fallbackPriceConfigId: pricePlan.fallbackPriceConfigId,
      inputType: pricePlan.productId ? 'productId' : 'serviceId',
    },
  })

  const handleChange = (value: 'productId' | 'serviceId') => {
    setInputType(value)
    methods.setValue('inputType', value)
    methods.setValue('productId', 0)
    methods.setValue('serviceId', 0)
  }

  const addNewPlan = async (data: InferType<typeof schema>) => {
    try {
      const res = await pricePlanApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price plan created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePlan = async (data: InferType<typeof schema>) => {
    if (!planId) return

    try {
      const res = await pricePlanApi.update(planId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price plan updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (planId) {
      return updatePlan(submitData)
    }

    return addNewPlan(submitData)
  }

  useEffect(() => {
    if (planId && inputType === null && !isLoading) {
      setInputType(methods.getValues('inputType') as 'productId' | 'serviceId')
      setTimeout(() => {
        methods.setValue('productId', pricePlan?.productId)
        methods.setValue('serviceId', pricePlan?.serviceId)
      }, 1000)
    }
  }, [methods.watch(), isLoading, planId])

  return { methods, inputType, handleChange, onSubmit, isLoading }
}
