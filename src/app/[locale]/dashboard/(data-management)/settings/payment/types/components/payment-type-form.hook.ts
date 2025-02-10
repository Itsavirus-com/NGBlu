import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { paymentTypeApi } from '@/services/api/payment-type-api'
import { usePaymentType } from '@/services/swr/use-payment-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function usePaymentTypeForm(paymentTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: paymentType, mutate: invalidateCache } = usePaymentType(paymentTypeId)

  const schema = yup.object().shape({
    paymentType: yup.string().ensure().required().max(150),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: paymentType,
  })

  const addNewPaymentType = async (data: InferType<typeof schema>) => {
    try {
      const res = await paymentTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Payment type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePaymentType = async (data: InferType<typeof schema>) => {
    if (!paymentTypeId) return

    try {
      const res = await paymentTypeApi.update(paymentTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Payment type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (paymentTypeId) {
      return updatePaymentType(submitData)
    }

    return addNewPaymentType(submitData)
  }

  return { methods, onSubmit }
}
