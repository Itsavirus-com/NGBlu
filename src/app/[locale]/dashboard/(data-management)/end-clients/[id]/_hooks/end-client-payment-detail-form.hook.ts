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
  endClientId: number,
  paymentDetailId?: number
) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const {
    data: endClientPaymentDetail,
    isLoading,
    mutate: invalidateCache,
  } = useEndClientPaymentDetail(endClientId, paymentDetailId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientPaymentDetail && {
      paymentInfoId: endClientPaymentDetail.paymentInfoId ?? null,
    },
  })

  const addNewEndClientPaymentDetail = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientPaymentDetailApi.new(endClientId, {
        ...data,
        endclientId: endClientId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client payment detail created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientPaymentDetail = async (data: InferType<typeof schema>) => {
    if (!paymentDetailId) return

    try {
      const res = await endClientPaymentDetailApi.update(endClientId, paymentDetailId, {
        ...data,
        endclientId: endClientId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client payment detail updated successfully' })
        invalidateCache()
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
