import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
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
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const { data: pricePlan, isLoading, mutate: invalidateCache } = usePricePlan(planId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: pricePlan && {
      name: pricePlan?.name ?? '',
      productId: pricePlan?.productId ?? 0,
      serviceId: pricePlan?.serviceId ?? 0,
      priceConfigId: pricePlan?.priceConfigId ?? 0,
      isDefault: pricePlan?.isDefault ?? false,
      fallbackPriceConfigId: pricePlan?.fallbackPriceConfigId ?? 0,
      inputType: pricePlan?.productId ? 'productId' : 'serviceId',
    },
  })

  const handleChange = (value: 'productId' | 'serviceId') => {
    methods.setValue('inputType', value)
    methods.setValue('productId', 0)
    methods.setValue('serviceId', 0)
  }

  const addNewPlan = async (data: InferType<typeof schema>) => {
    try {
      const res = await pricePlanApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price plan created successfully' })
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (planId) {
      return withLoading(() => updatePlan(submitData))
    }

    return withLoading(() => addNewPlan(submitData))
  }

  return { methods, handleChange, onSubmit, isLoading, isSubmitting }
}
