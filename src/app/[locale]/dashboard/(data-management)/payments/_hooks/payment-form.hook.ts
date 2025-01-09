import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { paymentDetailApi } from '@/services/api/payment-api'
import { usePayment } from '@/services/swr/use-payment'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/payment-form.schema'

export default function usePaymentForm(paymentId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: payment, isLoading } = usePayment(paymentId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: payment,
  })

  const addNewPayment = async (data: InferType<typeof schema>) => {
    try {
      const res = await paymentDetailApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Payment created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePayment = async (data: InferType<typeof schema>) => {
    if (!paymentId) return

    try {
      const res = await paymentDetailApi.update(paymentId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Payment updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (paymentId) {
      return updatePayment(data)
    }
    return addNewPayment(data)
  }

  return { methods, onSubmit, isLoading }
}
