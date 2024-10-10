import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { countryApi } from '@/services/api/country-api'
import { useCountry } from '@/services/swr/use-country'
import { InferType } from '@/utils/typescript'

export default function useCountryForm(countryId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: country } = useCountry(countryId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
    currency: yup.string().ensure().required(),
    locale: yup.string().ensure().required(),
    decimalSymbol: yup.string().ensure().required(),
    iso: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: country,
  })

  const addNewCountry = async (data: InferType<typeof schema>) => {
    try {
      const res = await countryApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Country created successfully' })
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
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (countryId) {
      return updateCountry(data)
    }

    return addNewCountry(data)
  }

  return { methods, onSubmit }
}
