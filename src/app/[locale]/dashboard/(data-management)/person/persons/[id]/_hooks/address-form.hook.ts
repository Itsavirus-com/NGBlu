import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personAddressApi } from '@/services/api/person-address-api'
import { usePersonAddress } from '@/services/swr/use-person-address'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/address-form.schema'

export default function usePersonAddressForm(personAddressId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: personAddress,
    isLoading,
    mutate: invalidateCache,
  } = usePersonAddress(Number(id), personAddressId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: personAddress && {
      addressId: personAddress.addressId,
      isPrimaryLocation: Boolean(personAddress.isPrimaryAddress),
    },
  })

  const addPersonAddress = async (data: InferType<typeof schema>) => {
    try {
      const res = await personAddressApi.new(Number(id), {
        ...data,
        isPrimaryLocation: data.isPrimaryLocation ? '1' : '0',
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePersonAddress = async (data: InferType<typeof schema>) => {
    if (!personAddressId) return

    try {
      const res = await personAddressApi.update(Number(id), personAddressId, {
        ...data,
        isPrimaryLocation: data.isPrimaryLocation ? '1' : '0',
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (personAddressId) {
      return withLoading(() => updatePersonAddress(submitData))
    }

    return withLoading(() => addPersonAddress(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
