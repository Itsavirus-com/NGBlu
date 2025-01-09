import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientTypeApi } from '@/services/api/end-client-type-api'
import { useEndClientType } from '@/services/swr/use-end-client-type'
import { InferType } from '@/utils/typescript'

export default function useEndClientTypeForm(endClientTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClientType } = useEndClientType(endClientTypeId)

  const schema = yup.object().shape({
    type: yup
      .string()
      .ensure()
      .required('Type is required')
      .max(45, 'Type must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientType,
  })

  const addNewEndClientType = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client type created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientType = async (data: InferType<typeof schema>) => {
    if (!endClientTypeId) return

    try {
      const res = await endClientTypeApi.update(endClientTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client type updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (endClientTypeId) {
      return updateEndClientType(data)
    }

    return addNewEndClientType(data)
  }

  return { methods, onSubmit }
}
