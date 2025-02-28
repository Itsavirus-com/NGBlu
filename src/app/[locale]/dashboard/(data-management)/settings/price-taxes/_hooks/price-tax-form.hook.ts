import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { priceTaxApi } from '@/services/api/price-tax-api'
import { usePriceTax } from '@/services/swr/use-price-tax'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/price-tax.schema'

export default function usePriceTaxForm(priceTaxId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const { data: priceTax, isLoading, mutate: invalidateCache } = usePriceTax(priceTaxId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: priceTax && {
      name: priceTax?.name ?? '',
      taxValue: priceTax?.taxValue ?? 0,
      priceTypeId: priceTax?.priceTypeId ?? 0,
      countryId: priceTax?.countryId ?? 0,
    },
  })

  const addNewPriceTax = async (data: InferType<typeof schema>) => {
    try {
      const res = await priceTaxApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Price tax created successfully' })
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (priceTaxId) {
      return withLoading(() => updatePriceTax(submitData))
    }

    return withLoading(() => addNewPriceTax(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
