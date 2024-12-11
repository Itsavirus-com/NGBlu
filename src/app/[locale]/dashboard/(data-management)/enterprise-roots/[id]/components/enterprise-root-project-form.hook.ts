import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootProjectApi } from '@/services/api/enterprise-root-project-api'
import { useEnterpriseRootProject } from '@/services/swr/use-enterprise-root-project'
import { InferType } from '@/utils/typescript'

export default function useEnterpriseRootProjectForm(projectId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: project } = useEnterpriseRootProject(Number(id), projectId)

  const schema = yup.object().shape({
    projectId: yup.number().required(),
    enterpriseRootAddressesId: yup.number().required(),
    ouUnitId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: project,
  })

  const addNewEnterpriseRootProject = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootProjectApi.new(Number(id), {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root project created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEnterpriseRootProject = async (data: InferType<typeof schema>) => {
    if (!projectId) return

    try {
      const res = await enterpriseRootProjectApi.update(Number(id), projectId, {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root project updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    if (projectId) {
      return updateEnterpriseRootProject(data)
    }

    return addNewEnterpriseRootProject(data)
  }

  return { methods, onSubmit }
}
