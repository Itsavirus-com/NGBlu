import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { countryApi } from '@/services/api/country-api'
import { useCountry } from '@/services/swr/use-country'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useCountryForm(countryId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: country, mutate: invalidateCache } = useCountry(countryId)

  const schema = yup.object().shape({
    name: yup
      .string()
      .ensure()
      .required('Name is required')
      .max(150, 'Name must be less than 150 characters'),
    currency: yup.string().ensure().max(45, 'Currency must be less than 45 characters'),
    locale: yup
      .string()
      .ensure()
      .required('Locale is required')
      .max(45, 'Locale must be less than 45 characters'),
    decimalSymbol: yup
      .string()
      .ensure()
      .required('Decimal symbol is required')
      .max(45, 'Decimal symbol must be less than 45 characters'),
    iso: yup
      .string()
      .ensure()
      .required('ISO is required')
      .max(45, 'ISO must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: country && {
      name: country.name,
      currency: country.currency,
      locale: country.locale,
      decimalSymbol: country.decimalSymbol,
      iso: country.iso,
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
      return updateCountry(submitData)
    }

    return addNewCountry(submitData)
  }

  return { methods, onSubmit }
}
