import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceTypeApi } from '@/services/api/price-type-api'
import { usePriceType } from '@/services/swr/use-price-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function usePriceTypeForm(priceTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: priceType, mutate: invalidateCache } = usePriceType(priceTypeId)

  const schema = yup.object().shape({
    type: yup
      .string()
      .ensure()
      .required('Type is required')
      .max(150, 'Type must be less than 150 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceType && {
      type: priceType.type,
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
      return updatePriceType(submitData)
    }

    return addNewPriceType(submitData)
  }

  return { methods, onSubmit }
}
