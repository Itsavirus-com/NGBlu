import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { genderApi } from '@/services/api/gender-api'
import { useGender } from '@/services/swr/use-gender'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/gender.schema'

export default function useGenderForm(genderId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { withLoading, isLoading: isSubmitting } = useLoading()

  const { data: gender, isLoading, mutate: invalidateCache } = useGender(genderId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: gender && {
      gender: gender?.gender ?? '',
    },
  })

  const addNewGender = async (data: InferType<typeof schema>) => {
    try {
      const res = await genderApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Gender created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateGender = async (data: InferType<typeof schema>) => {
    if (!genderId) return

    try {
      const res = await genderApi.update(genderId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Gender updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (genderId) {
      return withLoading(() => updateGender(submitData))
    }

    return withLoading(() => addNewGender(submitData))
  }

  return { methods, onSubmit, isSubmitting, isLoading }
}
