import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceTaxApi } from '@/services/api/price-tax-api'
import { usePriceTax } from '@/services/swr/use-price-tax'
import { InferType } from '@/utils/typescript'

export default function usePriceTaxForm(taxId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: priceTax } = usePriceTax(taxId)

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
    priceUnitId: yup.number().required('Price unit is required'),
    countryId: yup.number().required('Country is required'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceTax,
  })

  const addNewTax = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceTaxApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price tax created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateTax = async (data: InferType<typeof schema>) => {
    if (!taxId) return

    try {
      const res = await priceTaxApi.update(taxId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price tax updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (taxId) {
      return updateTax(data)
    }

    return addNewTax(data)
  }

  return { methods, onSubmit }
}
