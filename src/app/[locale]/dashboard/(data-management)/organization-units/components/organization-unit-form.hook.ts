import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { organizationUnitApi } from '@/services/api/organization-unit-api'
import { useOrganizationUnit } from '@/services/swr/use-organization-unit'
import { InferType } from '@/utils/typescript'

export default function useOrganizationUnitForm(organizationUnitId?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: organizationUnit } = useOrganizationUnit(organizationUnitId)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
    primaryAddressId: yup.number(),
    endclientId: yup.number(),
    businesspartnerId: yup.number(),
    enterpriseRootId: yup.number().required(),
    inputType: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: organizationUnit && {
      ...organizationUnit,
      inputType: organizationUnit.endclientId
        ? 'endclientId'
        : organizationUnit.businesspartnerId
          ? 'businesspartnerId'
          : organizationUnit.enterpriseRootId
            ? 'enterpriseRootId'
            : '',
    },
  })

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
    if (organizationUnitId) {
      return updateOrganizationUnit(data)
    }

    return addNewOrganizationUnit(data)
  }

  return { methods, onSubmit }
}
