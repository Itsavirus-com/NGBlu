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

  const { data: ccType } = usePriceUnit(priceUnitId)

  const schema = yup.object().shape({
    unit: yup
      .string()
      .ensure()
      .required('Unit is required')
      .max(45, 'Unit must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceUnitApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price unit created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!priceUnitId) return

    try {
      const res = await priceUnitApi.update(priceUnitId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price unit updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)
    if (priceUnitId) {
      return updateCompanyStatus(submitData)
    }

    return addNewCompanyStatus(submitData)
  }

  return { methods, onSubmit }
}
