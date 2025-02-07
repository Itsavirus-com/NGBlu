import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { addressTypeApi } from '@/services/api/address-type-api'
import { useAddressType } from '@/services/swr/use-address-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useAddressTypeForm(addressTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: addressType, mutate } = useAddressType(addressTypeId)

  const schema = yup.object().shape({
    addressType: yup
      .string()
      .ensure()
      .required('Address type is required')
      .max(150, 'Address type must be less than 150 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: addressType,
  })

  const addNewAddressType = async (data: InferType<typeof schema>) => {
    try {
      const res = await addressTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address type created successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateAddressType = async (data: InferType<typeof schema>) => {
    if (!addressTypeId) return

    try {
      const res = await addressTypeApi.update(addressTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address type updated successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (addressTypeId) {
      return updateAddressType(submitData)
    }

    return addNewAddressType(submitData)
  }

  return { methods, onSubmit }
}
