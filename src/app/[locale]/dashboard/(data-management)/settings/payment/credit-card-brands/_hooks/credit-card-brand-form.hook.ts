import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { creditCardBrandApi } from '@/services/api/credit-card-brand-api'
import { useCreditCardBrand } from '@/services/swr/use-credit-card-brand'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/credit-card-brand.schema'

export default function useCreditCardBrandForm(creditCardBrandId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType, mutate: invalidateCache } = useCreditCardBrand(creditCardBrandId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType && {
      brandname: ccType?.brandname ?? '',
    },
  })

  const addNewCreditCardBrand = async (data: InferType<typeof schema>) => {
    try {
      const res = await creditCardBrandApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card brand created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCreditCardBrand = async (data: InferType<typeof schema>) => {
    if (!creditCardBrandId) return

    try {
      const res = await creditCardBrandApi.update(creditCardBrandId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card brand updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (creditCardBrandId) {
      return updateCreditCardBrand(submitData)
    }

    return addNewCreditCardBrand(submitData)
  }

  return { methods, onSubmit }
}
