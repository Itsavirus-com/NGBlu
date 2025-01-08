import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { addressApi } from '@/services/api/address-api'
import { useAddress } from '@/services/swr/use-address'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/address-form.schema'

export default function useAddressForm(addressId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const t = useTranslations('dataManagement.addresses')

  const { data: address, isLoading } = useAddress(addressId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: address,
    context: {
      t,
    },
  })

  const addNewAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await addressApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address created successfully' })
        back()
      }
    } catch (error: any) {
      if ('lat' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if ('lng' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid longitude' })
      }
      showUnexpectedToast()
    }
  }

  const updateAddress = async (data: InferType<typeof schema>) => {
    if (!addressId) return

    try {
      const res = await addressApi.update(addressId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address updated successfully' })
        back()
      }
    } catch (error: any) {
      if ('lat' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid latitude' })
      }
      if ('lng' in error.errors.detail) {
        return showToast({ variant: 'danger', body: 'Invalid longitude' })
      }
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (addressId) {
      return updateAddress(data)
    }

    return addNewAddress(data)
  }

  return { methods, onSubmit, isLoading }
}
