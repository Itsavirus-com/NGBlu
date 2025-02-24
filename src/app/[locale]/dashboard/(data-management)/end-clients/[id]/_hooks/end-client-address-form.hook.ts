import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientAddressApi } from '@/services/api/end-client-address-api'
import { useEndClientAddress } from '@/services/swr/use-end-client-address'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/end-client-address-form.schema'

export default function useEndClientAddressForm(endClientId: number, addressId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: endClientAddress,
    isLoading,
    mutate: invalidateCache,
  } = useEndClientAddress(endClientId, addressId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      isPrimaryLocation: !addressId && true,
    },
    values: endClientAddress && {
      addressId: endClientAddress?.addressId ?? 0,
      isPrimaryLocation: endClientAddress?.isPrimaryAddress === 1 ? true : false,
    },
  })

  const addNewEndClientAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientAddressApi.new(endClientId, {
        ...data,
        endclientId: endClientId,
        isPrimaryLocation: data.isPrimaryLocation ? '1' : '0',
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client address created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientAddress = async (data: InferType<typeof schema>) => {
    if (!addressId) return

    try {
      const res = await endClientAddressApi.update(endClientId, addressId, {
        ...data,
        endclientId: endClientId,
        isPrimaryLocation: data.isPrimaryLocation ? '1' : '0',
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client address updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (addressId) {
      return withLoading(() => updateEndClientAddress(submitData))
    }

    return withLoading(() => addNewEndClientAddress(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
