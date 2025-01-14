import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { paymentDetailApi } from '@/services/api/payment-api'
import { usePayment } from '@/services/swr/use-payment'
import { omitNullAndUndefined } from '@/utils/object'
import { getSearchQueryParams } from '@/utils/queryParams'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/payment-form.schema'

export default function usePaymentForm(paymentId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const searchParams = useSearchParams()
  const queryParams = getSearchQueryParams(searchParams.toString().toLowerCase())

  const { data: payment, isLoading } = usePayment(
    paymentId,
    queryParams.selectedpayment === 'bank' ? 'bank' : 'credit-card'
  )

  const [selectedPayment, setSelectedPayment] = useState<number | null>(1)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedPayment: 1,
      bankname: null,
      bankIban: null,
      bankBic: null,
      creditcardNumber: null,
      validTo: null,
      ccv: null,
      paymentTypeId: 0,
      creditcardTypeId: null,
      creditcardBrandId: null,
      bankAddressId: null,
      personId: 0,
      endclientId: null,
    },
    values: payment && {
      selectedPayment: payment.paymentTypeId,
      ...payment,
    },
  })

  const handleChange = (value: 1 | 2) => {
    methods.reset({
      selectedPayment: value,
      bankname: null,
      bankIban: null,
      bankBic: null,
      creditcardNumber: null,
      validTo: null,
      ccv: null,
      paymentTypeId: 0,
      creditcardTypeId: null,
      creditcardBrandId: null,
      bankAddressId: null,
      personId: 0,
      endclientId: null,
    })
  }
  const addNewPayment = async (data: InferType<typeof schema>) => {
    try {
      const res =
        selectedPayment === 1
          ? await paymentDetailApi.newBankPayment(
              data as Omit<InferType<typeof schema>, 'inputType'>
            )
          : await paymentDetailApi.newCreditCardPayment(
              data as Omit<InferType<typeof schema>, 'inputType'>
            )

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
    const bankData = {
      bankname: data.bankname,
      bankIban: data.bankIban,
      bankBic: data.bankBic,
      bankAddressId: data.bankAddressId,
      paymentTypeId: data.paymentTypeId,
      personId: data.personId,
      endclientId: data.endclientId,
      businesspartnerId: data.businesspartnerId,
      enterpriseRootId: data.enterpriseRootId,
    }

    const creditCardData = {
      creditcardNumber: data.creditcardNumber,
      validTo: data.validTo,
      ccv: data.ccv,
      paymentTypeId: data.paymentTypeId,
      creditcardTypeId: data.creditcardTypeId,
      creditcardBrandId: data.creditcardBrandId,
      personId: data.personId,
      endclientId: data.endclientId,
      businesspartnerId: data.businesspartnerId,
      enterpriseRootId: data.enterpriseRootId,
    }

    const dataToSubmit =
      selectedPayment === 1 ? omitNullAndUndefined(bankData) : omitNullAndUndefined(creditCardData)

    try {
      const res =
        selectedPayment === 1
          ? await paymentDetailApi.updateBankPayment(paymentId, dataToSubmit)
          : await paymentDetailApi.updateCreditCardPayment(paymentId, dataToSubmit)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Payment updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (paymentId) {
      return updatePayment(submitData)
    }
    return addNewPayment(submitData)
  }

  useEffect(() => {
    if (paymentId && payment) {
      setSelectedPayment(payment.paymentTypeId)
      methods.setValue('paymentTypeId', payment.paymentTypeId)
    }
  }, [paymentId, payment, methods])

  return { methods, onSubmit, isLoading, selectedPayment, setSelectedPayment, handleChange }
}
