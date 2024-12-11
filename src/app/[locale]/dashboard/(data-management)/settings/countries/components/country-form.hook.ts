import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { countryApi } from '@/services/api/country-api'
import { useCountry } from '@/services/swr/use-country'
import { InferType } from '@/utils/typescript'

export default function useCountryForm(countryId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: country } = useCountry(countryId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required().max(150),
    currency: yup.string().ensure().max(45),
    locale: yup.string().ensure().max(45),
    decimalSymbol: yup.string().ensure().max(45),
    iso: yup.string().ensure().max(45),
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
        back()
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
