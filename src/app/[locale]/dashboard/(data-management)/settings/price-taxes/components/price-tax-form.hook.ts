import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceTaxApi } from '@/services/api/price-tax-api'
import { usePriceTax } from '@/services/swr/use-price-tax'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function usePriceTaxForm(priceTaxId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: priceTax, mutate } = usePriceTax(priceTaxId)

  const schema = yup.object().shape({
    name: yup
      .string()
      .ensure()
      .required('Name is required')
      .max(150, 'Name must be less than 150 characters'),
    taxValue: yup
      .number()
      .typeError('Tax value must be a number')
      .required('Tax value is required'),
    priceUnitId: yup
      .number()
      .required('Price unit is required')
      .notOneOf([0], 'Price unit is required'),
    countryId: yup.number().required('Country is required').notOneOf([0], 'Country is required'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceTax,
  })

  const addNewPriceTax = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceTaxApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price tax created successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePriceTax = async (data: InferType<typeof schema>) => {
    if (!priceTaxId) return

    try {
      const res = await priceTaxApi.update(priceTaxId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price tax updated successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (priceTaxId) {
      return updatePriceTax(submitData)
    }

    return addNewPriceTax(submitData)
  }

  return { methods, onSubmit }
}
