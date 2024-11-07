import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { endClientProjectApi } from '@/services/api/end-client-project-api'
import { useEndClientProject } from '@/services/swr/use-end-client-project'
import { InferType } from '@/utils/typescript'

export default function useEndClientProjectForm(endCliendId: number, projectId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: endClientProject } = useEndClientProject(endCliendId, projectId)

  const schema = yup.object().shape({
    projectId: yup.number().required(),
    endclientAddressesId: yup.number().required(),
    ouUnitId: yup.number().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: endClientProject && {
      ...endClientProject,
      endclientAddressesId: endClientProject.endclientAddressId,
    },
  })

  const addNewEndClientProject = async (data: InferType<typeof schema>) => {
    try {
      const res = await endClientProjectApi.new(endCliendId, {
        ...data,
        endclientId: endCliendId,
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
      const res = await endClientProjectApi.update(endCliendId, projectId, {
        ...data,
        endclientId: endCliendId,
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
    if (projectId) {
      return updateEndClientProject(data)
    }

    return addNewEndClientProject(data)
  }

  return { methods, onSubmit }
}
