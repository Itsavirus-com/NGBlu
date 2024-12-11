import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { paymentTypeApi } from '@/services/api/payment-type-api'
import { usePaymentType } from '@/services/swr/use-payment-type'
import { InferType } from '@/utils/typescript'

export default function usePaymentTypeForm(paymentTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType } = usePaymentType(paymentTypeId)

  const schema = yup.object().shape({
    paymentType: yup.string().ensure().required().max(150),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await paymentTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!paymentTypeId) return

    try {
      const res = await paymentTypeApi.update(paymentTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (paymentTypeId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
