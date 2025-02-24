import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { serviceTypeApi } from '@/services/api/service-type-api'
import { useServiceType } from '@/services/swr/use-service-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/service-type.schema'

export default function useServiceTypeForm(typeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()

  const { data: serviceType, isLoading, mutate: invalidateCache } = useServiceType(typeId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: serviceType && {
      serviceType: serviceType?.serviceType ?? '',
    },
  })

  const addNewServiceType = async (data: InferType<typeof schema>) => {
    try {
      const res = await serviceTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateServiceType = async (data: InferType<typeof schema>) => {
    if (!typeId) return

    try {
      const res = await serviceTypeApi.update(typeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Service type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)
    if (typeId) {
      return withLoading(() => updateServiceType(submitData))
    }

    return withLoading(() => addNewServiceType(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
