import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { priceTypeApi } from '@/services/api/price-type-api'
import { usePriceType } from '@/services/swr/use-price-type'
import { InferType } from '@/utils/typescript'

export default function usePriceTypeForm(priceTypeId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType } = usePriceType(priceTypeId)

  const schema = yup.object().shape({
    type: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price type created successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!priceTypeId) return

    try {
      const res = await priceTypeApi.update(priceTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price type updated successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (priceTypeId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
