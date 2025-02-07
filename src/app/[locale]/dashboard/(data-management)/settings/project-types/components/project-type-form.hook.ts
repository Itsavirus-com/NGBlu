import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { projectTypeApi } from '@/services/api/project-type-api'
import { useProjectType } from '@/services/swr/use-project-type'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

export default function useProjectTypeForm(typeId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: projectType, mutate } = useProjectType(typeId)

  const schema = yup.object().shape({
    projectType: yup
      .string()
      .ensure()
      .required('Project type is required')
      .max(150, 'Project type must be less than 150 characters'),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: projectType,
  })

  const addNewProjectType = async (data: InferType<typeof schema>) => {
    try {
      const res = await projectTypeApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project type created successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateProjectType = async (data: InferType<typeof schema>) => {
    if (!typeId) return

    try {
      const res = await projectTypeApi.update(typeId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project type updated successfully' })
        mutate()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)
    if (typeId) {
      return updateProjectType(submitData)
    }

    return addNewProjectType(submitData)
  }

  return { methods, onSubmit }
}
