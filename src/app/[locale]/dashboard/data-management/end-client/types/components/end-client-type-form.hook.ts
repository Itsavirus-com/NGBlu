import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { endClientTypeApi } from '@/services/api/end-client-type-api'
import { useEndClientType } from '@/services/swr/use-end-client-type'
import { InferType } from '@/utils/typescript'

export default function useEndClientTypeForm(endClientTypeId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType } = useEndClientType(endClientTypeId)

  const schema = yup.object().shape({
    type: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client type created successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!endClientTypeId) return

    try {
      const res = await endClientTypeApi.update(endClientTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client type updated successfully' })
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (endClientTypeId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
