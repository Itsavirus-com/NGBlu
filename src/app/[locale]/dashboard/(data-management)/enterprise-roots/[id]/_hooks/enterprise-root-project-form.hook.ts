import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { enterpriseRootProjectApi } from '@/services/api/enterprise-root-project-api'
import { useEnterpriseRootProject } from '@/services/swr/use-enterprise-root-project'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/enterprise-root-project-form.schema'

export default function useEnterpriseRootProjectForm(projectId?: number) {
  const { id } = useParams()
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: project, mutate: invalidateCache } = useEnterpriseRootProject(Number(id), projectId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: project && {
      projectId: project.projectId,
      enterpriseRootAddressesId: project.enterpriseRootAddressesId,
      ouUnitId: project.ouUnitId,
    },
  })

  const addNewEnterpriseRootProject = async (data: InferType<typeof schema>) => {
    try {
      const res = await enterpriseRootProjectApi.new(Number(id), {
        ...data,
        enterpriseRootId: Number(id),
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Enterprise root project created successfully' })
        invalidateCache()
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
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (projectId) {
      return updateEnterpriseRootProject(submitData)
    }

    return addNewEnterpriseRootProject(submitData)
  }

  return { methods, onSubmit }
}
