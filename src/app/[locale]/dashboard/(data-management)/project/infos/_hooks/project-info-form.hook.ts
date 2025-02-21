import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useLoading } from '@/hooks/use-loading.hook'
import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { projectInfoApi } from '@/services/api/project-info-api'
import { useProjectInfo } from '@/services/swr/use-project-info'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/project-info-form.schema'

export default function useProjectInfoForm(id?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { isLoading: isSubmitting, withLoading } = useLoading()
  const { data: projectInfoData, isLoading, mutate: invalidateCache } = useProjectInfo(id)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: projectInfoData && {
      projectInfo: projectInfoData?.projectInfo ?? '',
    },
  })

  const addNewProjectInfo = async (data: InferType<typeof schema>) => {
    try {
      const res = await projectInfoApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project info created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateProjectInfo = async (data: InferType<typeof schema>) => {
    if (!id) return

    try {
      const res = await projectInfoApi.update(id, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project info updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (id) {
      return withLoading(() => updateProjectInfo(submitData))
    }

    return withLoading(() => addNewProjectInfo(submitData))
  }

  return { methods, onSubmit, isLoading, isSubmitting }
}
