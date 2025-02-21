import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { countryApi } from '@/services/api/country-api'
import { useCountry } from '@/services/swr/use-country'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/country-form.schema'

export default function useCountryForm(countryId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const { data: country, isLoading, mutate: invalidateCache } = useCountry(countryId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: country && {
      name: country?.name ?? '',
      currency: country?.currency ?? '',
      locale: country?.locale ?? '',
      decimalSymbol: country?.decimalSymbol ?? '',
      iso: country?.iso ?? '',
    },
  })

  const addNewCountry = async (data: InferType<typeof schema>) => {
    try {
      const res = await countryApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Country created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCountry = async (data: InferType<typeof schema>) => {
    if (!countryId) return

    try {
      const res = await countryApi.update(countryId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Country updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (countryId) {
      return withLoading(() => updateCountry(submitData))
    }

    return withLoading(() => addNewCountry(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
