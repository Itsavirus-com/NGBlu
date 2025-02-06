import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { organizationUnitApi } from '@/services/api/organization-unit-api'
import { useOrganizationUnit } from '@/services/swr/use-organization-unit'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/organization-unit-form.schema'

export default function useOrganizationUnitForm(organizationUnitId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()
  const { data: organizationUnit, isLoading: isLoadingOrganizationUnit } =
    useOrganizationUnit(organizationUnitId)

  const [inputType, setInputType] = useState<
    'endclientId' | 'businesspartnerId' | 'enterpriseRootId' | null
  >(null)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: organizationUnit && {
      name: organizationUnit.name,
      primaryAddressId: organizationUnit.primaryAddressId,
      endclientId: organizationUnit.endclientId,
      businesspartnerId: organizationUnit.businesspartnerId,
      enterpriseRootId: organizationUnit.enterpriseRootId,
      inputType: organizationUnit.endclientId
        ? 'endclientId'
        : organizationUnit.businesspartnerId
          ? 'businesspartnerId'
          : organizationUnit.enterpriseRootId
            ? 'enterpriseRootId'
            : '',
    },
  })

  const errorMessageInputType = methods.formState.errors.inputType?.message

  const handleChange = (value: 'endclientId' | 'businesspartnerId' | 'enterpriseRootId') => {
    methods.setValue('inputType', value)
    methods.setValue('endclientId', 0)
    methods.setValue('businesspartnerId', 0)
    methods.setValue('enterpriseRootId', 0)
  }

  const addNewOrganizationUnit = async (data: InferType<typeof schema>) => {
    try {
      switch (data.inputType) {
        case 'endclientId':
          if (data.endclientId === 0) {
            showToast({ variant: 'danger', body: 'Please select endclient' })
            return
          }
          break
        case 'businesspartnerId':
          if (data.businesspartnerId === 0) {
            showToast({ variant: 'danger', body: 'Please select business partner' })
            return
          }
          break
        case 'enterpriseRootId':
          if (data.enterpriseRootId === 0) {
            showToast({ variant: 'danger', body: 'Please select enterprise root' })
            return
          }
          break
      }
      const res = await organizationUnitApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Organization unit created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateOrganizationUnit = async (data: InferType<typeof schema>) => {
    if (!organizationUnitId) return

    try {
      switch (data.inputType) {
        case 'endclientId':
          if (data.endclientId === 0) {
            showToast({ variant: 'danger', body: 'Please select endclient' })
            return
          }
          break
        case 'businesspartnerId':
          if (data.businesspartnerId === 0) {
            showToast({ variant: 'danger', body: 'Please select business partner' })
            return
          }
          break
        case 'enterpriseRootId':
          if (data.enterpriseRootId === 0) {
            showToast({ variant: 'danger', body: 'Please select enterprise root' })
            return
          }
          break
      }
      const res = await organizationUnitApi.update(organizationUnitId, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Organization unit updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (organizationUnitId) {
      return updateOrganizationUnit(submitData)
    }

    return addNewOrganizationUnit(submitData)
  }

  return {
    methods,
    inputType,
    setInputType,
    handleChange,
    onSubmit,
    isLoading: isLoadingOrganizationUnit,
    errorMessageInputType,
  }
}
