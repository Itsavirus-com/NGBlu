import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientPaymentDetailApi } from '@/services/api/end-client-payment-detail-api'
import { useEndClientPaymentDetail } from '@/services/swr/use-end-client-payment-detail'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/end-client-payment-detail-form.schema'

export default function useEndClientPaymentDetailForm(
  endCliendId: number,
  paymentDetailId?: number
) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClientPaymentDetail, isLoading } = useEndClientPaymentDetail(
    endCliendId,
    paymentDetailId
  )

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientPaymentDetail,
  })

  const addNewEndClientPaymentDetail = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientPaymentDetailApi.new(endCliendId, {
        ...data,
        endclientId: endCliendId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientPaymentDetail = async (data: InferType<typeof schema>) => {
    if (!paymentDetailId) return

    try {
      const res = await endClientPaymentDetailApi.update(endCliendId, paymentDetailId, {
        ...data,
        endclientId: endCliendId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client contact updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (paymentDetailId) {
      return updateEndClientPaymentDetail(submitData)
    }

    return addNewEndClientPaymentDetail(submitData)
  }

  return { methods, onSubmit, isLoading }
}
