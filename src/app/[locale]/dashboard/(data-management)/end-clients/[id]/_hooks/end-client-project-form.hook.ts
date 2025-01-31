import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientProjectApi } from '@/services/api/end-client-project-api'
import { useEndClientProject } from '@/services/swr/use-end-client-project'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/end-client-project-form.schema'

export default function useEndClientProjectForm(endClientId: number, projectId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClientProject, isLoading } = useEndClientProject(endClientId, projectId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientProject && {
      ...endClientProject,
      endclientAddressesId: endClientProject.endclientAddressId,
    },
  })

  const addNewEndClientProject = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientProjectApi.new(endClientId, {
        ...data,
        endclientId: endClientId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client project created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateEndClientProject = async (data: InferType<typeof schema>) => {
    if (!projectId) return

    try {
      const res = await endClientProjectApi.update(endClientId, projectId, {
        ...data,
        endclientId: endClientId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'End client project updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)
    if (projectId) {
      return updateEndClientProject(submitData)
    }

    return addNewEndClientProject(submitData)
  }

  return { methods, onSubmit, isLoading }
}
