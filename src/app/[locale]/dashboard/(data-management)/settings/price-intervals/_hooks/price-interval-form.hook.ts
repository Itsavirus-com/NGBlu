import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceIntervalApi } from '@/services/api/price-interval-api'
import { usePriceInterval } from '@/services/swr/use-price-interval'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/price-interval.schema'

export default function usePriceIntervalForm(priceIntervalId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: priceInterval, mutate: invalidateCache } = usePriceInterval(priceIntervalId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceInterval && {
      name: priceInterval?.name ?? '',
    },
  })

  const addNewPriceInterval = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceIntervalApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price interval created successfully' })
        invalidateCache()
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
        invalidateCache()
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
