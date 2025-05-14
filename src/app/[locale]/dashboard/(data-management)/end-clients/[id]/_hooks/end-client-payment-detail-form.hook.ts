import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
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
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: endClientPaymentDetail,
    isLoading,
    mutate: invalidateCache,
  } = useEndClientPaymentDetail(endClientId, paymentDetailId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientPaymentDetail && {
      paymentInfoId: endClientPaymentDetail?.paymentInfoId ?? null,
      enterpriseRootId: endClientPaymentDetail?.paymentInfo?.enterpriseRootId ?? null,
      businesspartnerId: endClientPaymentDetail?.paymentInfo?.businesspartnerId ?? null,
      inputType: endClientPaymentDetail?.paymentInfo?.enterpriseRootId
        ? 'enterpriseRootId'
        : 'businesspartnerId',
    },
  })

  const paymentType = endClientPaymentDetail?.paymentInfo?.paymentType?.paymentType
  const errorMessageInputType = methods.formState.errors.inputType?.message

  const handleChange = (value: 'businesspartnerId' | 'enterpriseRootId') => {
    methods.setValue('inputType', value)
    methods.setValue('businesspartnerId', 0)
    methods.setValue('enterpriseRootId', 0)
    methods.setValue('paymentInfoId', 0)
  }

  const addNewEndClientPaymentDetail = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientPaymentDetailApi.new(endClientId, {
        endclientId: endClientId,
        paymentInfoId: data.paymentInfoId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client payment detail created successfully' })
        invalidateCache()
        back()
      }
    } catch (error: any) {
      if (error?.errors?.detail && 'paymentInfoId' in error.errors.detail) {
        showToast({ variant: 'danger', body: error.errors.detail.paymentInfoId })
      } else {
        showUnexpectedToast()
      }
    }
  }

  const updateEndClientPaymentDetail = async (data: InferType<typeof schema>) => {
    if (!paymentDetailId) return

    try {
      const res = await endClientPaymentDetailApi.update(endClientId, paymentDetailId, {
        endclientId: endClientId,
        paymentInfoId: data.paymentInfoId,
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
      return withLoading(() => updateEndClientPaymentDetail(submitData))
    }

    return withLoading(() => addNewEndClientPaymentDetail(submitData))
  }

  return {
    methods,
    onSubmit,
    isLoading,
    handleChange,
    errorMessageInputType,
    paymentType,
    isSubmitting,
  }
}
