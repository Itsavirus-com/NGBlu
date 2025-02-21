import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { creditCardTypeApi } from '@/services/api/credit-card-type-api'
import { useCreditCardType } from '@/services/swr/use-credit-card-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/credit-card-type.schema'

export default function useCreditCardTypeForm(creditCardTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const { data: ccType, mutate: invalidateCache, isLoading } = useCreditCardType(creditCardTypeId)

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
      return withLoading(() => updateCreditCardType(submitData))
    }

    return withLoading(() => addNewCreditCardType(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
