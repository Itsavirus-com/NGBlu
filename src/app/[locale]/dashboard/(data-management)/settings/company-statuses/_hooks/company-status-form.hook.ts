import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { companyStatusApi } from '@/services/api/company-status-api'
import { useCompanyStatus } from '@/services/swr/use-company-status'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/company-status.schema'

export default function useCompanyStatusForm(companyStatusId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const {
    data: companyStatus,
    isLoading,
    mutate: invalidateCache,
  } = useCompanyStatus(companyStatusId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: companyStatus && {
      status: companyStatus?.status ?? '',
    },
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await companyStatusApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Company status created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateCompanyStatus = async (data: InferType<typeof schema>) => {
    if (!companyStatusId) return

    try {
      const res = await companyStatusApi.update(companyStatusId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Company status updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (companyStatusId) {
      return withLoading(() => updateCompanyStatus(submitData))
    }

    return withLoading(() => addNewCompanyStatus(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
