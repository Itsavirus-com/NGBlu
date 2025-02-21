import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientStatusApi } from '@/services/api/end-client-status-api'
import { useEndClientStatus } from '@/services/swr/use-end-client-status'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/end-client-status.schema'

export default function useEndClientStatusForm(endClientStatusId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const { data: ccType, isLoading, mutate: invalidateCache } = useEndClientStatus(endClientStatusId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType && {
      status: ccType?.status ?? '',
    },
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientStatusApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client status created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!endClientStatusId) return

    try {
      const res = await endClientStatusApi.update(endClientStatusId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client status updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (endClientStatusId) {
      return withLoading(() => updateCompanyStatus(submitData))
    }

    return withLoading(() => addNewCompanyStatus(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
