import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { companyStatusApi } from '@/services/api/company-status-api'
import { useCompanyStatus } from '@/services/swr/use-company-status'
import { InferType } from '@/utils/typescript'

export default function useCompanyStatusForm(companyStatusId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: companyStatus } = useCompanyStatus(companyStatusId)

  const schema = yup.object().shape({
    status: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: companyStatus,
  })

  const addNewCompanyStatus = async (data: InferType<typeof schema>) => {
    try {
      const res = await companyStatusApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Company status created successfully' })
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (companyStatusId) {
      return updateCompanyStatus(data)
    }

    return addNewCompanyStatus(data)
  }

  return { methods, onSubmit }
}
