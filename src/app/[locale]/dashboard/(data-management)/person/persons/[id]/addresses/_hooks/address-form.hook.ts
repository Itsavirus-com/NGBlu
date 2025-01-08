import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personAddressApi } from '@/services/api/person-address-api'
import { usePersonAddress } from '@/services/swr/use-person-address'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/address-form.schema'

export default function usePersonAddressForm(personAddressId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: personAddress, isLoading } = usePersonAddress(Number(id), personAddressId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: personAddress && {
      ...personAddress,
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (personAddressId) {
      return updatePersonAddress(data)
    }

    return addPersonAddress(data)
  }

  return { methods, onSubmit, isLoading }
}
