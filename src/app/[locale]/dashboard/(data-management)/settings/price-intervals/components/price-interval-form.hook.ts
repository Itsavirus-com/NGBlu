import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceIntervalApi } from '@/services/api/price-interval-api'
import { usePriceInterval } from '@/services/swr/use-price-interval'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function usePriceIntervalForm(priceIntervalId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: priceInterval, mutate } = usePriceInterval(priceIntervalId)

  const schema = yup.object().shape({
    name: yup
      .string()
      .ensure()
      .required('Name is required')
      .max(150, 'Name must be less than 150 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceInterval,
  })

  const addNewPriceInterval = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceIntervalApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price interval created successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePriceInterval = async (data: InferType<typeof schema>) => {
    if (!priceIntervalId) return

    try {
      const res = await priceIntervalApi.update(priceIntervalId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price interval updated successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (priceIntervalId) {
      return updatePriceInterval(submitData)
    }

    return addNewPriceInterval(submitData)
  }

  return { methods, onSubmit }
}
