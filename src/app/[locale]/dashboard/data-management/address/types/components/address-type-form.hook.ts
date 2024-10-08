import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { addressTypeApi } from '@/services/api/address-type-api'
import { useAddressType } from '@/services/swr/use-address-type'
import { InferType } from '@/utils/typescript'

export default function useAddressTypeForm(addressTypeId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: companyStatus } = useAddressType(addressTypeId)

  const schema = yup.object().shape({
    addressType: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: companyStatus,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await addressTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address type created successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!addressTypeId) return

    try {
      const res = await addressTypeApi.update(addressTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Address type updated successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (addressTypeId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
