import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceUnitApi } from '@/services/api/price-unit-api'
import { usePriceUnit } from '@/services/swr/use-price-unit'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function usePriceUnitForm(priceUnitId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: priceUnit, mutate: invalidateCache } = usePriceUnit(priceUnitId)

  const schema = yup.object().shape({
    unit: yup
      .string()
      .ensure()
      .required('Unit is required')
      .max(45, 'Unit must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceUnit && {
      unit: priceUnit.unit,
    },
  })

  const addNewPriceUnit = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceUnitApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price unit created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePriceUnit = async (data: InferType<typeof schema>) => {
    if (!priceUnitId) return

    try {
      const res = await priceUnitApi.update(priceUnitId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price unit updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (priceUnitId) {
      return updatePriceUnit(submitData)
    }

    return addNewPriceUnit(submitData)
  }

  return { methods, onSubmit }
}
