import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { projectApi } from '@/services/api/project-api'
import { useProject } from '@/services/swr/use-project'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/project-form.schema'

export default function useProjectForm(projectId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: projectData, isLoading, mutate: invalidateCache } = useProject(projectId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: projectData && {
      projectName: projectData.projectName,
      projectTypeId: projectData.projectTypeId,
      projectInfoId: projectData.projectInfoId,
      addressId: projectData.addressId,
      endclientId: projectData.endclientId,
      businesspartnersId: projectData.businesspartnersId,
      enterpriseRootId: projectData.enterpriseRootId,
      ouUnitId: projectData.ouUnitId,
      inputType: projectData.endclientId
        ? 'endclientId'
        : projectData.businesspartnersId
          ? 'businesspartnerId'
          : projectData.enterpriseRootId
            ? 'enterpriseRootId'
            : '',
    },
  })

  const errorMessageInputType = methods.formState.errors.inputType?.message

  const handleChange = (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => {
    methods.setValue('inputType', value)
    methods.setValue('ouUnitId', null)
    methods.setValue('endclientId', null)
    methods.setValue('businesspartnersId', null)
    methods.setValue('enterpriseRootId', null)
  }

  const handleFilterOrganizationUnit = () => {
    const endclientId = methods.watch('endclientId')
    const businesspartnerId = methods.watch('businesspartnersId')
    const enterpriseRootId = methods.watch('enterpriseRootId')

    if (endclientId && enterpriseRootId) {
      return { endclientId: endclientId, enterpriseRootId: enterpriseRootId }
    } else if (businesspartnerId) {
      return { businesspartnerId: businesspartnerId }
    } else if (enterpriseRootId) {
      return { enterpriseRootId: enterpriseRootId }
    }
  }

  const addNewProject = async (data: InferType<typeof schema>) => {
    try {
      const { inputType, ...rest } = data

      const res = await projectApi.new(rest)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateProject = async (data: InferType<typeof schema>) => {
    if (!projectId) return

    try {
      const { inputType, ...rest } = data

      const res = await projectApi.update(projectId, rest)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (projectId) {
      return updateProject(submitData)
    }

    return addNewProject(submitData)
  }

  return {
    methods,
    handleChange,
    onSubmit,
    isLoading,
    errorMessageInputType,
    handleFilterOrganizationUnit,
  }
}
