import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { currencyApi } from '@/services/api/currency-api'
import { useCurrency } from '@/services/swr/use-currency'
import { InferType } from '@/utils/typescript'

export default function useCurrencyForm(currencyId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType } = useCurrency(currencyId)

  const schema = yup.object().shape({
    currency: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await currencyApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!currencyId) return

    try {
      const res = await currencyApi.update(currencyId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Credit card type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (currencyId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
