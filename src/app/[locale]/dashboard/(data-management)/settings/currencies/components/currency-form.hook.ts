import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { currencyApi } from '@/services/api/currency-api'
import { useCurrency } from '@/services/swr/use-currency'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useCurrencyForm(currencyId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: currency, mutate: invalidateCache } = useCurrency(currencyId)

  const schema = yup.object().shape({
    currency: yup
      .string()
      .ensure()
      .required('Currency is required')
      .max(45, 'Currency must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: currency && {
      currency: currency?.currency ?? '',
    },
  })

  const addNewCurrency = async (data: InferType<typeof schema>) => {
    try {
      const res = await currencyApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Currency created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCurrency = async (data: InferType<typeof schema>) => {
    if (!currencyId) return

    try {
      const res = await currencyApi.update(currencyId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Currency updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (currencyId) {
      return updateCurrency(submitData)
    }

    return addNewCurrency(submitData)
  }

  return { methods, onSubmit }
}
