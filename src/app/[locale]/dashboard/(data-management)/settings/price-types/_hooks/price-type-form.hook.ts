import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceTypeApi } from '@/services/api/price-type-api'
import { usePriceType } from '@/services/swr/use-price-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/price-type.schema'

export default function usePriceTypeForm(priceTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const { data: priceType, mutate: invalidateCache, isLoading } = usePriceType(priceTypeId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceType && {
      type: priceType?.type ?? '',
    },
  })

  const addNewPriceType = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePriceType = async (data: InferType<typeof schema>) => {
    if (!priceTypeId) return

    try {
      const res = await priceTypeApi.update(priceTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (priceTypeId) {
      return withLoading(() => updatePriceType(submitData))
    }

    return withLoading(() => addNewPriceType(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
