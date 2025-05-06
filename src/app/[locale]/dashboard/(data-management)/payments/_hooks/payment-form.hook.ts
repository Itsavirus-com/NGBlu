import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { DASH_REGEX, SLASH_REGEX } from '@/constants/regex'
import { useLoading } from '@/hooks/use-loading.hook'
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
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const searchParams = useSearchParams()
  const queryParams = getSearchQueryParams(searchParams.toString().toLowerCase())

  const {
    data: payment,
    isLoading,
    mutate: invalidateCache,
  } = usePayment(paymentId, queryParams.selectedpayment === 'bank' ? 'bank' : 'credit-card')

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      selectedPayment: paymentId ? undefined : 1,
      bankname: payment?.bankname ?? null,
      bankIban: payment?.bankIban ?? null,
      bankBic: payment?.bankBic ?? null,
      creditcardNumber: payment?.creditcardNumber ?? null,
      validTo: payment?.validTo ? payment.validTo.replace(DASH_REGEX, '/') : null,
      cvv: payment?.cvv ?? null,
      paymentTypeId: payment?.paymentTypeId ?? 1,
      creditcardTypeId: payment?.creditcardTypeId ?? null,
      creditcardBrandId: payment?.creditcardBrandId ?? null,
      bankAddressId: payment?.bankAddressId ?? null,
      personId: payment?.personId ?? undefined,
      endclientId: payment?.endclientId ?? null,
      businesspartnerId: payment?.businesspartnerId ?? null,
      enterpriseRootId: payment?.enterpriseRootId ?? undefined,
    },
    values: payment && {
      bankname: payment?.bankname ?? null,
      bankIban: payment?.bankIban ?? null,
      bankBic: payment?.bankBic ?? null,
      creditcardNumber: payment?.creditcardNumber ?? null,
      validTo: payment?.validTo ? payment.validTo.replace(DASH_REGEX, '/') : null,
      cvv: payment?.cvv ?? null,
      paymentTypeId: payment?.paymentTypeId ?? 0,
      creditcardTypeId: payment?.creditcardTypeId ?? null,
      creditcardBrandId: payment?.creditcardBrandId ?? null,
      bankAddressId: payment?.bankAddressId ?? null,
      personId: payment?.personId ?? 0,
      endclientId: payment?.endclientId ?? null,
      businesspartnerId: payment?.businesspartnerId ?? null,
      enterpriseRootId: payment?.enterpriseRootId ?? 0,
      selectedPayment: Number(payment?.paymentTypeId),
    },
  })

  // Always ensure selectedPayment is a number
  const rawSelectedPayment = methods.watch('selectedPayment')
  const selectedPayment = Number(rawSelectedPayment)

  const handleChange = (value: number) => {
    // Get current values for fields we want to preserve
    const currentValues = methods.getValues()

    if (value === 1) {
      // Switch to Bank Account
      methods.setValue('selectedPayment', value)
      methods.setValue('paymentTypeId', value)

      // Clear credit card fields
      methods.setValue('creditcardNumber', null)
      methods.setValue('validTo', null)
      methods.setValue('cvv', null)
      methods.setValue('creditcardTypeId', null)
      methods.setValue('creditcardBrandId', null)
    } else {
      // Switch to Credit Card
      methods.setValue('selectedPayment', value)
      methods.setValue('paymentTypeId', value)

      // Clear bank fields
      methods.setValue('bankname', null)
      methods.setValue('bankIban', null)
      methods.setValue('bankBic', null)
      methods.setValue('bankAddressId', null)
    }
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
      // Preserve form data on error by explicitly setting all values back
      preserveFormData(data)
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
      cvv: data.cvv,
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
      // Preserve form data on error by explicitly setting all values back
      preserveFormData(data)
    }
  }

  // Helper function to preserve form data after an error
  const preserveFormData = (data: InferType<typeof schema>) => {
    // Keep the current values by setting them again
    Object.keys(data).forEach(key => {
      // Handle validTo separately due to formatting
      if (key === 'validTo' && data.validTo) {
        methods.setValue('validTo', data.validTo.replace(DASH_REGEX, '/'))
      } else {
        // Set all other values directly
        methods.setValue(key as any, data[key as keyof typeof data])
      }
    })
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined({
      ...data,
      validTo: data.validTo?.replace(SLASH_REGEX, '-'),
    })

    if (paymentId) {
      return withLoading(() => updatePayment(submitData))
    }
    return withLoading(() => addNewPayment(submitData))
  }

  return { methods, onSubmit, isLoading, selectedPayment, handleChange, isSubmitting }
}
