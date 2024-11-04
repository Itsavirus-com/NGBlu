import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { paymentDetailApi } from '@/services/api/payment-api'
import { usePayment } from '@/services/swr/use-payment'
import { InferType } from '@/utils/typescript'

export default function usePaymentForm(paymentId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: payment } = usePayment(paymentId)

  const schema = yup.object().shape({
    bankname: yup.string().ensure().required(),
    bankIban: yup.string().ensure().required(),
    bankBic: yup.string().ensure().required(),
    creditcardNumber: yup.string().ensure().required(),
    validTo: yup.string().ensure().required(),
    ccv: yup.string().ensure().required().max(3),
    paymentTypeId: yup.number().required(),
    creditcardTypeId: yup.number().required(),
    creditcardBrandId: yup.number().required(),
    bankAddressId: yup.number().required(),
    personId: yup.number().required(),
    endclientId: yup.number(),
    businesspartnerId: yup.number(),
    enterpriseRootId: yup.number().required(),
  })

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

  return { methods, onSubmit }
}
