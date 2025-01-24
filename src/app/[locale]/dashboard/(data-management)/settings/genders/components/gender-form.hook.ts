import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { genderApi } from '@/services/api/gender-api'
import { useGender } from '@/services/swr/use-gender'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useGenderForm(genderId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: gender } = useGender(genderId)

  const schema = yup.object().shape({
    gender: yup
      .string()
      .ensure()
      .required('Gender is required')
      .max(45, 'Gender must be less than 45 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: gender,
  })

  const addNewGender = async (data: InferType<typeof schema>) => {
    try {
      const res = await genderApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Gender created successfully' })
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
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (genderId) {
      return updateGender(submitData)
    }

    return addNewGender(submitData)
  }

  return { methods, onSubmit }
}
