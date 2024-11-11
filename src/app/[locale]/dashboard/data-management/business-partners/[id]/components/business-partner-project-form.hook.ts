import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerProjectApi } from '@/services/api/business-partner-project-api'
import { useBusinessPartnerProject } from '@/services/swr/use-business-partner-project'
import { InferType } from '@/utils/typescript'

export default function useBusinessPartnerProjectForm(
  businessPartnerId: number,
  projectId?: number
) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const { data: project } = useBusinessPartnerProject(businessPartnerId, projectId)

  const schema = yup.object().shape({
    businesspartnersAddressesId: yup.number().required(),
    projectId: yup.number().required(),
    ouUnitId: yup.number(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    values: project && {
      ...project,
      businesspartnersAddressesId: project.businesspartnerAddressId,
    },
  })

  const addNewBusinessPartnerProject = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerProjectApi.new(businessPartnerId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner project created successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateBusinessPartnerProject = async (data: InferType<typeof schema>) => {
    if (!projectId) return

    try {
      const res = await businessPartnerProjectApi.update(businessPartnerId, projectId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner project updated successfully' })
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    if (projectId) {
      return updateBusinessPartnerProject(data)
    }
    return addNewBusinessPartnerProject(data)
  }

  return { methods, onSubmit }
}
