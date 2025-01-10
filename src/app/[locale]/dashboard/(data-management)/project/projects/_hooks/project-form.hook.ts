import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
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

  const { data: projectData, isLoading } = useProject(projectId)

  const [inputType, setInputType] = useState<
    'endclientId' | 'businesspartnerId' | 'enterpriseRootId' | null
  >(null)
  const [inputValue, setInputValue] = useState<number>(0)

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

  const handleChange = (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => {
    setInputType(value)
    setInputValue(0)
    methods.setValue('ouUnitId', null)
    methods.setValue('endclientId', null)
    methods.setValue('businesspartnersId', null)
    methods.setValue('enterpriseRootId', null)
  }

  const setInputValueBasedOnInputType = () => {
    const inputTypeValue = methods.getValues('inputType') as
      | 'endclientId'
      | 'businesspartnerId'
      | 'enterpriseRootId'
    setInputType(inputTypeValue)

    switch (inputTypeValue) {
      case 'endclientId':
        setInputValue(methods.getValues('endclientId') as number)
        break
      case 'businesspartnerId':
        setInputValue(methods.getValues('businesspartnersId') as number)
        break
      case 'enterpriseRootId':
        setInputValue(methods.getValues('enterpriseRootId') as number)
        break
      default:
        break
    }
  }

  const addNewProject = async (data: InferType<typeof schema>) => {
    try {
      const { inputType, ...rest } = data

      const res = await projectApi.new(rest)

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
      const { inputType, ...rest } = data

      const res = await projectApi.update(projectId, rest)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Project updated successfully' })
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

  useEffect(() => {
    if (projectId && inputType === null) {
      setInputValueBasedOnInputType()
    }

    setTimeout(() => {
      methods.setValue('enterpriseRootId', projectData?.enterpriseRootId)
      methods.setValue('endclientId', projectData?.endclientId)
      methods.setValue('businesspartnersId', projectData?.businesspartnersId)
      methods.setValue('ouUnitId', projectData?.ouUnitId)
    }, 1000)
  }, [methods.watch()])

  return { methods, inputType, inputValue, handleChange, onSubmit, setInputValue, isLoading }
}
