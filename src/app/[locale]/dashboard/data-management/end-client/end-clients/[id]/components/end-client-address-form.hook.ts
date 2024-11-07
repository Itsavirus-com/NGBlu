import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientAddressApi } from '@/services/api/end-client-address-api'
import { useEndClientAddress } from '@/services/swr/use-end-client-address'
import { InferType } from '@/utils/typescript'

export default function useEndClientAddressForm(endCliendId: number, addressId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClientAddress } = useEndClientAddress(endCliendId, addressId)

  const schema = yup.object().shape({
    addressId: yup.number().required(),
    isPrimaryLocation: yup.boolean(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientAddress && {
      ...endClientAddress,
      isPrimaryLocation: endClientAddress.isPrimaryAddress === 1 ? true : false,
    },
  })

  const addNewEndClientAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientAddressApi.new(endCliendId, {
        ...data,
        endclientId: endCliendId,
        isPrimaryLocation: data.isPrimaryLocation ? '1' : '0',
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client address created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientAddress = async (data: InferType<typeof schema>) => {
    if (!addressId) return

    try {
      const res = await endClientAddressApi.update(endCliendId, addressId, {
        ...data,
        endclientId: endCliendId,
        isPrimaryLocation: data.isPrimaryLocation ? '1' : '0',
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client address updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (addressId) {
      return updateEndClientAddress(data)
    }

    return addNewEndClientAddress(data)
  }

  return { methods, onSubmit }
}
