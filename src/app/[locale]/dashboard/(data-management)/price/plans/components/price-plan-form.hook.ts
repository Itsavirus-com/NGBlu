import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { pricePlanApi } from '@/services/api/price-plan-api'
import { usePricePlan } from '@/services/swr/use-price-plan'
import { InferType } from '@/utils/typescript'

export default function usePricePlanForm(planId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: pricePlan } = usePricePlan(planId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
    productId: yup.number(),
    serviceId: yup.number(),
    priceConfigId: yup.number().required(),
    fallbackPriceConfigId: yup.number(),
    isDefault: yup.boolean(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: pricePlan,
  })

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
    if (planId) {
      return updatePlan(data)
    }

    return addNewPlan(data)
  }

  return { methods, onSubmit }
}
