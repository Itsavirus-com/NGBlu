import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personResponsibilityApi } from '@/services/api/person-responsibility-api'
import { usePersonResponsibility } from '@/services/swr/use-person-responsibility'
import { InferType } from '@/utils/typescript'

export default function useResponsibilityForm(responsibilityId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: responsibility } = usePersonResponsibility(responsibilityId)

  const schema = yup.object().shape({
    responsibility: yup.string().ensure().required().max(255),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: responsibility,
  })

  const addNewResponsibility = async (data: InferType<typeof schema>) => {
    try {
      const res = await personResponsibilityApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Responsibility created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateResponsibility = async (data: InferType<typeof schema>) => {
    if (!responsibilityId) return

    try {
      const res = await personResponsibilityApi.update(responsibilityId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Responsibility updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (responsibilityId) {
      return updateResponsibility(data)
    }

    return addNewResponsibility(data)
  }

  return { methods, onSubmit }
}
