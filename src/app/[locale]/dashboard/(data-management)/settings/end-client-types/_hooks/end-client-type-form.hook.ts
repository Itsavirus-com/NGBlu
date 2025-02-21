import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientTypeApi } from '@/services/api/end-client-type-api'
import { useEndClientType } from '@/services/swr/use-end-client-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/end-client-type.schema'

export default function useEndClientTypeForm(endClientTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const {
    data: endClientType,
    isLoading,
    mutate: invalidateCache,
  } = useEndClientType(endClientTypeId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientType && {
      type: endClientType?.type ?? '',
    },
  })

  const addNewEndClientType = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client type created successfully' })
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (endClientTypeId) {
      return withLoading(() => updateEndClientType(submitData))
    }

    return withLoading(() => addNewEndClientType(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
