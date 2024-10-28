import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { creditCardBrandApi } from '@/services/api/credit-card-brand-api'
import { useCreditCardBrand } from '@/services/swr/use-credit-card-brand'
import { InferType } from '@/utils/typescript'

export default function useCreditCardBrandForm(creditCardBrandId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType } = useCreditCardBrand(creditCardBrandId)

  const schema = yup.object().shape({
    brandname: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await creditCardBrandApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!creditCardBrandId) return

    try {
      const res = await creditCardBrandApi.update(creditCardBrandId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (creditCardBrandId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
