import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personResponsibilityApi } from '@/services/api/person-responsibility-api'
import { usePersonResponsibility } from '@/services/swr/use-person-responsibility'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/responsibility-form.schema'

export default function useResponsibilityForm(responsibilityId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const {
    data: responsibility,
    isLoading,
    mutate: invalidateCache,
  } = usePersonResponsibility(responsibilityId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: responsibility && {
      responsibility: responsibility?.responsibility ?? '',
    },
  })

  const addNewResponsibility = async (data: InferType<typeof schema>) => {
    try {
      const res = await personResponsibilityApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Responsibility created successfully' })
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (responsibilityId) {
      return withLoading(() => updateResponsibility(submitData))
    }

    return withLoading(() => addNewResponsibility(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
