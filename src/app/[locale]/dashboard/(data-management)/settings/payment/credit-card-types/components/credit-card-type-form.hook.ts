import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { creditCardTypeApi } from '@/services/api/credit-card-type-api'
import { useCreditCardType } from '@/services/swr/use-credit-card-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useCreditCardTypeForm(creditCardTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType, mutate: invalidateCache } = useCreditCardType(creditCardTypeId)

  const schema = yup.object().shape({
    creditcardType: yup
      .string()
      .ensure()
      .required('Credit card type is required')
      .max(45, 'Credit card type must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType && {
      creditcardType: ccType?.creditcardType ?? '',
    },
  })

  const addNewCreditCardType = async (data: InferType<typeof schema>) => {
    try {
      const res = await creditCardTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCreditCardType = async (data: InferType<typeof schema>) => {
    if (!creditCardTypeId) return

    try {
      const res = await creditCardTypeApi.update(creditCardTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (creditCardTypeId) {
      return updateCreditCardType(submitData)
    }

    return addNewCreditCardType(submitData)
  }

  return { methods, onSubmit }
}
