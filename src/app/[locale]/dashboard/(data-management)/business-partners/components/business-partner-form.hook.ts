import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerApi } from '@/services/api/business-partner-api'
import { useBusinessPartner } from '@/services/swr/use-business-partner'
import { InferType } from '@/utils/typescript'

export default function useBusinessPartnerForm(id?: number) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: businessPartner } = useBusinessPartner(id)

  const schema = yup.object().shape({
    name: yup.string().ensure().required(),
    businesspartnerTypeId: yup.number().required(),
    companyInfoId: yup.number().required(),
    enterpriseRootId: yup.number().required(),
    businesspartnersAddressesId: yup.number(),
    ouUnit: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: businessPartner && {
      ...businessPartner,
      businesspartnerTypeId: businessPartner.businessPartnerType.id,
      companyInfoId: businessPartner.companyInfo.id,
    },
  })

  const addNewBusinessPartner = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerApi.new(data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner created successfully' })
        back()
      }
    } catch (error: any) {
      if ('name' in error.errors.detail) {
        showToast({ variant: 'danger', body: 'Business partner name is already exists' })
        return
      }
      showUnexpectedToast()
    }
  }

  const updateBusinessPartner = async (data: InferType<typeof schema>) => {
    if (!id) return

    try {
      const res = await businessPartnerApi.update(id, data)

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner updated successfully' })
        back()
      }
    } catch (error: any) {
      if ('name' in error.errors.detail) {
        showToast({ variant: 'danger', body: 'Business partner name is already exists' })
        return
      }
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (id) {
      return updateBusinessPartner(data)
    }

    return addNewBusinessPartner(data)
  }

  return { methods, onSubmit }
}
