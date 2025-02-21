import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personTypeApi } from '@/services/api/person-type-api'
import { usePersonType } from '@/services/swr/use-person-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/person-type.schema'

export default function usePersonTypeForm(personTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const { data: personType, mutate: invalidateCache, isLoading } = usePersonType(personTypeId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: personType && {
      type: personType?.type ?? '',
    },
  })

  const addNewPersonType = async (data: InferType<typeof schema>) => {
    try {
      const res = await personTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Person type created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updatePersonType = async (data: InferType<typeof schema>) => {
    if (!personTypeId) return

    try {
      const res = await personTypeApi.update(personTypeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Person type updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (personTypeId) {
      return withLoading(() => updatePersonType(submitData))
    }

    return withLoading(() => addNewPersonType(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
