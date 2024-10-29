import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { projectApi } from '@/services/api/project-api'
import { useProject } from '@/services/swr/use-project'
import { InferType } from '@/utils/typescript'

export default function useProjectForm(projectId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: projectData } = useProject(projectId)

  const schema = yup.object().shape({
    projectName: yup.string().ensure().required(),
    projectTypeId: yup.number().required(),
    projectInfoId: yup.number().required(),
    addressId: yup.number().required(),
    ouUnitId: yup.number(),
    endclientId: yup.number(),
    businesspartnersId: yup.number(),
    enterpriseRootId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: projectData,
  })

  const addNewProject = async (data: InferType<typeof schema>) => {
    try {
      const res = await projectApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateProject = async (data: InferType<typeof schema>) => {
    if (!projectId) return

    try {
      const res = await projectApi.update(projectId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (projectId) {
      return updateProject(data)
    }

    return addNewProject(data)
  }

  return { methods, onSubmit }
}
