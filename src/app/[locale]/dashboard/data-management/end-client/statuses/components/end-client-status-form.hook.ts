import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { endClientStatusApi } from '@/services/api/end-client-status-api'
import { useEndClientStatus } from '@/services/swr/use-end-client-status'
import { InferType } from '@/utils/typescript'

export default function useEndClientStatusForm(endClientStatusId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: ccType } = useEndClientStatus(endClientStatusId)

  const schema = yup.object().shape({
    status: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: ccType,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientStatusApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client status created successfully' })
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
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (endClientStatusId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
