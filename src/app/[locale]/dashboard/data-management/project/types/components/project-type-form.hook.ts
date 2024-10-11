import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { projectTypeApi } from '@/services/api/project-api'
import { useProjectType } from '@/services/swr/use-project-type'
import { InferType } from '@/utils/typescript'

export default function useProjectTypeForm(typeId?: number) {
  const { showToast, showUnexpectedToast } = useToast()

  const { data: projectType } = useProjectType(typeId)

  const schema = yup.object().shape({
    projectType: yup.string().ensure().required(),
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
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (typeId) {
      return updateProjectType(data)
    }

    return addNewProjectType(data)
  }

  return { methods, onSubmit }
}
