import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { personTypeApi } from '@/services/api/person-type-api'
import { usePersonType } from '@/services/swr/use-person-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function usePersonTypeForm(personTypeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: personType, mutate: invalidateCache } = usePersonType(personTypeId)

  const schema = yup.object().shape({
    type: yup
      .string()
      .ensure()
      .required('Type is required')
      .max(45, 'Type must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: personType,
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
      return updatePersonType(submitData)
    }

    return addNewPersonType(submitData)
  }

  return { methods, onSubmit }
}
